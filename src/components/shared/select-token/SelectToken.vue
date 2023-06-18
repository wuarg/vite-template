<template>
  <div>
    <div class="tokens-filters">
      <BaseInput v-model="searchText" size="large" placeholder="Search name or paste address" />
      <div class="common-tokens-section">
        <h5 class="section-title">
          Common bases
          <InfoTooltip text="These tokens are commonly paired with other tokens." />
        </h5>

        <!--
          line 26: "token in allTokens.slice(0, 6)"
          it's just a mocking for the common tokens
        -->

        <div class="section-body">
          <BaseButton
            v-for="token in allTokens.slice(0, 6)"
            :key="token.symbol"
            variant="outlined"
            class="token-button"
            :disabled="token.address === modelValue"
            @click="selectToken(token)"
          >
            <img class="token-image" :src="token.logoURI" :alt="`${token.name} logo`" />
            <h3 class="token-name">
              {{ token.symbol }}
            </h3>
          </BaseButton>
        </div>
      </div>
    </div>
    <ul class="currencies-list">
      <template v-for="token in allTokens">
        <li
          v-if="isTokenVisible(token)"
          :key="token.symbol"
          :class="['token-item', { selected: token.address === modelValue }]"
          @click="selectToken(token)"
        >
          <img class="token-image" :src="token.logoURI" :alt="`${token.name} logo`" />
          <h3 class="token-name">
            {{ token.symbol }}
            <span class="full-name">{{ token.name }}</span>
          </h3>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import BaseButton from '~/components/core/Button.vue';
  import BaseInput from '~/components/core/Input.vue';
  import InfoTooltip from '~/components/shared/InfoTooltip.vue';
  // import { createNamespacedHelpers } from 'vuex';

  // const { mapState, mapGetters } = createNamespacedHelpers('WalletModule');
  export default {
    name: 'SelectToken',
    components: {
      BaseButton,
      BaseInput,
      InfoTooltip,
    },
    props: {
      modelValue: {
        type: String,
      },
    },
    data() {
      return {
        searchText: '',
      };
    },
    computed: {
      // ...mapState(['commonTokens']),
      // ...mapGetters(['allTokens']),
    },
    methods: {
      selectToken(token) {
        this.$emit('selectToken', token);
      },
      isTokenVisible(token) {
        return (
          !this.searchText ||
          token.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          token.address === this.searchText
        );
      },
    },
  };
</script>

<style lang="less" scoped>
  @import '~/style/variables.less';
  .tokens-filters {
    padding: 0 15px 15px;
  }
  .section-title {
    margin-bottom: 10px;
  }
  .currencies-list {
    max-height: 450px;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid @darkBorderColor;
  }
  .token-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: @darkBorderColor;
    }
    &.selected {
      opacity: 0.5;
      cursor: default;
    }
  }

  .token-button {
    display: inline-flex;
    margin-right: 8px;
    margin-bottom: 8px;
    align-items: center;
    &:disabled {
      cursor: default;
      img {
        filter: grayscale(100%);
      }
    }
  }
  .token-image {
    width: 24px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .token-name {
    font-size: 16px;
    margin: 0;
    text-transform: uppercase;
    .full-name {
      font-size: 12px;
      color: @gray;
      display: block;
      font-weight: 400;
    }
  }
  .manage-tokens-button {
    font-size: 16px;
  }
</style>
