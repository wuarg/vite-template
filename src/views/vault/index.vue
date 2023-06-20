<template>
  <div class="m-auto p-10">
    <div v-if="waiting">
      <img
        src="../../assets/xigua/loading.gif"
        style="margin: 100px auto; display: block; width: 80px"
      />
    </div>
    <div v-else>
      <p
        >抵押相应的资产可以参与挖矿XPLUS。流动性挖矿是一种非常高风险的投资，参与前，请确保您完全理解相关的风险。</p
      >
      <div class="m-4">
        <button class="btn m-4" @click="showFarmVote">投票1</button>
        <button class="btn" @click="showFarmVote2">投票2</button>
      </div>
      <div
        v-for="(info, index) in infoArray"
        :key="index"
        class="card-item text-white my-8 mx-auto w-1/2 rounded-md p-4 shadow-md"
      >
        <div class="flex p-2">
          <div class="flex-1 justify-items-start text-left">
            {{ info.fullName }}
            <span v-if="info.lockDays">(锁仓{{ info.lockDays }}天)</span>
            × {{ info.alloc }}
            <span v-if="info.canVote" class="text-info">[投票权]</span>
          </div>
          <div class="grid flex-1 justify-items-end">
            <button class="btn btn-sm btn-dark" @click="showVault(info)">管理</button>
          </div>
        </div>
        <div class="xg-pool-line">
          <div class="flex p-2">
            <div class="grid flex-1 justify-items-start"> 总抵押 </div>
            <div v-if="xusdPrice" class="grid flex-1 justify-items-end">
              ${{ xusdPrice ? (info.totalInXUSD * xusdPrice).toFixed(2) : info.totalInXUSD }}
            </div>
          </div>
          <div class="flex p-2">
            <div class="grid flex-1 justify-items-start"> 年化收益(估算) </div>
            <div class="grid flex-1 justify-items-end"> {{ +(info.apy * 100).toFixed(2) }}% </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { FarmManager } from '~/utils/farmManager';

  export default defineComponent({
    name: 'VaultVue',
    setup() {
      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      // const interval = ref<number | null>(null);
      const infoArray = ref<any>([]);
      const XG_LIST = ref(['xg_3', 'xg_30', 'xg_90', 'xg_180']);
      const now = ref(0);
      const nowLocal = ref(0);
      const vaultManageFullName = ref('');
      const vaultManageToken = ref('');
      const vaultManagePrecision = ref('');
      const vaultManageExtra = ref('');
      const vaultManageExtraPrecision = ref(0);
      const vaultManageLockDays = ref(0);
      const willShowVaultManage = ref(false);
      const willShowFarmVote = ref(false);
      const willShowFarmVote2 = ref(false);
      const xusdPrice = ref(0);

      onMounted(() => {
        console.log('appStore.getXusdPrice--', appStore.getXusdPrice);
        xusdPrice.value = appStore.getXusdPrice;
        load();
        // interval.value = setInterval(() => {
        //   _tick();
        // }, 1 * 1e3);
      });
      onBeforeUnmount(() => {
        // Destroy related logic here
        // For example, cleanup timers, event listeners, etc.
      });
      const load = async () => {
        waiting.value = true;
        await FarmManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            console.log('发起第一个异步请求');
            infoArray.value = await FarmManager.getInfoArray();
            infoArray.value.forEach((info: { token: any; canVote: number }) => {
              if (XG_LIST.value.indexOf(info.token) >= 0) {
                info.canVote = 1;
              }
            });
            infoArray.value.sort((a: any, b: any) => b.alloc - a.alloc);

            waiting.value = false;
            now.value = await FarmManager.getNow();
            nowLocal.value = Math.floor(new Date().getTime() / 1000);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('未连接钱包');
        }
        waiting.value = false;
      };

      const showVault = (info: any) => {
        vaultManageFullName.value = info.fullName;
        vaultManageToken.value = info.token;
        vaultManagePrecision.value = info.tokenPrecision;
        vaultManageExtra.value = info.extra;
        vaultManageExtraPrecision.value = info.extraPrecision;
        vaultManageLockDays.value = parseInt(info.lockDays);
        willShowVaultManage.value = true;
      };

      const onRefreshVaultManage = () => {
        load();
      };

      const showFarmVote = () => {
        willShowFarmVote.value = true;
      };

      const onCloseFarmVote = () => {
        willShowFarmVote.value = false;
      };

      const showFarmVote2 = () => {
        willShowFarmVote2.value = true;
      };

      const onCloseFarmVote2 = () => {
        willShowFarmVote2.value = false;
      };

      return {
        waiting,
        infoArray,
        xusdPrice,
        showVault,
        onRefreshVaultManage,
        showFarmVote,
        onCloseFarmVote,
        showFarmVote2,
        onCloseFarmVote2,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }
</style>
