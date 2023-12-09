一个 vue3 + vite + ts 的开发模版。

跳过项目之始的配置环节，快速实现想法。`new FastifyIdea();`

## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite](https://github.com/vitejs/vite), [TypeScript](https://www.typescriptlang.org/zh/) Yes!
- 🍍 [使用 Pinia 的状态管理](https://pinia.esm.dev/)
- 😃 [Iconify ](https://github.com/antfu/unocss/tree/main/packages/preset-icons) - 各种图标集为你所用，浏览：[🔍 Icones](https://icones.netlify.app/)
- 🌍 [I18n 国际化开箱即用](./locales)
- 🎨 [Tailwindcss](https://www.tailwindcss.cn/) - 一个功能类优先的 CSS 框架
- 🛠 [VueUse](https://github.com/antfu/vueuse) - Vue CompositionApi 的集合
- [Eslint](http://eslint.cn/) + [prettier](https://prettier.io/) + [husky](https://typicode.github.io/husky/#/) 自动格式化...

## 使用

### 开发

```bash
yarn dev
```

### 构建

```bash
yarn build
```

### 代码格式化

```bash
yarn prettier
```

### 自动部署 git pages

1. Under "Build and deployment", under "Source", select **Deploy from a branch**.
2. Under "Build and deployment", under "Branch", select **gh-pages**

- This option can be modified in [action.yml](./.github/workflows/action.yml#L35) on line 35

3. Click **Save**.
