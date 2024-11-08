import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import analyzer from 'rollup-plugin-analyzer';
import gzipPlugin from 'rollup-plugin-gzip';
import brotli from 'rollup-plugin-brotli';

export default [
  {
    input: 'src/core.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser({
        compress: {
          drop_console: true, // Remove console logs
          drop_debugger: true, // Remove debugger statements
          keep_classnames: false,
          keep_fnames: false,
          passes: 3, // Apply optimizations multiple times
        },
        mangle: {
          toplevel: true, // Mangle top-level variable and function names
        },
        format: {
          comments: false, // Remove comments
        },
      }),
      analyzer({
        summaryOnly: true,            // Provides only a summary in the console
        hideDeps: true,               // Hide dependencies to focus on the core bundle
      }),
      gzipPlugin(),                      // Adds Gzip compression
      brotli(),                          // Adds Brotli compression
    ],
  },
  {
    input: 'src/core.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  }
];
