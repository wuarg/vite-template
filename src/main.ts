import { createApp } from 'vue';
import App from './app.vue';
import 'tailwindcss/tailwind.css';
import './style/index.less';
import { VueDapp } from 'vue-dapp';
import { ethers } from 'ethers';

const app = createApp(App);

app.use(VueDapp, {
  autoConnect: true,
  dumb: false,
  networks: {
    // 80001: {
    // 	chainId: ethers.utils.hexValue(80001),
    // 	blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    // 	chainName: 'Mumbai',
    // 	rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    // 	nativeCurrency: {
    // 		name: 'Mumbai',
    // 		decimals: 18,
    // 		symbol: 'MATIC',
    // 	},
    // },
    421613: {
      chainId: ethers.utils.hexValue(421613),
      blockExplorerUrls: ['https://testnet.arbiscan.io/'],
      chainName: 'Arbitrum Goeril',
      rpcUrls: ['https://testnet.arbiscan.io/'],
      nativeCurrency: {
        name: 'Arbitrum',
        symbol: 'ETH',
        decimals: 18,
      },
    },
    42161: {
      chainId: ethers.utils.hexValue(42161),
      blockExplorerUrls: ['https://arbiscan.io'],
      chainName: 'Arbitrum One',
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      nativeCurrency: {
        name: 'Arbitrum',
        symbol: 'ETH',
        decimals: 18,
      },
    },
  },
});

Object.values(import.meta.glob<AppModule>('./modules/*.ts', { eager: true })).forEach((i) =>
  i.install(app),
);

app.mount('#app');
