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
    //         // 这里根据需要定制主题
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
    watch: {
      ignored: ['./config/*', './locales/*'],
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
        AntDesignVueResolver({ importStyle: true, resolveIcons: true }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
});
