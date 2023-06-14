import { ethers } from 'ethers';

export async function connectWallet(): Promise<ethers.providers.Web3Provider> {
  // 判断是否已经连接了钱包
  if (window.ethereum && window.ethereum.request) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  } else {
    throw new Error('请安装并连接一个以太坊钱包');
  }
}
