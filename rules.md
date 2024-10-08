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
