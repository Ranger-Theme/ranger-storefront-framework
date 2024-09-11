import { Component } from 'react'
import type { FromDataOptions, PointGroup, ToSVGOptions } from 'signature_pad'
import SignaturePad from 'signature_pad'
import trimCanvas from 'trim-canvas'

export interface SignatureCanvasProps {
  canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>
  clearOnResize?: boolean
  dotSize?: number
  minWidth?: number
  maxWidth?: number
  penColor?: string
  minDistance?: number
  velocityFilterWeight?: number
  compositeOperation?: GlobalCompositeOperation
  backgroundColor?: string
  throttle?: number
  canvasContextOptions?: CanvasRenderingContext2DSettings
  clear?: () => void
  fromDataURL?: (
    dataUrl: string,
    options?: {
      ratio?: number
      width?: number
      height?: number
      xOffset?: number
      yOffset?: number
    }
  ) => Promise<void>
  on?: () => void
  off?: () => void
  // 'image/svg+xml'
  toDataURL?: (type: string, encoderOptions?: ToSVGOptions | number) => string
  isEmpty?: () => boolean
  fromData?: (pointGroups: PointGroup[], options?: FromDataOptions) => void
  toData?: () => PointGroup[]
  toSVG?: (options?: ToSVGOptions) => string
}

class SignatureCanvas extends Component<SignatureCanvasProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps: Pick<SignatureCanvasProps, 'clearOnResize'> = {
    clearOnResize: true
  }

  static refNullError = new Error(
    'react-signature-canvas is currently ' +
      'mounting or unmounting: React refs are null during this phase.'
  )

  private readonly staticThis = this.constructor as typeof SignatureCanvas

  _sigPad: SignaturePad | null = null

  _canvas: HTMLCanvasElement | null = null

  componentDidMount() {
    const canvas = this.getCanvas()
    this._sigPad = new SignaturePad(canvas, this._excludeOurProps())
    this._resizeCanvas()
    this.on()
  }

  componentDidUpdate() {
    Object.assign(this._sigPad as any, this._excludeOurProps())
  }

  componentWillUnmount() {
    this.off()
  }

  private readonly setRef = (ref: HTMLCanvasElement | null): void => {
    this._canvas = ref
    // if component is unmounted, set internal references to null
    if (this._canvas === null) {
      this._sigPad = null
    }
  }

  // return a trimmed copy of the canvas
  getTrimmedCanvas(): HTMLCanvasElement {
    // copy the canvas
    const canvas = this.getCanvas()
    const copy = document.createElement('canvas')
    copy.width = canvas.width
    copy.height = canvas.height
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    copy.getContext('2d')!.drawImage(canvas, 0, 0)
    // then trim it
    return trimCanvas(copy)
  }

  // return the canvas ref for operations like toDataURL
  getCanvas(): HTMLCanvasElement {
    if (this._canvas === null) {
      throw this.staticThis.refNullError
    }
    return this._canvas
  }

  // return the internal SignaturePad reference
  getSignaturePad(): SignaturePad {
    if (this._sigPad === null) {
      throw this.staticThis.refNullError
    }
    return this._sigPad
  }

  _resizeCanvas() {
    const canvasProps = this.props.canvasProps ?? {}
    const { width, height } = canvasProps
    // don't resize if the canvas has fixed width and height
    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
      return
    }

    const canvas = this.getCanvas()
    /* When zoomed out to less than 100%, for some very strange reason,
      some browsers report devicePixelRatio as less than 1
      and only part of the canvas is cleared then. */
    const ratio = Math.max(window.devicePixelRatio ?? 1, 1)

    if (typeof width === 'undefined') {
      canvas.width = canvas.offsetWidth * ratio
    }
    if (typeof height === 'undefined') {
      canvas.height = canvas.offsetHeight * ratio
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    canvas.getContext('2d')!.scale(ratio, ratio)
    this.clear()
  }

  on() {
    window.addEventListener('resize', this._checkClearOnResize)
    return this.getSignaturePad().on()
  }

  off() {
    window.removeEventListener('resize', this._checkClearOnResize)
    return this.getSignaturePad().off()
  }

  clear() {
    return this.getSignaturePad().clear()
  }

  isEmpty() {
    return this.getSignaturePad().isEmpty()
  }

  fromDataURL(dataURL: string, options: any) {
    return this.getSignaturePad().fromDataURL(dataURL, options)
  }

  toDataURL(type: string, encoderOptions: any) {
    return this.getSignaturePad().toDataURL(type, encoderOptions)
  }

  fromData(pointGroups: any) {
    return this.getSignaturePad().fromData(pointGroups)
  }

  toData() {
    return this.getSignaturePad().toData()
  }

  _excludeOurProps() {
    const { ...sigPadProps } = this.props
    return sigPadProps
  }

  _checkClearOnResize() {
    if (!this.props.clearOnResize) {
      return
    }

    this._resizeCanvas()
  }

  render() {
    const { canvasProps } = this.props

    return <canvas ref={this.setRef} {...canvasProps} />
  }
}

export default SignatureCanvas
