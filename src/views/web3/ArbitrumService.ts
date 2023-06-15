import { ethers, BigNumber, utils } from 'ethers';
import { useStore } from 'vuex';

const store = useStore();
// 根据ABI定义合约接口
import erc20Abi from '~/abi/Erc20.json';
const ercABI = new ethers.utils.Interface(erc20Abi); // 在这里填入你的ercABI定义
const TokenAddress =
  import.meta.env.VITE_ERC_ADDRESS || '0xe0f0A02b8707E26E3ECd6F0Cdb91cD169Fe6d2d2'; //erc20地址

import testAbi from '~/abi/TestAbi.json';
const contractABI = new ethers.utils.Interface(testAbi); // 在这里填入你的contractABI定义
const contractAddress =
  import.meta.env.VITE_CONTRACT_ADDRESS || '0x1cdE0c0B1520b6F642507dC898a4648901dbE771'; // 填入你的合约地址

export async function getWalletAddress(provider: ethers.providers.Web3Provider): Promise<string> {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
}

export async function getARBTokenBalance(
  provider: ethers.providers.Web3Provider,
  walletAddress: string,
): Promise<number> {
  // const contractAddress = '0xe0f0A02b8707E26E3ECd6F0Cdb91cD169Fe6d2d2'; // 填入你的ARB代币合约地址
  const contract = new ethers.Contract(TokenAddress, ercABI, provider);
  const balance = await contract.balanceOf(walletAddress);
  const formattedBalance = ethers.utils.formatEther(balance);
  return formattedBalance;
}

export async function authorizeContractMethod(
  provider: ethers.providers.Web3Provider,
  contractAddress: string,
): Promise<void> {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ercABI, signer);
  // 在这里调用你的授权方法
}

// poolInfo：获取池子信息
export async function getPoolInfoMethod(provider: ethers.providers.Web3Provider): Promise<void> {
  // 获取用户钱包地址
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  // 创建合约实例
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  // 调用poolInfo方法
  const result = await contract.poolInfo();
  console.log('poolInfo：获取池子信息result---', result);
  // await tx.wait();
  // 转换返回值为 BigNumber
  const initResult = {
    nodePool: result.nodePool.map((item: { toString: () => any }) =>
      ethers.utils.formatEther(item.toString()),
    ),
    consensePool: result.consensePool.map((item: { toString: () => any }) =>
      ethers.utils.formatEther(item.toString()),
    ),
    contractPool: result.contractPool.map((item: { toString: () => any }) =>
      ethers.utils.formatEther(item.toString()),
    ),
    liquidPool: result.liquidPool.map((item: { toString: () => any }) =>
      ethers.utils.formatEther(item.toString()),
    ),
  };
  console.log('initResult---', initResult);
  return initResult;
}

// dappInfo：获取池子信息
export async function getDappInfoMethod(provider: ethers.providers.Web3Provider): Promise<void> {
  // 获取用户钱包地址
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  // 创建合约实例
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  // 调用poolInfo方法
  const tx = await contract.dappInfo(address);
  console.log('dappInfo---', tx);
  // await tx.wait();
  // 转换返回值为 BigNumber
  // Number().toFixed(2)
  const initResult = {
    deposit: Number(ethers.utils.formatEther(tx.deposit.toString())).toFixed(2),
    groupAmount: Number(ethers.utils.formatEther(tx.groupAmount.toString())).toFixed(2),
    groupBalance: Number(ethers.utils.formatEther(tx.groupBalance.toString())).toFixed(2),
    groupCounts: Number(tx.groupCounts).toFixed(2),
    groupOutBalance: Number(ethers.utils.formatEther(tx.groupOutBalance.toString())).toFixed(2),
    inviteAmount: Number(ethers.utils.formatEther(tx.inviteAmount.toString())).toFixed(2),
    inviteCounts: Number(tx.inviteCounts).toFixed(2),
    // isWhitelist: tx.isWhitelist,
    isRisk: tx.isRisk,
    lastDeposit: Number(ethers.utils.formatEther(tx.lastDeposit.toString())).toFixed(2),
    pendingBalance: Number(ethers.utils.formatEther(tx.pendingBalance.toString())).toFixed(2),
    pendingOutBalance: Number(ethers.utils.formatEther(tx.pendingOutBalance.toString())).toFixed(2),
    prizeBalance: Number(ethers.utils.formatEther(tx.prizeBalance.toString())).toFixed(2),
    prizeOutBalance: Number(ethers.utils.formatEther(tx.prizeOutBalance.toString())).toFixed(2),
    referrer: tx.referrer,
    reserveBalance: Number(ethers.utils.formatEther(tx.reserveBalance.toString())).toFixed(2),
    validGroupCounts: Number(tx.validGroupCounts).toFixed(2),
    validInviteCounts: Number(tx.validInviteCounts).toFixed(2),
  };
  console.log('initResult---', initResult);
  return initResult;
}

// 递归转换对象数组中的BigNumber属性
export async function convertBigNumber(value: any): any {
  // 如果值是一个 BigNumber 实例，则将其转换为字符串
  if (value instanceof BigNumber) {
    return value.toString();
  }

  if (Array.isArray(value)) {
    // 如果是数组，则递归转换数组中的每个元素
    return value.map((item) => convertBigNumber(item));
  }
  if (typeof value === 'object' && value !== null) {
    // 如果是对象，则递归转换对象的每个属性
    const convertedObj: any = {};
    for (const key in value) {
      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty(key)) {
        convertedObj[key] = convertBigNumber(value[key]);
      }
    }
    return convertedObj;
  }
  if (BigNumber.isBigNumber(value) || typeof value === 'string') {
    console.log('2222', value.toString());
    // return utils.parseUnits(value, 18); // 假设默认精度为 18
    // const bigNumberValue = utils.parseUnits(value, 'ether');
    // 如果是 BigNumber 类型，则转换成字符串或其他适当的 JavaScript 数值类型
    return value.toString();
  }
  // 其他情况下，返回原始值
  return value;
}
