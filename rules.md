# Mui Next.js 升级规范配置

## 最新版本检查升级 (批量升级)

1. 检查最新版本 (npm-check-updates)
https://www.npmjs.com/package/npm-check-updates

```bash
pnpm add npm-check-updates -g
```

2. 检查项目根目录package.json的依赖
```bash
ncu
```

3. 更新版本 (npm-check-updates)
自动检测所有以来是否存在更新版本
Run ncu -u to upgrade package.json
```bash
ncu -u
```

4. 清除旧版本
```bash
rm -rf node_modules
# or
pnpm clean
```

5. 更新package, 重新生成lock file
```bash
pnpm install
```

## nextjs最新版本集成 (v14.1.4)
查看官网发布日志
https://github.com/vercel/next.js/releases

System Requirements:

Node.js 18.17 or later.
macOS, Windows (including WSL), and Linux are supported.

1. 集成nextjs最新版本
```json
{
  "next": "^14.1.4"
}
``` 

2. nextjs最新pages router文档参考, 本地开发是否开启turbopack
https://nextjs.org/docs

```json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

3. 对比更新next.config.js配置
https://nextjs.org/docs/pages/api-reference/next-config-js

4. 对比next components版本变化, 比如api或者新组件
https://nextjs.org/docs/pages/api-reference/components

5. 参考next compile最新的支持 (next.config.js)
https://nextjs.org/docs/architecture/nextjs-compiler

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  swcMinify: true,
  transpilePackages: ['@acme/ui', 'lodash-es'],
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName?: boolean,
      // Enabled by default.
      ssr?: boolean,
      // Enabled by default.
      fileName?: boolean,
      // Empty by default.
      topLevelImportPaths?: string[],
      // Defaults to ["index"].
      meaninglessFileNames?: string[],
      // Enabled by default.
      cssProp?: boolean,
      // Empty by default.
      namespace?: string,
      // Not supported yet.
      minify?: boolean,
      // Not supported yet.
      transpileTemplateLiterals?: boolean,
      // Not supported yet.
      pure?: boolean,
    },
    reactRemoveProperties: true,
    removeConsole: true,
    emotion: boolean | {
      // default is true. It will be disabled when build type is production.
      sourceMap?: boolean,
      // default is 'dev-only'.
      autoLabel?: 'never' | 'dev-only' | 'always',
      // default is '[local]'.
      // Allowed values: `[local]` `[filename]` and `[dirname]`
      // This option only works when autoLabel is set to 'dev-only' or 'always'.
      // It allows you to define the format of the resulting label.
      // The format is defined via string where variable parts are enclosed in square brackets [].
      // For example labelFormat: "my-classname--[local]", where [local] will be replaced with the name of the variable the result is assigned to.
      labelFormat?: string,
      // default is undefined.
      // This option allows you to tell the compiler what imports it should
      // look at to determine what it should transform so if you re-export
      // Emotion's exports, you can still use transforms.
      importMap?: {
        [packageName: string]: {
          [exportName: string]: {
            canonicalImport?: [string, string],
            styledBaseImport?: [string, string],
          }
        }
      },
    }
  }
}
 
module.exports = nextConfig
```

## mui最新版本集成 (v5.15.14) 
查看官网发布日志
https://github.com/mui/material-ui/releases

1. 集成mui最新版本
```bash
pnpm add pnpm add @mui/material-nextjs @emotion/cache @emotion/server
```

2. 按照官网Next.js integration进行集成
```bash
pnpm add @mui/material-nextjs @emotion/cache @emotion/server
```

3. Configuration

- Inside the pages/_document.tsx file:

Import documentGetInitialProps and use it as the Document's getInitialProps.
Import DocumentHeadTags and render it inside the <Head>.

```tsx
+import {
+  DocumentHeadTags,
+  documentGetInitialProps,
+} from '@mui/material-nextjs/v14-pagesRouter';
 // or `v1X-pagesRouter` if you are using Next.js v1X

 export default function MyDocument(props) {
   return (
     <Html lang="en">
       <Head>
+        <DocumentHeadTags {...props} />
         ...
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </Html>
   );
 }

+MyDocument.getInitialProps = async (ctx) => {
+  const finalProps = await documentGetInitialProps(ctx);
+  return finalProps;
+};

```

- Then, inside pages/_app.tsx, import the AppCacheProvider component and render it as the root eleme
```tsx
+import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
 // Or `v1X-pages` if you are using Next.js v1X

 export default function MyApp(props) {
   return (
+    <AppCacheProvider {...props}>
       <Head>
         ...
       </Head>
       ...
+    </AppCacheProvider>
   );
 }
```
该AppCacheProvider组件负责收集服务器上 MUI 系统生成的 CSS，因为 Next.js 将 .html 页面渲染到客户端。

虽然不需要使用该AppCacheProvider组件，但建议使用它来确保样式附加<head>到<body>.请参阅https://github.com/mui/material-ui/issues/26561#issuecomment-855286153了解为什么它更好


- Custom cache (optional)
To use a custom Emotion cache, pass it to the emotionCache property in _document.tsx
```tsx
 MyDocument.getInitialProps = async (ctx) => {
   const finalProps = await documentGetInitialProps(ctx, {
+    emotionCache: createCustomCache(),
   });
   return finalProps;
 };
```

- Theming (_app.tsx)
```tsx
 import * as React from 'react';
 import Head from 'next/head';
 import { AppProps } from 'next/app';
 import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
+import { ThemeProvider, createTheme } from '@mui/material/styles';
+import { Roboto } from 'next/font/google';

+const roboto = Roboto({
+  weight: ['300', '400', '500', '700'],
+  subsets: ['latin'],
+  display: 'swap',
+});

+const theme = createTheme({
+  typography: {
+    fontFamily: roboto.style.fontFamily,
+  },
+});

 export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>...</Head>
+     <ThemeProvider theme={theme}>
        <Component {...pageProps} />
+     </ThemeProvider>
    </AppCacheProvider>
  );
 }
```

- CSS theme variables (_app.tsx)
If you want to use CSS theme variables, use the extendTheme and CssVarsProvider instead:

In pages/_app.tsx, create a new theme and pass it to ThemeProvider:
```tsx
-import { ThemeProvider, createTheme } from '@mui/material/styles';
+import { CssVarsProvider, extendTheme } from '@mui/material/styles';
```
```

## 检查项目是否正常启动
```bash
pnpm run dev
```
本地启动相对next13会有很大的变化, 需要检查是否本地启动有相关报错信息, 进行报错修复

## 检查项目是否正常打包
```bash
pnpm run build
```
本地打包提交优化, 打包命令执行是否报错, 有报错就解决报错

## 集成eslint, prettier, husky, lint-staged (最新版本)

- 测试eslint是否正常工作
- 测试prettier是否正常工作
- 修改代码, 测试husky, lint-staged是否正常工作

如果有报错，就解决报错或者按照官方文档进行配置, 如果有解决不了的问题, 就找githup issues, workflow生态圈或者架构组同事帮忙解决


# Mui Next.js 开发规范配置

## 组件开发命名规范 (参考mui)
https://github.com/mui/material-ui/tree/next/packages/mui-material/src
- 组件文件components下面
- 文件夹命名大驼峰命名法(CamelCase)
- 文件命名小驼峰命名法(lowerCamelCase)
- 文件内容包含: index.ts component.tsx styled.ts index.zh-CN.md
- 封装组件的interface, type支持导出
- 封装组件说明文档
https://github.com/ant-design/ant-design/blob/master/components/input/index.zh-CN.md

## Types注解规范
- 统一命名types目录下/**/*.d.ts
- 通过tsconfig.json 配置types目录

## Hooks开发命名规范
- 统一命名hooks目录下/**/*.ts
- 文件夹命名大驼峰命名法(CamelCase) AddToCart
- 文件命名小驼峰命名法(lowerCamelCase) useAddToCart.ts
- 文件内容包含: index.ts useXXXX.ts

## 样式开发命名规范
- 统一基于@emtion/styled去开发
- 统一基于emotion的主题配置
- 统一emotion开发的代码规范
```ts
import styled from '@emotion/styled'

export const StyledAddress = styled.div`
  padding: 10px;
`
```

## Editior配置规范
```bash
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js}]
charset = utf-8

# Tab indentation (no size specified)
[Makefile]
indent_style = tab
```

## Eslint配置规范
- 配置.eslintignore
node_modules
.next
*.md
dist

- 配置eslint配置文件
```js
module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'next',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    camelcase: 0,
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'arrow-body-style': 0,
    'consistent-return': 0,
    'global-require': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
    'no-param-reassign': 0,
    'no-continue': 0,
    'no-plusplus': 0,
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-restricted-exports': 0,
    'no-return-assign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-syntax': ['error', 'WithStatement'],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        usePrettierrc: false,
        fileInfoOptions: {
          withNodeModules: true
        }
      }
    ],
    'react/function-component-definition': 0,
    'react/no-danger': 0,
    'react/jsx-fragments': 0,
    'react/jsx-filename-extension': [
      0,
      {
        extensions: ['.ts', '.tsx']
      }
    ],
    'react/jsx-no-useless-fragment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
```


## Prettier配置规范
- 配置.prettierignore
```bash
package.json
.gitignore
.npmignore
.prettierignore
.editorconfig
.eslintignore
**/*.yml
```

- 配置.prettierrc.js
```js
module.exports = {
  printWidth: 100, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: false, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxSingleQuote: false, // jsx中使用单引号
  trailingComma: 'none', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  arrowParens: 'always', //单参数箭头函数参数周围使用圆括号
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  endOfLine: 'lf', //结束行形式
  embeddedLanguageFormatting: 'auto' //对引用代码进行格式化
}
```

## Husky配置规范

- commit-msg钩子
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint -e $HUSKY_GIT_PARAMS
```

- pre-commit钩子
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged

```

- pre-push钩子
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm branch-name-lint

```

## Stylelint配置规范
- 配置.stylelintignore
node_modules

- 配置.stylelintrc.js
```js
module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': true,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values']
      }
    ],
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'function-calc-no-invalid': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: ['m']
      }
    ],
    'no-descending-specificity': null,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,
    'string-no-newline': true,
    'unit-no-unknown': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-semicolon-newline-after': 'always',
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands']
      }
    ],
    'comment-whitespace-inside': 'always',
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-newline-after': 'always-multi-line',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-whitespace-after': 'always',
    indentation: 2,
    'length-zero-no-unit': true,
    'max-empty-lines': 1,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'property-case': 'lower',
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-space-before': 'never',
    'selector-max-empty-lines': 0,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-type-case': 'lower',
    'unit-case': 'lower',
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ]
  }
}
```

## Lint-staged配置规范
针对不同文件, 配置不同的任务流
```json
{
  "*.{ts,tsx}": ["eslint --fix", "stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
}
```

## Git提交规范
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'test', // Adding missing tests
        'chore', // Changes to the build process or auxiliary tools and libraries such as documentation generation
        'revert', // revert to a commit
        'build' // pack
      ]
    ],
    'subject-case': [0]
  }
}
```

## Branch Name分支命令规范
```bash
pnpm add branch-rule-lint -D
```

```js
const fs = require('fs')
const path = require('path')

const readDirectories = (url) =>
  fs
    .readdirSync(url, { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map(({ name }) => name)

module.exports = {
  pattern: ':username/:type/:desc',
  params: {
    username: ['caesar', 'johnny'],
    type: [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'chore',
      'revert',
      'build',
      'hotfix'
    ],
    desc: ['[a-z0-9-]+'],
    scope: readDirectories(path.resolve(__dirname, './apps'))
  },
  prohibited: ['dev', 'build', 'master', 'release'],
  whiteList: ['main', 'test']
}
```

## pnpm workspace模块化规范
- pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- 前端功能模块化
```tree
packages
 - module-add-to-cart
 - module-checkout-payment
 - module-checkout-shipping
 - module-checkout-summary
 - module-checkout-success
```

## Nextjs dynimac组件动态拆分规范
- 拆分注意区分是否需要ssr
```tsx
import dynamic from 'next/dynamic'

const AppBuilder = dynamic(() => import('@/components/AppBuilder'), {
  ssr: false
})
```

- 默认首批不加载的模块, 都可以进行拆分, 滚屏懒加载技术

- Modal, Drawer都可以进行拆分

- 集成第三方npm包, 体积过大的必须进行拆分
