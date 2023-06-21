<template>
  <div class="p-10">
    <Modal ref="childRef" title="token 选择" @onHide="onHide">
      <div class="xg-token-selection">
        <div class="card xg-token-selection-outerbox">
          <div>
            <input
              class="form-control"
              type="text"
              placeholder="搜索代币"
              @keyup="search($event)"
            />
          </div>
          <div class="xg-token-selection-innerbox">
            <div
              v-for="(token, index) in allTokens"
              :key="index"
              class="xg-token-selection-item flex items-center"
              @click="select(token.name)"
            >
              <div class="grid flex-1">
                <img :src="`/src/assets/tokens/${token.image}.png`" />
              </div>
              <div class="grid flex-1">
                {{ token.name }}
              </div>
              <div class="grid flex-1">
                {{ token.balance }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import Modal from '~/components/core/Modal.vue';
  import { defineComponent, ref, onMounted, watch, SetupContext } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  import { environment } from '~/utils/iostConfig';
  import { ContractService } from '~/utils/contractServe';
  import { TokenManager } from '~/utils/tokenManager';
  import { BigNumber } from 'bignumber.js';

  const ROUND_DOWN = 1;

  export default defineComponent({
    name: 'TokenSelectVue',
    components: {
      Modal,
    },
    props: {
      willShowTokenSelection: {
        type: Boolean,
      },
    },
    setup(props, context: SetupContext) {
      watch(
        () => props.willShowTokenSelection,
        (newValue, oldValue) => {
          if (newValue === true) {
            callChildMethod();
          }
        },
      );

      const childRef = ref(null);
      const callChildMethod = () => {
        if (childRef.value) {
          (childRef.value as any).show();
        }
      };
      const onHide = () => {
        context.emit('onHide');
      };

      const waiting = ref(false);
      const appStore = commonStore();
      const myIOST = appStore.getMyIOST;
      const walletReady = appStore.getWalletReady;
      const account = appStore.getAccount;
      const allPairs = appStore.getAllPairs;
      const allTokens = ref<Record<string, any>>([]);
      const cachedBalance = ref<Record<string, any>>({});

      onMounted(() => {
        load();
      });
      const load = async () => {
        waiting.value = true;
        await TokenManager.constructor(myIOST);
        if (walletReady && account) {
          try {
            // 发起第一个异步请求
            loadDefaultList();
          } catch (error) {
            console.error(error);
          }
          waiting.value = false;
        } else {
          console.log('未连接钱包');
        }
      };

      const loadDefaultList = async () => {
        const defaultList = await TokenManager.getDefaultList();
        console.log('defaultList---', defaultList);
        await loadList(defaultList);
      };

      const loadList = async (list: any) => {
        const imageList = await TokenManager.getImageList();

        allTokens.value = list.map((tokenName: string) => {
          const token = {
            name: tokenName,
            image: imageList.indexOf(tokenName) >= 0 ? tokenName : '_',
            balance: 0,
          };

          if (cachedBalance.value[tokenName]) {
            token.balance = cachedBalance.value[tokenName];
          } else {
            TokenManager.getTokenBalance(tokenName).then((balance: any) => {
              token.balance = +new BigNumber(balance).toFixed(6, ROUND_DOWN);
              cachedBalance.value[tokenName] = token.balance;
            });
          }

          return token;
        });
      };

      const search = ($event: any) => {
        if ($event.which != 8 && ($event.which > 90 || $event.which < 48)) {
          return;
        }

        const prefix = $event.target.value.toLowerCase();

        if (!prefix) {
          loadDefaultList();
          return;
        }

        const list = TokenManager.getMergedList(allPairs).filter(
          (tokenName) => tokenName.indexOf(prefix) == 0,
        );

        loadList(list);

        if (list.indexOf(prefix) >= 0 || prefix.length < 2) {
          return;
        }

        TokenManager.getTokenInfo(prefix).then(async (info) => {
          if (info) {
            const balance = +new BigNumber(await TokenManager.getTokenBalance(prefix)).toFixed(
              6,
              ROUND_DOWN,
            );
            allTokens.value.unshift({
              name: prefix,
              image: '_',
              balance: balance,
            });
          }
        });
      };

      const select = async (tokenName: string) => {
        console.log('tokenName---', tokenName);
        if (cachedBalance.value[tokenName] !== undefined) {
          console.log('1111');
          context.emit('onSelect', {
            tokenName: tokenName,
            balance: cachedBalance.value[tokenName],
          });
        } else {
          console.log('222222');
          const balance = +new BigNumber(await TokenManager.getTokenBalance(tokenName)).toFixed(
            6,
            ROUND_DOWN,
          );

          context.emit('onSelect', {
            tokenName: tokenName,
            balance: balance,
          });
        }
      };

      const close = () => {
        context.emit('onClose');
      };
      return {
        childRef,
        onHide,
        search,
        allTokens,
        select,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .xg-token-selection-background {
    width: 100%;
    height: 100%;
    z-index: 1;
    margin-top: 100px;
  }

  .xg-token-selection-outerbox input {
    background-color: transparent;
    height: auto;
    padding: 5px 10px;
    text-align: center;
    font-size: 18px;
  }

  .xg-token-selection-innerbox {
    margin: 10px 0;
    height: 300px;
    overflow-y: auto;
  }

  .xg-token-selection-item {
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    font-weight: 500;
    padding: 4px 0;
    margin: 0;
    font-size: 18px;
  }

  .xg-token-selection-item .col {
    padding: 0;
  }

  .xg-token-selection-item:hover {
    background-color: #333333;
  }

  .xg-token-selection-item img {
    width: 32px;
    height: 32px;
  }
</style>
