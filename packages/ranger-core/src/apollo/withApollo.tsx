import { Component } from 'react'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { parseCookies } from '@ranger-theme/utils'

import { initApollo } from './initApollo'

const isProd: boolean = process.env.NODE_ENV === 'production'

export const withApollo = (App: any) =>
  class AppWithApollo extends Component {
    public apolloClient: any

    static async getInitialProps(appContext: any) {
      let domain: string = ''
      let host: string = ''
      const { Component: AppComponent, router } = appContext
      const cookies: any = parseCookies(appContext.ctx)
      const isServer: boolean = typeof window === 'undefined'
      const isAdobeDeploy: boolean = process.env.NEXT_PUBLIC_DEPLOY_PLATFORM === 'adobe'
      const proto: string = isServer
        ? (appContext.ctx?.req?.headers?.['x-forwarded-proto'] ?? '')
        : window.location.protocol
      // filter http only secure
      const usedCookies: any = {
        access_token: cookies?.access_token ?? '',
        cart_id: cookies?.cart_id ?? '',
        cookie_consent: cookies?.cookie_consent ?? '',
        currency_code: cookies?.currency_code ?? '',
        store_code: cookies?.store_code ?? ''
      }

      if (isAdobeDeploy) {
        host = isServer
          ? (appContext.ctx?.req?.headers?.['origin-host'] ?? '')
          : window.location.host
        domain = isServer ? host : `${proto}//${host}`
      } else {
        host = isServer ? (appContext.ctx?.req?.headers?.host ?? '') : window.location.host
        domain = isServer ? `${proto}://${host}` : `${proto}//${host}`
      }

      const apollo = initApollo({
        apolloState: {},
        cookies: usedCookies,
        domain
      })

      // Provide the apollo to getInitialProps of pages
      appContext.ctx.apollo = apollo

      // Run wrapped getInitialProps methods
      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      // Run all GraphQL queries
      if (typeof window === 'undefined' && isProd) {
        await getDataFromTree(
          <App {...appProps} Component={AppComponent} router={router} apolloClient={apollo} />
        )
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
        cookies: usedCookies
      }
    }

    constructor(props: any) {
      super(props)
      this.apolloClient = initApollo(props)
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />
    }
  }
