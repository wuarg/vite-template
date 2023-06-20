<template>
  <div class="m-auto p-10">
    <div class="xg-vault-manage">
      <div class="card xg-vault-manage-outerbox">
        <div>
          <h5>抵押资产</h5>
        </div>

        <div class="xg-vault-manage-pannel card bg-primary">
          <div class="row" style="margin-bottom: 14px">
            <div class="col col-4 text-left"> Stake </div>
            <div class="col col-8 text-right"> 可用: {{ tokenBalance }} {{ fullName }} </div>
          </div>
          <div class="row" style="margin-bottom: 2px">
            <div class="col">
              <input
                v-model="amountDeposit"
                class="form-control"
                type="text"
                placeholder="0.0"
                :disabled="waitingDeposit"
                @keydown="checkAmount($event)"
                @keyup="enterAmount()"
                @change="enterAmount()"
              />
            </div>
            <div class="col col-auto">
              <button
                class="btn btn-sm btn-light"
                style="margin-right: 6px"
                :disabled="waitingDeposit"
                @click="goMax()"
              >
                最大
              </button>
            </div>
          </div>
        </div>

        <div style="margin-top: 10px">
          <button
            class="input-btn btn"
            :class="{ 'btn-danger': !waitingDeposit, 'btn-light': waitingDeposit }"
            style="width: 100%"
            type="button"
            :disabled="!canDeposit || waitingDeposit"
            @click="deposit()"
          >
            {{ waitingDeposit ? '提交中...' : '抵押' }}
          </button>
        </div>

        <div style="margin-top: 10px">
          <h5>当前资产</h5>
        </div>

        <div class="xg-vault-manage-pannel" style="padding: 2px 30px">
          <div class="row" style="margin-bottom: 14px">
            <div class="col col-4 text-left"> 本金 </div>
            <div class="col col-8 text-right"> {{ poolAmount }} {{ fullName }} </div>
          </div>
          <div v-if="canUnlockAmount" class="row" style="margin-bottom: 14px">
            <div class="col col-4 text-left"> 可解锁本金 </div>
            <div class="col col-8 text-right"> {{ canUnlockAmount }} {{ fullName }} </div>
          </div>
          <div v-if="token.indexOf('xlp') == 0" class="row" style="margin-bottom: 14px">
            <div class="col col-4 text-left">
              约等于<br />
              (有延迟)
            </div>
            <div v-if="pair" class="col col-8 text-right">
              {{ token0Balance || 0 }} {{ pair.token0 }}<br />+ {{ token1Balance || 0 }}
              {{ pair.token1 }}
            </div>
          </div>
          <div class="row" style="margin-bottom: 14px">
            <div class="col col-4 text-left"> 盈利 </div>
            <div class="col col-8 text-right"> {{ pendingAmount }} xplus </div>
          </div>
          <div v-if="extra" class="row" style="margin-bottom: 14px">
            <div class="col col-4 text-left"> 额外盈利 </div>
            <div class="col col-8 text-right">
              <span>{{ extraPendingAmount }} {{ extra }}</span>
            </div>
          </div>
        </div>

        <div class="row" style="margin: 10px -5px">
          <div class="col col-6" style="padding: 0 5px">
            <button
              class="input-btn btn"
              :class="{ 'btn-warning': !waitingWithdraw, 'btn-light': waitingWithdraw }"
              style="width: 100%"
              type="button"
              :disabled="!canWithdraw || waitingWithdraw"
              @click="withdraw()"
            >
              {{ waitingWithdraw ? '提交中...' : '提取全部' }}
            </button>
          </div>
          <div class="col col-6" style="padding: 0 5px">
            <button
              class="input-btn btn"
              :class="{ 'btn-success': !waitingClaim, 'btn-light': waitingClaim }"
              style="width: 100%"
              type="button"
              :disabled="!canClaim || waitingClaim || (isInList(token) && !isBonusUnlocked())"
              @click="claim()"
            >
              {{ waitingClaim ? '提交中...' : '提取盈利' }}
            </button>
          </div>
        </div>
        <div>
          <button class="btn btn-dark" style="width: 100%; margin-top: 10px" @click="cancel()">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { BigNumber } from 'bignumber.js';
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, onMounted, toRefs } from 'vue';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { SwapManager } from '~/utils/swapManager';
  import { FarmManager } from '~/utils/farmManager';

  const ROUND_DOWN = 1;

  export default defineComponent({
    name: 'Template2Vue',
    props: {
      profile: {
        type: Object,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        default: () => {},
      },
      fullName: {
        type: String,
        default: '',
      },
      token: {
        type: String,
        default: '',
      },
      precision: {
        type: Number,
        default: 0,
      },
      extra: {
        type: Number,
        default: 0,
      },
      extraPrecision: {
        type: Number,
        default: 0,
      },
      lockDays: {
        type: Number,
        default: 0,
      },
    },
    setup(props) {
      const { token, fullName, precision, extra, extraPrecision, lockDays } = toRefs(props);
      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      // const ROUND_DOWN = ref<string | number>(1);
      const XG_LIST = ref(['xg_3', 'xg_30', 'xg_90', 'xg_180']);

      const realToken = ref('');

      const tokenBalance = ref(0);
      const poolAmount = ref(0);
      const pendingAmount = ref<string | number>(0);
      const extraPendingAmount = ref<string | number>(0);

      const canUnlockAmount = ref('');
      const amountDeposit = ref('');
      const amountDepositOld = ref('');

      const waitingDeposit = ref(false);
      const canDeposit = ref(false);

      const waitingWithdraw = ref(false);
      const canWithdraw = ref(false);

      const waitingClaim = ref(false);
      const canClaim = ref(false);

      const now = ref(0);
      const nowLocal = ref(0);
      const totalAlloc = ref(0);

      const pool = ref<Record<string, any>>({});
      const userInfoToken = ref<Record<string, any>>({});

      const pair = ref<Record<string, any>>({});

      const token0Balance = ref('');
      const token1Balance = ref('');

      const interval0 = ref(null);
      const interval1 = ref(null);

      const alertTitleCN = ref('');
      const alertTitleEN = ref('');
      const alertBodyCN = ref('');
      const alertBodyEN = ref('');
      const willShowAlertMessage = ref(false);

      onMounted(() => {
        if (XG_LIST.value.indexOf(token.value) >= 0) {
          realToken.value = environment.xg;
        } else if (['xplus_30', 'xplus_60', 'xplus_90'].indexOf(token.value) >= 0) {
          realToken.value = 'xplus';
        } else if (['iost_30', 'iost_90'].indexOf(token.value) >= 0) {
          realToken.value = 'iost';
        } else {
          realToken.value = token.value;
        }

        load();

        // this.interval0 = setInterval(() => {
        //   this.load();
        // }, 60 * 1e3);

        // this.interval1 = setInterval(() => {
        //   this.estimate();
        // }, 1 * 1e3);
      });
      const load = async () => {
        waiting.value = true;
        await SwapManager.constructor(myIOST);
        await FarmManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            const all = [
              (async () => {
                tokenBalance.value = await SwapManager.getTokenBalance(realToken.value);
              })(),
              (async () => {
                now.value = await FarmManager.getNow();
                nowLocal.value = Math.floor(new Date().getTime() / 1000);
              })(),
              (async () => {
                pool.value = await FarmManager.getPool(token.value);
              })(),
              (async () => {
                totalAlloc.value = await FarmManager.getTotalAlloc();
              })(),
              (async () => {
                userInfoToken.value = await FarmManager.getUserInfoOfToken(token.value);
                poolAmount.value = userInfoToken.value ? userInfoToken.value.amount : '0';
                canWithdraw.value = new BigNumber(poolAmount.value).gt(0);
              })(),
            ];

            await Promise.all(all);

            pendingAmount.value = FarmManager.getRewardPending(
              now.value,
              totalAlloc.value,
              pool.value,
              userInfoToken.value,
            );
            extraPendingAmount.value = FarmManager.getExtraPending(
              now.value,
              totalAlloc.value,
              pool.value,
              userInfoToken.value,
            );

            const array = fullName.value.split('-');
            if (array.length == 2) {
              pair.value = await SwapManager.getPair(array[0], array[1]);
            }

            if (pair.value && poolAmount.value) {
              token0Balance.value = new BigNumber(pair.value.reserve0)
                .times(poolAmount.value)
                .div(pair.value.xlpSupply)
                .toFixed(pair.value.precision0, ROUND_DOWN);
              token1Balance.value = new BigNumber(pair.value.reserve1)
                .times(poolAmount.value)
                .div(pair.value.xlpSupply)
                .toFixed(pair.value.precision1, ROUND_DOWN);
            }

            if (isInList(token.value)) {
              const today = Math.floor(now.value / 3600 / 24);
              canUnlockAmount.value = await FarmManager.getCanUnlock(
                token.value,
                poolAmount.value,
                today,
                lockDays.value,
              );
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('未连接钱包');
        }
      };
      const isInList = (token: any) => {
        return (
          XG_LIST.value.indexOf(token.value) >= 0 ||
          ['xplus_30', 'xplus_60', 'xplus_90'].indexOf(token.value) >= 0 ||
          ['iost_30', 'iost_90'].indexOf(token.value) >= 0
        );
      };
      const isBonusUnlocked = () => {
        return +canUnlockAmount.value >= 1 && +canUnlockAmount.value + 1 >= +poolAmount.value;
      };
      const estimate = () => {
        if (!now.value || !totalAlloc.value || !pool.value || !userInfoToken.value) {
          return;
        }

        const nowRealTime = Math.floor(new Date().getTime() / 1000);
        const nowEstimated = now.value + nowRealTime - nowLocal.value;
        pendingAmount.value = FarmManager.getRewardPending(
          nowEstimated,
          totalAlloc.value,
          pool.value,
          userInfoToken.value,
        );

        canClaim.value = new BigNumber(pendingAmount.value).gt(0);
      };

      const goMax = () => {
        amountDeposit.value = new BigNumber(tokenBalance.value).toFixed(
          precision.value,
          ROUND_DOWN,
        );
        enterAmount();
      };

      const enterAmount = async () => {
        if (isNaN(+amountDeposit.value)) {
          amountDeposit.value = amountDepositOld.value;
          return;
        }

        amountDeposit.value = amountDeposit.value.trim();
        amountDepositOld.value = amountDeposit.value;

        var valueDeposit = parseFloat(amountDeposit.value);

        if (!valueDeposit) {
          canDeposit.value = false;
          return;
        }

        canDeposit.value = true;
      };

      const checkAmount = ($event: any) => {
        if (environment.allowedKeycodes.indexOf($event.which) < 0) {
          return false;
        }

        return true;
      };

      const deposit = async () => {
        var valueDeposit = parseFloat(amountDeposit.value);

        if (!valueDeposit) {
          return;
        }

        waitingDeposit.value = true;
        try {
          const res =
            XG_LIST.value.indexOf(token.value) >= 0
              ? await ContractService.helperDeposit(token.value, valueDeposit)
              : await ContractService.deposit(token.value, valueDeposit);

          // this.showAlert(
          //   '抵押成功',
          //   'Staked successfully',
          //   '如果还没有看到，请几秒后刷新页面',
          //   "If you don't see what you staked, please refresh the page in a few seconds",
          // );

          amountDeposit.value = '';
          amountDepositOld.value = '';
          canDeposit.value = false;

          load();

          // onRefresh.emit();
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
          //   this.showAlert('抵押失败', 'Transaction Failed', '请再次尝试', 'Please try again');
          // }
        }

        waitingDeposit.value = false;
      };

      const withdraw = async () => {
        waitingWithdraw.value = true;
        try {
          const res =
            XG_LIST.value.indexOf(token.value) >= 0
              ? await ContractService.helperWithdraw(token.value)
              : await ContractService.withdraw(token.value);

          // this.showAlert(
          //   '提取成功',
          //   'Unstaked successfully',
          //   '如果还没有看到，请几秒后刷新页面',
          //   "If you don't see what you staked, please refresh the page in a few seconds",
          // );

          load();

          // this.onRefresh.emit();
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
          //   this.showAlert('提取失败', 'Transaction Failed', '请再次尝试', 'Please try again');
          // }
        }

        waitingWithdraw.value = false;
      };

      const claim = async () => {
        waitingClaim.value = true;
        try {
          const res = await ContractService.claim(token.value);

          // this.showAlert(
          //   '提取成功',
          //   'Claimed successfully',
          //   '如果还没有看到，请几秒后刷新页面',
          //   "If you don't see what you claimed, please refresh the page in a few seconds",
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
          //   this.showAlert('提取失败', 'Transaction Failed', '请再次尝试', 'Please try again');
          // }
        }

        waitingClaim.value = false;
      };
      const cancel = () => {
        // this.onClose.emit();
      };
      return {
        tokenBalance,
        waitingDeposit,
        amountDeposit,
        canDeposit,
        poolAmount,
        canUnlockAmount,
        pair,
        token0Balance,
        token1Balance,
        pendingAmount,
        extraPendingAmount,
        waitingWithdraw,
        canWithdraw,
        waitingClaim,
        canClaim,

        checkAmount,
        enterAmount,
        goMax,
        deposit,
        withdraw,
        claim,
        isInList,
        isBonusUnlocked,
        cancel,
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
