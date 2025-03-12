import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  devServer: {
    port: 3001,
  },
  runtimeConfig: {
    // public: {
    //   baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    //   host: process.env.NUXT_PUBLIC_HOST,
    //   backendPort: process.env.NUXT_PUBLIC_BACKEND_PORT,
    // }
  },
  css: ['~/assets/style/global.less'],
  vite: {
    server: {
      // proxy: {
      //   '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/dev/后的所有路由
      //     target: 'http://127.0.0.1:8001', // 目标地址 --> 服务器地址
      //     changeOrigin: true, // 允许跨域
      //     ws: true,  // 允许websocket代理
      //     // 重写路径 --> 作用与vue配置pathRewrite作用相同
      //     rewrite: (path) => path.replace(/^\/api/, "")
      //   }
      // }
    },
  },
  nitro: {
    // devProxy: {
    //   "/api": {
    //     target: "http://localhost:8001", // 这里是接口地址
    //     changeOrigin: true,
    //     prependPath: true,
    //     ws: true,
    //   },
    // },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  plugins: [
    "~/plugins/antd-ui.ts"
  ],
  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  //nuxt.config.ts
  build: {
    transpile: ['pinia-plugin-persistedstate']
  },

})