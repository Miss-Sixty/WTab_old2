import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: './auto-imports.d.ts'
    }),
    viteCompression() // 开启gzip压缩
  ],
  build: {
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    terserOptions: {
      compress: {
        drop_console: true, // 打包时删除console.log
        drop_debugger: true // 打包时删除debugger
      }
    },
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
    host: true // 监听所有地址
  }
})
