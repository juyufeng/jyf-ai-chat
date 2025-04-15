import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import checker from 'vite-plugin-checker';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,  // 开发时也进行类型检查
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2048,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 示例：将 /api 开头的请求代理到目标服务器
      "/api": {
        target: [
          "https://api.dify.ai/",
        ][0],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
