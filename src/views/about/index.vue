<template>
  <div class="my-10 font-normal">
    <!-- <span class="text-3xl">About</span> -->
    <BaseButton @click="handleDeploy()">handleDeploy</BaseButton>
    <BaseButton @click="handleMint()">handleMint</BaseButton>
    <BaseButton @click="handleBuy()">handleBuy</BaseButton>
    <BaseButton @click="handleTransfer()">handleTransfer</BaseButton>
    <BaseButton @click="handleList()">handleList</BaseButton>
    <BaseButton @click="handleUnList()">handleUnList</BaseButton>
  </div>
</template>

<script lang="ts">
  import BaseButton from '~/components/core/Button.vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { BigNumber } from 'bignumber.js';
  import { environment } from '~/utils/iostConfig';

  import { ContractService } from '~/utils/contractServe';
  export default defineComponent({
    name: 'About',
    components: {
      BaseButton,
    },
    setup() {
      const handleDeploy = async () => {
        try {
          const res = await ContractService.deployFunc('test', 10000, 1000);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleMint = async () => {
        try {
          const res = await ContractService.mintFunc('test', 1000);
          console.log('handleMint----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleBuy = async () => {
        try {
          const res = await ContractService.buyFunc('test', 0);
          console.log('handleBuy----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleTransfer = async () => {
        try {
          const res = await ContractService.transferFunc('test', 0, 'hulala');
          console.log('handleTransfer----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleList = async () => {
        try {
          const res = await ContractService.listFunc('test', 0, 10);
          console.log('handleList----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      const handleUnList = async () => {
        try {
          const res = await ContractService.unlistFunc('test', 0);
          console.log('handleUnList----', res);
        } catch (err: any) {
          if (err.indexOf('gas not enough') >= 0) {
            // this.showAlert('Gas不足', 'Gas not enough',
            //     '请通过抵押获得更多', 'Please pledge IOST to get more');
          } else if (err.indexOf('pay ram failed') >= 0) {
            // this.showAlert('Ram不足', 'Ram not enough',
            //     '请通过购买获得更多', 'Please buy some with IOST');
          } else {
            // this.showAlert('交易失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          }
        }
      };
      return {
        handleDeploy,
        handleMint,
        handleBuy,
        handleTransfer,
        handleList,
        handleUnList,
      };
    },
  });
</script>

<style lang="less" scoped>
  ul a {
    @apply text-skin-700 dark:text-skin-600;
  }
</style>
