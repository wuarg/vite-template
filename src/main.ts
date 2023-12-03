import { createApp } from 'vue';
import App from './app.vue';
import 'tailwindcss/tailwind.css';
import './style/index.less';

// //ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

Object.values(import.meta.glob<AppModule>('./modules/*.ts', { eager: true })).forEach((i) =>
  i.install(app),
);

app.use(Antd).mount('#app');
