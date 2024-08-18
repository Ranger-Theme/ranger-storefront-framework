import type { GetModuleFunc, Module } from './type'

type AutoModuleConfig = Partial<Module> & {
  jsdeliver: Partial<Module>
}

const isDev: boolean = process.env.NODE_ENV === 'development'

const modulesConfig = {
  react: {
    var: 'React',
    jsdeliver: {
      path: isDev ? 'umd/react.development.js' : 'umd/react.production.min.js'
    }
  },
  'react-dom': {
    var: 'ReactDOM',
    alias: ['react-dom/client'],
    jsdeliver: {
      path: isDev ? 'umd/react-dom.development.js' : 'umd/react-dom.production.min.js'
    }
  },
  'react-router-dom': {
    var: 'ReactRouterDOM',
    jsdeliver: {
      path: 'dist/umd/react-router-dom.production.min.js'
    }
  },
  antd: {
    var: 'antd',
    jsdeliver: {
      path: 'dist/antd.min.js',
      css: 'dist/reset.min.css'
    }
  },
  moment: {
    var: 'moment',
    jsdeliver: {
      path: 'moment.min.js'
    }
  },
  dayjs: {
    var: 'dayjs',
    jsdeliver: {
      path: 'dayjs.min.js'
    }
  },
  axios: {
    var: 'axios',
    jsdeliver: {
      path: 'dist/axios.min.js'
    }
  },
  lodash: {
    var: '_',
    jsdeliver: {
      path: 'lodash.min.js'
    }
  }
} satisfies Record<string, AutoModuleConfig>

export type ModuleName = keyof typeof modulesConfig

const isJsdeliver = (prodUrl: string) => {
  return prodUrl.includes('//cdn.jsdelivr.net')
}

const isUnpkg = (prodUrl: string) => {
  return prodUrl.includes('//unpkg.com')
}

const isCdnjs = (prodUrl: string) => {
  return prodUrl.includes('//cdnjs.cloudflare.com')
}

const genModuleByName = (name: ModuleName) => {
  const config = modulesConfig[name] as AutoModuleConfig

  if (!config) {
    throw new Error(`The configuration of module ${name} does not exist `)
  }

  return (prodUrl: string) => {
    if (isCdnjs(prodUrl)) {
      throw new Error(`The configuration of module ${name} in ${prodUrl} does not exist `)
    } else {
      if (!(isJsdeliver(prodUrl) || isUnpkg(prodUrl))) {
        console.warn('Unknown CDN, please ensure that this CDN supports jsdelivr rules')
      }

      return {
        name,
        var: config.var,
        alias: config.alias,
        ...config.jsdeliver
      } as Module
    }
  }
}

export const autoComplete = (name: ModuleName | ModuleName[]): GetModuleFunc | GetModuleFunc[] => {
  if (Array.isArray(name)) {
    return name.map(genModuleByName)
  }

  return genModuleByName(name)
}
