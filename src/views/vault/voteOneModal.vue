<template>
  <div class="p-10">
    <Modal ref="childRef" title="投票1" @onHide="onHide">
      <div class="xg-farm-vote">
        <div class="card xg-farm-vote-outerbox">
          <div>
            <h5>投票选新池</h5>
          </div>
          <div>
            <p>得票超过5%的币种自动获得xusd交易对0.5权重的激励 </p>
            <p>总票数: {{ totalVote }} </p>
          </div>
          <div style="width: 100%; height: 260px; overflow-y: auto">
            <table width="90%">
              <thead>
                <td>币名</td>
                <td>得票</td>
                <td>占比</td>
                <td></td>
              </thead>
              <tbody>
                <tr v-for="(obj, index) in array" :key="index">
                  <td>{{ obj.name }}</td>
                  <td>{{ obj.vote }}</td>
                  <td>{{ obj.default }} + {{ obj.more }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-light"
                      style="width: 100%; margin-top: 10px"
                      @click="vote(obj.name)"
                    >
                      投票
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
  import { FarmHelperManager } from '~/utils/farmHelperManager';
  import { ContractService } from '~/utils/contractServe';
  import { environment } from '~/utils/iostConfig';
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  export default defineComponent({
    name: 'TemplateVue',
    components: {
      Modal,
    },
    props: {
      willShowFarmVote: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowFarmVote,
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

      const totalVote = ref('');
      const array = ref<Record<string, any>>([]);
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
            totalVote.value = ((await FarmHelperManager.getTotalVote()) * 1).toFixed(0);
            array.value = [];
            const all = environment.tokenWhiteList.map(async (tuple) => {
              const vote = JSON.parse(await FarmHelperManager.getVote(tuple[0])) || 0;
              array.value.push({
                name: tuple[0],
                vote: vote.toFixed(0),
                default: +parseFloat(tuple[2]),
                more: Math.floor((vote / parseFloat(totalVote.value)) * 20) / 2,
              });
            });
            await Promise.all(all);

            array.value.sort((a: any, b: any) => {
              if (a.default == b.default) {
                return b.vote * 1 - a.vote * 1;
              } else {
                return a.default - b.default;
              }
            });
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };

      const vote = async (token: any) => {
        waiting.value = true;
        try {
          const res = await ContractService.vote(token);
          console.log('res----', res);
          // this.showAlert(
          //   '投票成功',
          //   'Voted successfully',
          //   '如果还没有看到，请几秒后刷新页面',
          //   "If you don't see what you voted, please refresh the page in a few seconds",
          // );
          load();
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
        waiting,
        totalVote,
        array,
        onHide,
        vote,
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
