import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  Router,
  RouteRecordRaw,
} from 'vue-router';
import { MetaMaskStore } from '~/modules/connector';
import { useEthereumStore } from '~/stores/ethereum.store';
import { type App } from 'vue';
import Layout from '~/layout/app-index.vue';

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
    redirect: 'wallet',
    children: [
      // {
      //   name: 'Home',
      //   path: 'home',
      //   component: () => import('~/views/home/index.vue'),
      // },
      // {
      //   name: 'About',
      //   path: 'about',
      //   component: () => import('~/views/about/index.vue'),
      // },
      {
        name: 'Wallet',
        path: 'wallet',
        component: () => import('~/views/wallet/index.vue'),
      },
    ],
  },
];

const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
  try {
    const { ethereumState } = useEthereumStore();
    if (!ethereumState.accountConnected.value) {
      // MetaMaskStore();
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL ?? '/'),
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
