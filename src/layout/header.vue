<template>
  <header class="header sticky top-0 z-40 flex h-20 items-center px-5 sm:px-10">
    <div class="bg delay-400 absolute transition-colors"></div>
    <div class="logo">
      <img src="/src/assets/img/logo.png" class="inline w-full sm:w-1/2" alt="" />
    </div>
    <div class="flex w-full items-center justify-between">
      <div class="menu">
        <router-link to="/home" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('home') }}</span>
        </router-link>
        <!-- <router-link to="/about" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('about.link_name') }}</span>
        </router-link> -->
        <router-link to="/token" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('tokens.menu') }}</span>
        </router-link>
        <router-link to="/marketplace" class="mx-4" active-class="font-black text-white">
          <span> {{ $t('marketplace.menu') }}</span>
        </router-link>
      </div>
      <div class="hidden sm:block">
        <div class="link flex items-center justify-end">
          <BaseDropdown v-if="account" :dropdown-items="menuItems">
            <BaseButton class="bg-button" variant="text-text" style="height: 40px; width: auto">
              {{ account }}
            </BaseButton>
          </BaseDropdown>
          <BaseButton
            v-else
            class="bg-button"
            variant="text-text"
            style="height: 40px; width: auto"
            @click="handleConnectWallet()"
          >
            Connect Wallet
          </BaseButton>

          <div class="shop-box mx-4 w-8" @click="showDrawer">
            <img src="/src/assets/img/shop.png" alt="shop" />
          </div>
          <button class="nav-btn ml-2 text-center" @click="toggleLocale()">
            <icon-carbon-language class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- <button class="nav-btn" @click="themeAni">
        <icon-carbon-sun v-if="!isDark" class="h-6 w-6" />
        <icon-carbon-moon v-else class="h-6 w-6" />
      </button> -->

      <!-- <a href="http://soulfree.cn" target="_blank" class="ml-2 text-center">
        <button class="nav-btn">
          <icon-mdi:blogger class="h-6 w-6" />
        </button>
      </a>
      <a href="https://github.com/AxyLm/vite-taicu" target="_blank" class="ml-2 text-center">
        <button class="nav-btn">
          <icon-carbon:logo-github class="h-6 w-6" />
        </button>
      </a> -->
      <a-drawer
        v-model:visible="visible"
        class="custom-class"
        :header-style="{ background: '#8456FC' }"
        :drawer-style="{ background: '#8456FC' }"
        title="购物车"
        placement="right"
        width="40%"
        @after-visible-change="afterVisibleChange"
      >
        <div class="empty text-center">
          <img src="/src/assets/img/shop.png" alt="shop" class="mx-auto" />
          <p class="my-5">暂没有商品加入购物车</p>
          <BaseButton class="bg-button" variant="text-text" style="height: 50px; width: auto">
            浏览集合
          </BaseButton>
        </div>
        <div class="shop-list">
          <!-- <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
            Reload
          </a-button> -->
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `Selected ${selectedRowKeys.length} items` }}
            </template>
          </span>
          <a-table
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data-source="data"
            :loading="false"
            :pagination="false"
          >
            <!-- <template #emptyText> 空数据 </template> -->
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'name'">
                <div class="flex items-center justify-between">
                  <div class="img w-16">
                    <img src="/src/assets/img/twitter.png" alt="twitter" />
                  </div>
                  <div class="desc">
                    <p>IRC-100</p>
                    <p>#1029</p>
                  </div>
                  <div class="desc">
                    <p>{{ record.name }}</p>
                    <p>#1033</p>
                  </div>
                </div>
              </template>
            </template>
          </a-table>
        </div>
        <div class="shop-total my-5 flex items-center justify-between p-5">
          <div class="num">
            <p>总共支付</p>
            <p class="num__p">450 IOST</p>
          </div>
          <div class="btn">
            <BaseButton class="bg-button" variant="text-text" style="height: 50px; width: auto">
              现在购买
            </BaseButton>
          </div>
        </div>
      </a-drawer>
    </div>
  </header>
  <WalletConnect :wallet-visible="walletVisible" @handleClose="handleClose" />
</template>
<!-- <script setup lang="ts">
  import { isDark, useThemeChang } from '~/composables';
  // import { useI18n } from "vue-i18n";
  import { useI18n } from '~/modules/i18n';
  const { t, toggleLocale } = useI18n();

  const { themeAni } = useThemeChang(isDark);
</script> -->
<script lang="ts">
  import WalletConnect from '~/components/wallet/WalletConnect.vue';
  import BaseButton from '~/components/core/Button.vue';
  import BaseDropdown from '~/components/core/Dropdown.vue';
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, computed, reactive, toRefs } from 'vue';
  import { isDark, useThemeChang } from '~/composables';
  // import { useI18n } from "vue-i18n";
  import { useI18n } from '~/modules/i18n';
  import { connect } from 'http2';
  import ConnectWallet from '~/components/wallet/ConnectWallet.vue';

  type Key = string | number;

  interface DataType {
    key: Key;
    name: string;
    age: number;
    address: string;
  }

  const columns = [
    {
      title: 'items',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'age',
    },
    {
      title: 'Value',
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [];
  // for (let i = 0; i < 6; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      BaseButton,
      BaseDropdown,
      WalletConnect,
    },
    setup() {
      const { t, toggleLocale } = useI18n();
      const appStore = commonStore();
      const account = appStore.getAccount;

      // 购物车
      const visible = ref<boolean>(false);
      const afterVisibleChange = (bool: boolean) => {
        console.log('open', bool);
      };
      const showDrawer = () => {
        visible.value = true;
      };
      //测试table
      const state = reactive<{
        selectedRowKeys: Key[];
        loading: boolean;
      }>({
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      });
      const hasSelected = computed(() => state.selectedRowKeys.length > 0);

      const start = () => {
        state.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          state.loading = false;
          state.selectedRowKeys = [];
        }, 1000);
      };
      const onSelectChange = (selectedRowKeys: Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        state.selectedRowKeys = selectedRowKeys;
      };

      const menuItems = [
        { key: 'item1', title: 'Item 1' },
        { key: 'item2', title: 'Item 2' },
        { key: 'item3', title: 'Item 3' },
      ];

      // Wallet
      const walletVisible = ref(false);
      const handleConnectWallet = () => {
        console.log('handleConnectWallet');
        walletVisible.value = true;
      };
      const handleClose = () => {
        console.log('handleClose');
        walletVisible.value = false;
      };

      return {
        account,
        toggleLocale,
        visible,
        afterVisibleChange,
        showDrawer,
        data,
        columns,
        hasSelected,
        ...toRefs(state),
        // func
        start,
        onSelectChange,
        menuItems,
        walletVisible,
        handleConnectWallet,
        handleClose,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header .bg {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    backdrop-filter: saturate(250%) blur(20px);
    box-shadow: 0px 0px 25px 5px rgb(10 10 10 / 12%);
  }

  .dark {
    .header .bg {
      // background: rgba(40, 40, 40, 0.5) !important;
      box-shadow: 0px 0px 25px 5px rgb(0 0 0 / 12%) !important;
    }
  }

  .nav-btn {
    @apply w-8 text-center transition-none dark:text-base-1 dark:transition-none;
  }
  .title {
    @apply text-2xl font-normal text-base-13   delay-300  dark:text-base-1 dark:transition-colors;
  }

  /deep/.ant-table {
    background: transparent;
  }
  /deep/ .ant-table-thead > tr > th {
    background: transparent;
  }
  /deep/ .ant-table-thead > tr > th {
    // color: #fff;
  }
  .shop-total {
    background: #8c6dff;
    .num {
      &__p {
        font-weight: bold;
        color: #fff132;
      }
    }
  }
</style>
