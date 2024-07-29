import { Component } from 'react'

import { initRedux } from './initRedux'

export const withRedux = (App: any, reducer: any) =>
  class AppWithRedux extends Component {
    public reduxStore: any

    static async getInitialProps(appContext: any) {
      // This allows you to set a custom default initialState
      const reduxStore: any = initRedux({ reducer })
      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        reduxState: reduxStore.getState()
      }
    }

    constructor(props: any) {
      super(props)
      this.reduxStore = initRedux({ reduxState: props.reduxState, reducer })
    }

    render() {
      return <App reduxStore={this.reduxStore} {...this.props} />
    }
  }
