import styled from '@emotion/styled'

export const StyledResizable = styled.div`
  .react-resizable {
    position: relative;

    &-handle {
      position: absolute;
      width: 20px;
      height: 20px;
      padding: 0 3px 3px 0;
      background-repeat: no-repeat;
      background-origin: content-box;
      background-position: bottom right;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
      box-sizing: border-box;
    }

    &-handle-sw {
      bottom: 0;
      left: 0;
      cursor: sw-resize;
      transform: rotate(90deg);
    }

    &-handle-se {
      bottom: 0;
      right: 0;
      cursor: se-resize;
    }

    &-handle-nw {
      top: 0;
      left: 0;
      cursor: nw-resize;
      transform: rotate(180deg);
    }

    &-handle-ne {
      top: 0;
      right: 0;
      cursor: ne-resize;
      transform: rotate(270deg);
    }

    &-handle-w,
    &-handle-e {
      top: 50%;
      margin-top: -10px;
      cursor: ew-resize;
    }

    &-handle-w {
      left: 0;
      transform: rotate(135deg);
    }

    &-handle-e {
      right: 0;
      transform: rotate(315deg);
    }

    &-handle-n,
    &-handle-s {
      left: 50%;
      margin-left: -10px;
      cursor: ns-resize;
    }

    &-handle-n {
      top: 0;
      transform: rotate(225deg);
    }

    &-handle-s {
      bottom: 0;
      transform: rotate(45deg);
    }
  }
`
