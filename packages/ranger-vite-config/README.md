## vite配置

### 使用示例

```ts
// vite.config.ts

import { defineConfig } from 'vite';
import { baseConfig } from '@ocloud/admin-vite-config';
import pkg from './package.json';

export default ({ mode }: ConfigEnv) => {
  const defaultConfig = baseConfig(mode, pkg)
  
  return {
    ...defaultConfig,
  }
}
```
