import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './auto-imports.d.ts'
    }),
    viteCompression(), // 开启gzip压缩
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      // devOptions: {
      //   enabled: true
      // },
      includeAssets: ['favicon.ico', 'miaomiao.svg'],
      manifest: {
        name: 'WTab',
        short_name: 'WTab',
        description: 'WTab标签页',
        theme_color: '#ffffff',
        icons: [
          // {
          //   src: '/favicon.ico',
          //   sizes: '64x64 32x32 24x24 16x16',
          //   type: 'image/x-icon',
          //   purpose: 'any'
          // },
          {
            src: '/miaomiao.svg',
            sizes: '512x512 192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  build: {
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    terserOptions: {
      compress: {
        drop_console: true, // 打包时删除console.log
        drop_debugger: true // 打包时删除debugger
      }
    }
    // rollupOptions: {
    //   output: {
    //     // manualChunks 配置
    //     manualChunks: {
    //       // 两个文件合并成一个helloWorld文件
    //       settings: [
    //         'src/components/About.vue',
    //         'src/components/Settings/index.vue',
    //         'src/components/Wallpaper/index.vue',
    //         'src/components/Icon.vue',
    //         'src/components/Dialog.vue',
    //         'src/components/Header.vue'
    //       ]
    //     }
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  server: {
    proxy: {
      // '/admin': 'http://nest.zhangxihe.com', //开发服务器
      '/admin': 'http://192.168.50.87:3500' //后端本地
      // '/admin': 'http://localhost:3500' //后端本地
    },
    host: true // 监听所有地址
  }
})
