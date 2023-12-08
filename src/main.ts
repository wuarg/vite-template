import { createApp } from 'vue';
import App from './app.vue';
import 'tailwindcss/tailwind.css';
import './style/index.less';
// //ant-design-vue
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.less';
import './style/theme.less';

import customMessage from './components/core/Message';

const app = createApp(App);

Object.values(import.meta.glob<AppModule>('./modules/*.ts', { eager: true })).forEach((i) =>
  i.install(app),
);
// 使用 provide 全局提供 customMessage
app.provide('$customMessage', customMessage);

app.use(Antd).mount('#app');
