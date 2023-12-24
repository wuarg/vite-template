import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  Router,
  RouteRecordRaw,
  createWebHashHistory,
} from 'vue-router';
import { type App } from 'vue';
import Layout from '~/layout/index.vue';

//
import NProgress from 'nprogress';
import '~/style/nprogress.less';

declare module 'vue-router' {
  interface RouteMeta {
    appBar?: boolean;
    tabBar?: boolean;
    batTitle?: string;
    authorization?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('~/views/home/index.vue'),
      },
      // {
      //   name: 'About',
      //   path: 'about',
      //   component: () => import('~/views/about/index.vue'),
      // },
      // {
      //   name: 'Wallet',
      //   path: 'wallet',
      //   component: () => import('~/views/wallet/index.vue'),
      // },
      {
        name: 'Burnbuild',
        path: 'burnbuild',
        component: () => import('~/views/burnbuild/index.vue'),
      },
    ],
  },
];

const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
  next();
};

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL ?? '/'),
});

export { routes };

// NProgress
function installNprogress(router: Router) {
  router.beforeEach((to, from) => {
    if (to.path !== from.path) NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done();
  });
}

export const install = (app: App<Element>) => {
  router.beforeEach(beforeEach);

  // use nprogress
  installNprogress(router);

  app.use(router);
};
