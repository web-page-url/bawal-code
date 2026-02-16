import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.js', 'src/cli.js'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    outDir: 'dist',
});
