<template>
  <div class="p-10">
    <div class="xg-bank">
      <div class="xg-bank-position">
        <div class="xg-bank-tabs">
          <span class="xg-bank-one-tab" :class="{ active: tabId === 0 }" @click="gotoTab(0)">
            抵押
          </span>
          <span class="xg-bank-one-tab" :class="{ active: tabId === 1 }" @click="gotoTab(1)">
            解锁
          </span>
          <span class="xg-bank-one-tab" :class="{ active: tabId === 2 }" @click="gotoTab(2)">
            借出
          </span>
          <span class="xg-bank-one-tab" :class="{ active: tabId === 3 }" @click="gotoTab(3)">
            归还
          </span>
        </div>

        <div class="xg-bank-container card">
          <ng-container v-if="tabId === 0">
            <div class="xg-bank-pannel card bg-primary">
              <div class="flex items-center" style="margin-bottom: 14px">
                <div class="grid"> 抵押 </div>
                <div class="grid text-right"> 可用: {{ iostBalance }} iost </div>
              </div>
              <div class="flex items-center" style="margin-bottom: 2px">
                <div class="grid">
                  <input
                    v-model="amountLock"
                    class="form-control border-rose-600 h-10 w-full rounded border-2"
                    type="text"
                    placeholder="0.0"
                    @keydown="checkAmount($event)"
                  />
                </div>
                <div class="col-auto flex items-center">
                  <button
                    class="btn btn-sm btn-light"
                    style="margin-right: 6px"
                    @click="goMaxLock()"
                  >
                    最大
                  </button>
                  iost
                </div>
              </div>
            </div>
            <div>
              <button
                class="input-btn btn btn-success"
                style="width: 100%; margin-top: 20px"
                type="button"
                :disabled="waiting"
                @click="lock()"
              >
                {{ waiting ? '抵押中...' : '抵押IOST' }}
              </button>
            </div>
          </ng-container>

          <ng-container v-if="tabId === 1">
            <div class="xg-bank-pannel card bg-primary">
              <div class="flex items-center" style="margin-bottom: 14px">
                <div class="col-4 grid"> 解锁 </div>
                <div class="col-8 grid text-right"> 最多解锁~: {{ info.canUnlock }} iost </div>
              </div>
              <div class="flex items-center" style="margin-bottom: 2px">
                <div class="grid">
                  <input
                    v-model="amountUnlock"
                    class="form-control border-rose-600 h-10 w-full rounded border-2"
                    type="text"
                    placeholder="0.0"
                    @keydown="checkAmount($event)"
                  />
                </div>
                <div class="col-auto flex items-center">
                  <button
                    class="btn btn-sm btn-light"
                    style="margin-right: 6px"
                    @click="goMaxUnlock()"
                  >
                    最大
                  </button>
                  iost
                </div>
              </div>
            </div>
            <div style="text-align: center">
              <button
                class="input-btn btn btn-dark"
                style="width: calc(33% - 5px); margin: 20px 5px 0 auto"
                type="button"
                :disabled="waiting"
                @click="unlockWithDelay()"
              >
                {{ waiting ? '解锁中...' : '3天解锁' }}
              </button>

              <button
                class="input-btn btn btn-warning"
                style="width: calc(33% - 5px); margin: 20px 5px 0 5px"
                type="button"
                :disabled="waiting"
                @click="unlockImmediately()"
              >
                {{ waiting ? '解锁中...' : '付费解锁' }}
              </button>

              <button
                class="input-btn btn btn-info"
                style="width: calc(33% - 5px); margin: 20px auto 0 auto"
                type="button"
                :disabled="waiting"
                @click="unlockWithVOST()"
              >
                {{ waiting ? '解锁中...' : 'VOST解锁' }}
              </button>
            </div>
          </ng-container>

          <ng-container v-if="tabId === 2">
            <div class="xg-bank-pannel card bg-primary">
              <div class="flex items-center" style="margin-bottom: 14px">
                <div class="col-4 grid"> 借出 </div>
                <div class="col-8 grid text-right"> 最多借出~: {{ info.canBorrow }} xusd </div>
              </div>
              <div class="flex items-center" style="margin-bottom: 2px">
                <div class="grid">
                  <input
                    v-model="amountBorrow"
                    class="form-control border-rose-600 h-10 w-full rounded border-2"
                    type="text"
                    placeholder="0.0"
                    @keydown="checkAmount($event)"
                  />
                </div>
                <div class="col-auto flex items-center">
                  <button
                    class="btn btn-sm btn-light"
                    style="margin-right: 6px"
                    @click="goMaxBorrow()"
                  >
                    最大
                  </button>
                  xusd
                </div>
              </div>
            </div>
            <div>
              <button
                class="input-btn btn btn-success"
                style="width: 100%; margin-top: 20px"
                type="button"
                :disabled="waiting"
                @click="borrow()"
              >
                {{ waiting ? '借出中...' : '借出XUSD' }}
              </button>
            </div>
          </ng-container>

          <ng-container v-if="tabId === 3">
            <div class="xg-bank-pannel card bg-primary">
              <div class="flex items-center" style="margin-bottom: 14px">
                <div class="col-4 grid"> 归还 </div>
                <div class="col-8 grid text-right"> 可用: {{ xusdBalance }} xusd </div>
              </div>
              <div class="flex items-center" style="margin-bottom: 2px">
                <div class="grid">
                  <input
                    v-model="amountPayBack"
                    class="form-control border-rose-600 h-10 w-full rounded border-2"
                    type="text"
                    placeholder="0.0"
                    @keydown="checkAmount($event)"
                  />
                </div>
                <div class="col-auto flex items-center">
                  <button
                    class="btn btn-sm btn-light"
                    style="margin-right: 6px"
                    @click="goMaxPayBack()"
                  >
                    最大
                  </button>
                  xusd
                </div>
              </div>
            </div>
            <div>
              <button
                class="input-btn btn btn-danger"
                style="width: 100%; margin-top: 20px"
                type="button"
                :disabled="waiting"
                @click="payBack()"
              >
                {{ waiting ? '归还中...' : '归还XUSD' }}
              </button>
            </div>
          </ng-container>
        </div>

        <div class="card xg-bank-info">
          <div class="flex items-center">
            <div class="grid"> 抵押了 </div>
            <div class="grid text-right"> {{ info.locked }} iost </div>
          </div>
          <div class="flex items-center">
            <div class="grid"> 借出了 </div>
            <div class="grid text-right"> {{ info.borrowed }} xusd </div>
          </div>
          <div class="flex items-center">
            <div class="grid"> 当前价 </div>
            <div class="text-info grid text-right"> ${{ info.price }} </div>
          </div>
          <div v-if="info.liquidationPrice" class="flex items-center">
            <div class="grid"> 爆仓价 </div>
            <div class="text-danger grid text-right"> ${{ info.liquidationPrice }} </div>
          </div>
          <div class="flex items-center">
            <div class="grid"> 可解锁 </div>
            <div class="grid text-right"> 大约{{ info.canUnlock }} iost </div>
          </div>
          <div class="flex items-center">
            <div class="grid"> 可再借 </div>
            <div class="grid text-right"> 大约{{ info.canBorrow }} xusd </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { BankManager } from '~/utils/bankManager';
  import { TokenManager } from '~/utils/tokenManager';
  export default defineComponent({
    name: 'XusdVue',
    setup() {
      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      const iostPrice = ref(0);

      const tabId = ref(0);
      const iostBalance = ref(0);
      const xusdBalance = ref(0);
      const info = ref<Record<string, any>>({
        locked: 0,
        borrowed: 0,
        price: 0,
        liquidationPrice: 0,
        canUnlock: 0,
        canBorrow: 0,
      });
      const amountLock = ref('');
      const amountUnlock = ref('');
      const amountBorrow = ref('');
      const amountPayBack = ref('');

      onMounted(() => {
        // connectWith(connectors[0]);
        load();
      });
      const load = async () => {
        waiting.value = true;
        await BankManager.constructor(myIOST);
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          iostPrice.value = appStore.getIostPrice;
          try {
            // 发起第一个异步请求
            // this.interval = setInterval(() => {
            //   _refresh();
            // }, 10 * 1e3);
            _refresh();
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };
      const _refresh = async () => {
        const all = [
          (async () => {
            iostBalance.value = await TokenManager.getTokenBalance('iost');
          })(),
          (async () => {
            xusdBalance.value = await TokenManager.getTokenBalance('xusd');
          })(),
          (async () => {
            info.value = await BankManager.getFullInfo(iostPrice.value);
          })(),
        ];
      };

      const goMaxLock = () => {
        amountLock.value = iostBalance.value.toString();
      };

      const goMaxUnlock = () => {
        amountUnlock.value = info.value.canUnlock;
      };

      const goMaxBorrow = () => {
        amountBorrow.value = info.value.canBorrow;
      };

      const goMaxPayBack = () => {
        amountPayBack.value = xusdBalance.value.toString();
      };

      const checkAmount = ($event: any) => {
        if (
          [8, 16, 17, 91, 37, 39, 86, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(
            $event.which,
          ) < 0
        ) {
          return false;
        }

        return true;
      };

      const lock = async () => {
        waiting.value = true;
        try {
          await ContractService.lock(+amountLock.value);

          amountLock.value = '';
          _refresh();

          // this.showAlert('抵押成功', 'Transaction Succeeded', '', '');
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else {
          //   this.showAlert('抵押失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }

        waiting.value = false;
      };

      const unlockWithVOST = async () => {
        waiting.value = true;
        try {
          await ContractService.unlockWithVOST(+amountUnlock.value);

          amountUnlock.value = '';
          _refresh();

          // this.showAlert('解锁成功', 'Transaction Succeeded', '', '');
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else {
          //   this.showAlert('解锁失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }

        waiting.value = false;
      };

      const unlockWithDelay = async () => {
        waiting.value = true;
        try {
          await ContractService.unlockWithDelay(+amountUnlock.value);

          amountUnlock.value = '';
          _refresh();

          // this.showAlert('解锁成功', 'Transaction Succeeded', '', '');
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else {
          //   this.showAlert('解锁失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }

        waiting.value = false;
      };

      const unlockImmediately = async () => {
        waiting.value = true;
        try {
          await ContractService.unlockImmediately(+amountUnlock.value);

          amountUnlock.value = '';
          _refresh();

          // this.showAlert('解锁成功', 'Transaction Succeeded', '', '');
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
          //   this.showAlert(
          //     '解锁失败',
          //     'Transaction Failed',
          //     '请尝试其他解锁方法',
          //     'Please try other options.',
          //   );
          // }
        }

        waiting.value = false;
      };

      const borrow = async () => {
        waiting.value = true;
        try {
          await ContractService.borrow(+amountBorrow.value);
          amountBorrow.value = '';
          _refresh();

          // this.showAlert('借出成功', 'Transaction Succeeded', '', '');
        } catch (err) {
          // if (err.indexOf('gas not enough') >= 0) {
          //   this.showAlert('Gas不足', 'Gas not enough',
          //       '请通过抵押获得更多', 'Please pledge IOST to get more');
          // } else if (err.indexOf('pay ram failed') >= 0) {
          //   this.showAlert('Ram不足', 'Ram not enough',
          //       '请通过购买获得更多', 'Please buy some with IOST');
          // } else {
          //   this.showAlert('借出失败', 'Transaction Failed', '请再次尝试', 'Please try again')
          // }
        }

        waiting.value = false;
      };

      const payBack = async () => {
        waiting.value = true;
        try {
          await ContractService.payBack(+amountPayBack.value);

          amountPayBack.value = '';
          _refresh();

          // this.showAlert('归还成功', 'Transaction Succeeded', '', '');
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
          //   this.showAlert('归还失败', 'Transaction Failed', '请再次尝试', 'Please try again');
          // }
        }

        waiting.value = false;
      };
      const gotoTab = (id: number) => {
        tabId.value = id;
      };
      return {
        waiting,
        tabId,
        iostPrice,
        iostBalance,
        xusdBalance,
        info,
        amountLock,
        amountUnlock,
        amountBorrow,
        amountPayBack,
        _refresh,
        goMaxLock,
        goMaxUnlock,
        goMaxBorrow,
        goMaxPayBack,
        checkAmount,
        lock,
        unlockWithVOST,
        unlockWithDelay,
        unlockImmediately,
        borrow,
        payBack,
        gotoTab,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .xg-bank {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 100%;
    width: 400px;
  }

  .xg-bank .xg-bank-bound {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .xg-bank .xg-bank-jumbotron {
    max-width: 600px;
    margin: 20px auto;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .xg-bank-position {
    max-width: 100%;
    width: 400px;
    transition: 1s;
  }

  .xg-bank-tabs {
    position: relative;
    top: 1px;
    text-align: center;
    width: 100%;
  }

  .xg-bank-one-tab {
    position: relative;
    background-color: #242a30;
    background-clip: border-box;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    min-width: 70px;
    display: inline-block;
    padding: 10px;
    margin: 0 4px;
    text-align: center;
    border-top-color: rgba(0, 0, 0, 0.6);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.6);
    border-right-style: solid;
    border-right-width: 1px;
    border-left-color: rgba(0, 0, 0, 0.6);
    border-left-style: solid;
    border-left-width: 1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  .xg-bank-one-tab.active {
    background-color: #32383e;
    z-index: 1;
  }

  .xg-bank-container {
    padding: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
  }

  .xg-bank-pannel {
    border: none;
  }

  .xg-bank-pannel .row .col {
    padding-right: 4px;
    padding-left: 4px;
  }

  .xg-bank-pannel .row .col input {
    height: auto;
    background-color: #3a3f44;
    border-color: #3a3f44;
    color: white;
    padding: 0;
  }

  .xg-bank-direction {
    margin: 4px;
  }

  .xg-bank-direction span {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  .xg-bank-info {
    position: relative;
    top: -4px;
    width: 380px;
    max-width: 90%;
    margin: auto;
    padding: 24px 20px 20px 20px;
    background-color: #22282e;
    border: 0;
    z-index: -1;
  }
</style>
