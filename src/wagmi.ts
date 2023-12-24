import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue';
import { type Chain, bsc, bscTestnet } from '@wagmi/core/chains';
import { getAccount, getNetwork, watchAccount, watchNetwork } from '@wagmi/core';
import { ref } from 'vue';

export const chains: Chain[] = [bsc, bscTestnet];
export const defaultChain = import.meta.env.MODE === 'development' ? bscTestnet : bsc;

// const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 56;
const projectId = '34fd010daeba7359f058954266d6f910';
if (!projectId) throw new Error('Missing WalletConnect project ID in .env file');

const metadata = {
  name: 'Bsc + wagmi + Web3Modal',
  description: 'Bsc + wagmi + Web3Modal Template',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
const web3Modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain,
  themeMode: 'dark',
});

export const account = ref(getAccount());
export const network = ref(getNetwork());
watchAccount((updatedAccount) => {
  account.value = updatedAccount;
});
watchNetwork((updatedNetwork) => {
  network.value = updatedNetwork;
});
