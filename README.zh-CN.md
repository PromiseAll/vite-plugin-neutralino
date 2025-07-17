# Vite Plugin Neutralino

一个为 [Neutralinojs](https://neutralino.js.org/) 提供无缝集成的 Vite 插件。

这个插件会自动将 `__neutralino_globals.js` 脚本注入到你的 `index.html` 中，从而让你的 Vite 应用能够与 Neutralinojs 框架进行通信。

## 特性

-   **开发模式:** 自动查找正在运行的 Neutralinojs 应用的端口并连接。
-   **生产模式:** 为你的最终构建设置正确的脚本路径。
-   **零配置:** 无需额外配置，开箱即用，适用于标准的 Neutralinojs 项目。

## 安装

```bash
# npm
npm install vite-plugin-neutralino --save-dev

# yarn
yarn add vite-plugin-neutralino --dev

# pnpm
pnpm add vite-plugin-neutralino -D
```

## 使用

将插件添加到你的 `vite.config.ts` 文件中:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import neutralino from 'vite-plugin-neutralino';

export default defineConfig({
  plugins: [
    vue(),
    neutralino(),
  ],
});
```

### 选项

#### `rootPath`

-   **类型:** `string`
-   **默认值:** `config.root` (Vite 项目的根目录)

允许您为 Neutralinojs 项目指定一个自定义的根目录。如果您的 Neutralinojs 应用与 Vite 项目的根目录不在同一个文件夹中，这个选项会非常有用。

示例:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import neutralino from 'vite-plugin-neutralino';

export default defineConfig({
  plugins: [
    vue(),
    neutralino({
      rootPath: '../my-neutralino-app'
    }),
  ],
});
```

## 工作原理

### 开发环境

在开发模式下 (`vite dev`)，该插件会读取由 Neutralinojs CLI 创建的 `.tmp/auth_info.json` 文件。该文件包含正在运行的应用实例的端口和令牌。插件使用此端口注入一个指向正确的 `__neutralino_globals.js` URL 的 script 标签（例如 `http://localhost:5000/__neutralino_globals.js`）。

为了使此功能正常工作，请确保在运行 Vite 开发服务器之前或同时运行您的 Neutralinojs 应用。

### 生产环境

在生产模式下 (`vite build`)，该插件会注入一个 `src` 为 `__neutralino_globals.js` 的 script 标签。

## 许可证

[MIT](./LICENSE) 