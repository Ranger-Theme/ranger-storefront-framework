declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_HOST_URL: string
    readonly NEXT_PUBLIC_API_URL: string
    readonly NEXT_PUBLIC_CDN_URL: string
    readonly NEXT_PUBLIC_EDEGE_URL: string
    readonly NEXT_PUBLIC_MAGENTO_CLOUD: string
    readonly NEXT_PUBLIC_VISUALIZE_ENABLE: string
  }
}
