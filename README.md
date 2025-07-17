# Vite Plugin Neutralino

[中文文档](./README.zh-CN.md)

A Vite plugin for seamless integration with [Neutralinojs](https://neutralino.js.org/).

This plugin automatically injects the `__neutralino_globals.js` script into your `index.html`, enabling communication with the Neutralinojs framework from your Vite application.

## Features

-   **Development Mode:** Automatically finds the running Neutralinojs application's port and connects to it.
-   **Production Mode:** Sets up the correct script path for your final build.
-   **Zero-config:** Works out of the box with standard Neutralinojs project setups.

## Installation

```bash
# npm
npm install vite-plugin-neutralino --save-dev

# yarn
yarn add vite-plugin-neutralino --dev

# pnpm
pnpm add vite-plugin-neutralino -D
```

## Usage

Add the plugin to your `vite.config.ts`:

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

### Options

#### `rootPath`

-   **Type:** `string`
-   **Default:** `config.root` (Vite's project root)

Allows you to specify a custom root directory for your Neutralinojs project. This is useful if your Neutralinojs application is not in the same directory as your Vite project root.

Example:

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

## How It Works

### Development

In development mode (`vite dev`), the plugin reads the `.tmp/auth_info.json` file created by the Neutralinojs CLI. This file contains the port and token for the running application instance. The plugin uses this port to inject a script tag pointing to the correct `__neutralino_globals.js` URL (e.g., `http://localhost:5000/__neutralino_globals.js`).

For this to work, make sure you run your Neutralinojs app before or alongside your Vite dev server.

### Production

In production mode (`vite build`), the plugin injects a script tag with `src` set to `__neutralino_globals.js`.

## License

[MIT](./LICENSE)