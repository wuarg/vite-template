<template>
  <div class="text-white p-10">
    <p>钱包地址: {{ walletAddress }}</p>
    <p>ARB余额: {{ arbBalance }}</p>
    <div>
      <button class="m-5" @click="checkAllowance">Check Allowance</button>
      <button class="m-5" @click="authorizeToken">Authorize Token</button>
      <button class="m-5" @click="join">Join</button>
      <button class="m-5" @click="deposit">Deposit</button>
      <button class="m-5" @click="getPoolInfo">getPoolInfo</button>
      <button class="m-5" @click="getDappInfo">getDappInfo</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { useStore } from 'vuex';
  import { ethers } from 'ethers';
  import { BigNumber, utils } from 'ethers';
  import { defineComponent, ref, onMounted } from 'vue';
  import { connectWallet } from './WalletConnector';
  import { getWalletAddress, getARBTokenBalance } from './ArbitrumService';
  import testAbi from '../../abi/TestAbi.json';
  import erc20Abi from '../../abi/Erc20.json';
  export default defineComponent({
    name: 'ArbitrumDemo',
    setup() {
      const store = useStore();
      const walletAddress = ref('');
      const arbBalance = ref(0);
      const ContractAddress = ref(
        import.meta.env.VITE_CONTRACT_ADDRESS || '0x1cdE0c0B1520b6F642507dC898a4648901dbE771',
      ); // 合约地址
      const TokenAddress = ref(
        import.meta.env.VITE_ERC_ADDRESS || '0xe0f0A02b8707E26E3ECd6F0Cdb91cD169Fe6d2d2',
      ); //erc20地址
      // 连接钱包并获取数据
      onMounted(async () => {
        try {
          const provider = await connectWallet();
          walletAddress.value = await getWalletAddress(provider);
          arbBalance.value = await getARBTokenBalance(provider, walletAddress.value);
        } catch (error) {
          console.error(error);
        }
      });

      // 检查代币授权数量
      const checkAllowance = async () => {
        try {
          // 与Web3钱包建立连接
          const provider = await connectWallet();
          // 获取用户钱包地址
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // 创建代币合约实例
          const tokenContract = new ethers.Contract(TokenAddress.value, erc20Abi, signer);
          // 获取当前用户已授权的数量
          const allowance = await tokenContract.allowance(address, ContractAddress.value);
          console.log('Current Allowance:', allowance.toString());
        } catch (error) {
          console.error('Error checking allowance:', error);
        }
      };

      // 授权ERC20代币
      const authorizeToken = async () => {
        try {
          // 与Web3钱包建立连接
          const provider = await connectWallet();
          // 获取用户钱包地址
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // 创建代币合约实例
          const tokenContract = new ethers.Contract(TokenAddress.value, erc20Abi, signer);
          // 数量乘以10的18次方
          const amount = ethers.utils.parseUnits('120', 'ether'); // 这里假设授权数量为100个代币
          // 检查当前用户已授权的数量
          const allowance = await tokenContract.allowance(address, ContractAddress.value);
          if (allowance.lt(amount)) {
            // 调用approve方法进行授权，spender为合约地址，amount为授权数量
            const tx = await tokenContract.approve(ContractAddress.value, amount);
            await tx.wait();
            console.log('Token authorized');
          } else {
            console.log('Token already authorized');
          }
        } catch (error) {
          console.error('Error authorizing token:', error);
        }
      };

      // 调用ABI的join方法
      const join = async () => {
        try {
          // 与Web3钱包建立连接
          const provider = await connectWallet();
          // 获取用户钱包地址
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // 创建合约实例
          const contract = new ethers.Contract(ContractAddress.value, testAbi, signer);
          const joinAddress = '0x73dEd6f153D5AA79B35cCc66e5e88Abc95823E5D';
          // 调用join方法
          const tx = await contract.join(joinAddress);
          await tx.wait();
          console.log('Join successful');
        } catch (error) {
          console.error('Error joining:', error);
        }
      };

      // 调用ABI的deposit方法
      const deposit = async () => {
        try {
          // 与Web3钱包建立连接
          const provider = await connectWallet();
          // 获取用户钱包地址
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // 创建合约实例
          const contract = new ethers.Contract(ContractAddress.value, testAbi, signer);
          // 数量乘以10的18次方
          const amount = ethers.utils.parseUnits('120', 'ether'); // 这里假设授权数量为100个代币
          // 调用deposit方法
          const tx = await contract.deposit(amount);
          await tx.wait();
          console.log('Deposit successful');
        } catch (error) {
          console.error('Error depositing:', error);
        }
      };

      //获取合约数据：
      // poolInfo：获取池子信息
      const getPoolInfo = async () => {
        try {
          // 与Web3钱包建立连接
          const provider = await connectWallet();
          // 获取用户钱包地址
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // 创建合约实例
          const contract = new ethers.Contract(ContractAddress.value, testAbi, signer);
          // 调用poolInfo方法
          const result = await contract.poolInfo();
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
          store.commit('user/setPoolInfo', initResult);
        } catch (error) {
          console.error('Error getPoolInfoing:', error);
        }
      };

      // 获取用户信息（传入用户地址参数）：
      // dappInfo
      const getDappInfo = async () => {
        try {
          // 与Web3钱包建立连接
          const provider = await connectWallet();
          // 获取用户钱包地址
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // 创建合约实例
          const contract = new ethers.Contract(ContractAddress.value, testAbi, signer);
          // 调用poolInfo方法
          const tx = await contract.dappInfo(address);
          // await tx.wait();
          console.log('getDappInfo successful', tx);
          const initResult = {
            deposit: ethers.utils.formatEther(tx.deposit.toString()),
            groupBalance: ethers.utils.formatEther(tx.groupBalance.toString()),
            groupCounts: ethers.utils.formatEther(tx.groupCounts.toString()),
            groupOutBalance: ethers.utils.formatEther(tx.groupOutBalance.toString()),
            isRisk: tx.isRisk,
            lastDeposit: ethers.utils.formatEther(tx.lastDeposit.toString()),
            pendingBalance: ethers.utils.formatEther(tx.pendingBalance.toString()),
            pendingOutBalance: ethers.utils.formatEther(tx.pendingOutBalance.toString()),
            prizeBalance: ethers.utils.formatEther(tx.prizeBalance.toString()),
            prizeOutBalance: ethers.utils.formatEther(tx.prizeOutBalance.toString()),
            referrer: tx.referrer,
            reserveBalance: ethers.utils.formatEther(tx.reserveBalance.toString()),
            validGroupCounts: ethers.utils.formatEther(tx.validGroupCounts.toString()),
          };
          console.log('initResult----', initResult);
          store.commit('user/setDappInfo', initResult);
        } catch (error) {
          console.error('Error getDappInfoing:', error);
        }
      };

      return {
        walletAddress,
        arbBalance,
        checkAllowance,
        authorizeToken,
        join,
        deposit,
        getPoolInfo,
        getDappInfo,
      };
    },
  });
</script>
