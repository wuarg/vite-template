<template>
  <section class="swap-box m-auto">
    <header class="box-header">
      <h3 class="box-title">Swap</h3>
      <TransactionSettings />
    </header>

    <div class="box-body">
      <div class="currency-input">
        <div class="input-holder">
          <SelectTokenModal v-model="swapFrom.address" />
          <input v-model="swapFrom.value" placeholder="0.0" />
        </div>
        <p v-if="swapFrom.address" class="input-note"> Balance: 0 </p>
      </div>
      <div class="currency-input">
        <div class="input-holder">
          <SelectTokenModal v-model="swapTo.address" />
          <input v-model="swapTo.value" placeholder="0.0" />
        </div>
        <p v-if="swapTo.address" class="input-note"> Balance: 0 </p>
      </div>
    </div>

    <footer>
      <XButton variant="primary-text" size="large" block> Enter an amount </XButton>
    </footer>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import XButton from '~/components/core/Button.vue';
  import TransactionSettings from '~/components/swap/TransactionSettings.vue';
  import SelectTokenModal from '~/components/shared/select-token/SelectTokenModal.vue';
  export default defineComponent({
    name: 'SwapBox',
    components: {
      XButton,
      SelectTokenModal,
      TransactionSettings,
    },
    data() {
      return {
        swapFrom: {
          address: '',
          value: '',
        },
        swapTo: {
          address: '',
          value: '',
        },
      };
    },
    computed: {
      // ...mapState(['accountAddress']),
      // ...mapGetters(['allTokens']),
    },
    created() {
      // this.getTokens();
    },
    methods: {
      // ...mapActions(['openConnectWalletModal', 'getTokens']),
      // getTokenByAddress(address: string) {
      //   return address;
      //   // return this.allTokens.find((token) => token.address === address);
      // },
    },
  });
</script>

<style lang="less" scoped>
  @import '../../style/variables.less';
  .swap-box {
    width: 100%;
    max-width: 480px;
    padding: 8px;
    background-color: @darkBackground;
    border-radius: 24px;
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
      rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    .box-header {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
    }
    .box-title {
      font-size: 16px;
      margin: 0;
    }
  }
  .box-body {
    margin-bottom: 8px;
  }
  .currency-input {
    border-radius: 20px;
    border: 1px solid @darkBorderColor;
    background-color: @darkSecondaryBackground;
    padding: 16px;
    margin-bottom: 4px;
    &:hover {
      border-color: @darkBorderSecondaryColor;
    }
    .input-holder {
      display: flex;
      justify-content: space-between;
    }
    input {
      min-width: 50px;
      background: none;
      border: none;
      font-size: 24px;
      text-align: right;
      color: #fff;
      &:focus,
      &:active {
        outline: none;
      }
    }
    .input-note {
      font-size: 14px;
      font-weight: 400;
      color: @grayText;
      margin: 12px 0 0;
    }
  }
</style>
