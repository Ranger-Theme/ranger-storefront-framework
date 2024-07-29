import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import type { FC, ReactNode } from 'react'
import type { IGoogleRecaptchaProps } from 'react-google-recaptcha-v3'

export interface GoogleCaptchaProps {
  children?: ReactNode
  key: string
  verifyProps?: IGoogleRecaptchaProps
}

const GoogleCaptcha: FC<GoogleCaptchaProps> = ({ children, key, verifyProps }) => {
  if (!key) return null

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={key}
      useRecaptchaNet={false}
      useEnterprise={false}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined
      }}
      container={{
        element: 'recaptcha',
        parameters: {
          badge: 'bottomleft',
          theme: 'dark'
        }
      }}
    >
      {children}
      {verifyProps?.onVerify && <GoogleReCaptcha {...verifyProps} />}
    </GoogleReCaptchaProvider>
  )
}

export default GoogleCaptcha

export { useGoogleReCaptcha }
