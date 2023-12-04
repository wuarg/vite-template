import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import * as path from 'path';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';

// 自动导入vue中hook reactive ref等
import AutoImport from 'unplugin-auto-import/vite';
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
//ant-design-vue
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    // loaderOptions: {
    //   less: {
    //     lessOptions: {
    //       modifyVars: {
    //         'primary-color': '#8456FC',
    //         'link-color': '#8456FC',
    //         'border-radius-base': '2px',
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // 热更新
    hmr: true,
    watch: {
      ignored: ['./config/*', './locales/*'],
    },
    proxy: {
      '/portalApi': {
        target: process.env.VUE_APP_URL || 'http://10.40.127.46:30000/', //开发环境
        ws: false, // 是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/portalApi': '/', // 除了测试环境以外
        },
      },
    },
  },
  esbuild: {
    pure: ['console.log'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    manifest: true,
    chunkSizeWarningLimit: 533,
  },
  plugins: [
    vue(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    Icons({
      scale: 1,
      defaultStyle: 'display:inline', // Style apply to icons
      defaultClass: 'icon', // Class names apply to icons
      autoInstall: true,
      compiler: 'vue3',
    }),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      //ant-design-vue
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
        AntDesignVueResolver({ importStyle: false, resolveIcons: true }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
});
