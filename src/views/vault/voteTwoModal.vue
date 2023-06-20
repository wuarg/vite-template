<template>
  <div class="p-10">
    <Modal ref="childRef" title="投票2" @onHide="onHide">
      <div class="xg-farm-vote2">
        <div class="card xg-farm-vote2-outerbox">
          <div class="py-4">
            <h5>对提案投票</h5>
          </div>
          <div class="py-4">
            <p>投票将持续24 小时 </p>
            <p>总票数: {{ totalVote }} </p>
          </div>
          <div v-if="!waiting" style="width: 100%; height: 260px; overflow-y: auto">
            <div v-for="(proposalId, index) in proposalIdArray" :key="index">
              <div style="margin-top: 10px; white-space: pre-wrap">
                <h5>提案 #{{ proposalId }}</h5>
                {{ proposals[proposalId][0] }}
              </div>
              <div v-if="actionMap[proposalId] != 0" class="text-info">
                支持: {{ statMap[proposalId].approval }}<br />
                反对: {{ statMap[proposalId].disapproval }}
              </div>
              <div v-if="actionMap[proposalId] != 0" class="text-info">
                你选择了{{ actionMap[proposalId] == 1 ? '支持' : '反对' }}<br />
                <button class="btn btn-sm btn-warning" @click="refresh(proposalId)"
                  >刷新(需要很多gas, 没事别点)</button
                >
              </div>
              <div v-if="actionMap[proposalId] == 0">
                <button class="btn btn-sm m-4" @click="approve(proposalId)"> 支持 </button>
                <button class="btn btn-sm m-4" @click="disapprove(proposalId)">反对</button>
              </div>
            </div>
          </div>
          <div v-if="waiting" style="width: 100%; height: 260px"> 加载中... </div>
          <!-- <div>
            <button class="btn btn-dark" style="width: 100%; margin-top: 10px" (click)="close()">{{
              ['关闭', 'Close'][language]
            }}</button>
          </div> -->
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import Modal from '~/components/core/Modal.vue';
  // import Info from '~/components/core/Info.vue';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  import { FarmHelperManager } from '~/utils/farmHelperManager';
  import { ContractService } from '~/utils/contractServe';
  import { commonStore } from '~/stores/modules/common';
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
    },
    props: {
      willShowFarmVote2: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowFarmVote2,
        (newValue, oldValue) => {
          if (newValue === true) {
            callChildMethod();
          }
        },
      );
      onMounted(() => {
        load();
      });
      const childRef = ref(null);
      const callChildMethod = () => {
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        context.emit('onHide');
      };
      const proposalIdArray = ref([10, 11]);
      const proposals = ref<Record<string, any>>({});
      const actionMap = ref<Record<string, any>>({});
      const statMap = ref<Record<string, any>>({});
      const totalVote = ref('');
      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const willShowAlertMessage = ref(false);

      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      const load = async () => {
        waiting.value = true;
        await FarmHelperManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            loadTotal();
            // 发起第二个异步请求
            loadAll();
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };
      const loadTotal = async () => {
        totalVote.value = ((await FarmHelperManager.getTotalVote()) * 1).toFixed(0);
      };

      const loadAll = async () => {
        waiting.value = true;
        const all = proposalIdArray.value.map(async (proposalId) => {
          await loadOne(proposalId);
        });
        await Promise.all(all);
        waiting.value = false;
      };

      const loadOne = async (proposalId: any) => {
        proposals.value[proposalId] = await FarmHelperManager.getProposal(proposalId);
        actionMap.value[proposalId] = await FarmHelperManager.getProposalAction(proposalId);
        statMap.value[proposalId] = await FarmHelperManager.getProposalStat(proposalId);
      };

      const approve = async (proposalId: any) => {
        waiting.value = true;
        try {
          const res = await ContractService.approveProposal(proposalId);
          // this.showAlert('投票成功', 'Voted successfully',
          //    '如果还没有看到，请几秒后刷新页面',
          //    'If you don\'t see what you voted, please refresh the page in a few seconds')

          loadOne(proposalId);
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else {
          //   this.showAlert('投票失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }
        waiting.value = false;
      };

      const disapprove = async (proposalId: any) => {
        waiting.value = true;
        try {
          const res = await ContractService.disapproveProposal(proposalId);
          // this.showAlert('投票成功', 'Voted successfully',
          //    '如果还没有看到，请几秒后刷新页面',
          //    'If you don\'t see what you voted, please refresh the page in a few seconds')

          loadOne(proposalId);
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else {
          //   this.showAlert('投票失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }
        waiting.value = false;
      };

      const refresh = async (proposalId: any) => {
        waiting.value = true;
        try {
          const res = await ContractService.checkProposal(proposalId);

          // this.showAlert(
          //   '刷新成功',
          //   'Refreshed successfully',
          //   '如果还没有看到，请几秒后刷新页面',
          //   "If you don't see what you voted, please refresh the page in a few seconds",
          // );

          loadOne(proposalId);
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert(
          //     'Gas不足',
          //     'Gas not enough',
          //     '请通过抵押获得更多',
          //     'Please pledge IOST to get more',
          //   );
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert(
          //     'Ram不足',
          //     'Ram not enough',
          //     '请通过购买获得更多',
          //     'Please buy some with IOST',
          //   );
          // } else {
          //   this.showAlert('投票失败', 'Transaction Failed', '请再次尝试', 'Please try again');
          // }
        }

        waiting.value = false;
      };

      return {
        childRef,
        proposalIdArray,
        proposals,
        actionMap,
        statMap,
        totalVote,
        waiting,
        willShowAlertMessage,
        onHide,
        approve,
        disapprove,
        refresh,
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
