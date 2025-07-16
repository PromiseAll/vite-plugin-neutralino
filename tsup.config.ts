import { defineConfig } from 'tsup'
export default defineConfig({
  entry: ['src/index.ts'],
  bundle: true,
  format: ['esm', 'cjs'],
  shims: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  silent: true,
  dts: true,
  // silent: false,
})