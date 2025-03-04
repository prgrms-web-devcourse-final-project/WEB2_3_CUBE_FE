import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/aladin': {
        target: 'http://www.aladin.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/aladin/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Accept', 'application/json, text/plain, */*');
            proxyReq.setHeader(
              'Content-Type',
              'application/json;charset=utf-8',
            );
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['content-type'] = 'application/json;charset=utf-8';
          });
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
});
