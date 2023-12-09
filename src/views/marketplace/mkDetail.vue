<template>
  <div class="irc--container mx-auto w-11/12 sm:w-3/4">
    <div class="my-10 flex items-center">
      <img src="/src/assets/img/back.png" alt="back" class="mr-3 w-5" @click="goBack()" />
      <h1 class="mb-0 text-left text-xl font-bold">热门代币</h1>
    </div>
    <div class="pc hidden sm:block">
      <div class="irc20-info flex items-center justify-between">
        <div class="irc20-info__img">
          <img src="/src/assets/img/iost.png" alt="twitter" />
        </div>
        <div class="irc20-info__div">
          <p>IRC- 100 IOST</p>
          <p>低价- {{ ircInfo.floorPrice }} IOST</p>
        </div>
        <div class="irc20-info__div">
          <p>单价$ {{ ircInfo.floorPrice }}</p>
        </div>
        <div class="irc20-info__div">
          <p>拥有者 {{ ircInfo.holders }}</p>
        </div>
        <div class="irc20-info__div">
          <p>在售 {{ ircInfo.floorPrice }}</p>
        </div>
        <div class="irc20-info__div">
          <p>总供应量 {{ ircInfo.max }}</p>
        </div>
      </div>
    </div>
    <div class="mobile block sm:hidden">
      <div class="irc20-info">
        <div class="irc20-info__img flex items-center justify-center">
          <img src="/src/assets/img/twitter.png" alt="twitter" class="w-10" />
        </div>
        <div class="irc20-info__div mt-5 text-left">
          <p style="color: #fff132">IRC- 100 IOST</p>
          <p>低价- {{ ircInfo.floorPrice }} IOST</p>
        </div>
        <div class="irc20-info__div flex items-center text-left">
          <p>单价$ {{ ircInfo.floorPrice }}</p>
          <p class="mx-3">总交易量 {{ ircInfo.amount }} iost</p>
        </div>
        <div class="irc20-info__div flex items-center text-left">
          <p>拥有者 {{ ircInfo.holders }}</p>
          <p class="mx-3">在售 err--</p>
          <p class="mx-3">总供应量 {{ ircInfo.max }}</p>
        </div>
      </div>
    </div>

    <div class="my-10 flex justify-center sm:justify-start">
      <BaseTabs :tabs="tabs" :initial-tab="selectedTabIndex" @change="handleTabSelected" />
    </div>
    <div class="irc20-search my-5 flex justify-between sm:my-10">
      <div class="irc20-search-refresh flex items-center justify-between">
        <span style="color: #fff132">数量：{{ ircInfo.max }}</span>
        <img src="/src/assets/img/refresh.png" alt="refresh" class="mx-3 w-5" />
      </div>
      <div class="irc20-search-input hidden sm:block">
        <BaseInputSearch
          v-model="searchValue"
          :default-search-value="defaultSearchValue"
          style="width: 200px"
        />
        <BaseSelect
          v-model:value="selectedValue"
          :default-value="defaultSelectedValue"
          style="width: 200px; margin: 0 10px"
          class="mx-5"
          @change="handleSelectChange"
        >
          <!-- 这里是 MySelect 的插槽内容 -->
          <a-select-option value="1">Option 1</a-select-option>
          <a-select-option value="2">Option 2</a-select-option>
          <a-select-option value="3">Option 3</a-select-option>
        </BaseSelect>
        <BaseSelect
          v-model:value="selectedValue"
          :default-value="defaultSelectedValue"
          style="width: 200px; margin: 0 10px"
          class="mx-5"
          @change="handleSelectChange"
        >
          <!-- 这里是 MySelect 的插槽内容 -->
          <a-select-option value="1">Option 1</a-select-option>
          <a-select-option value="2">Option 2</a-select-option>
          <a-select-option value="3">Option 3</a-select-option>
        </BaseSelect>
      </div>
    </div>
    <div class="pc mk-list my-10 hidden sm:block">
      <a-row :gutter="[16, 16]" class="mk-list__row">
        <a-col v-for="(item, index) in mkResData" :key="index" :span="6" class="mk-list__col pb-8">
          <div class="mk-list__col__div">
            <div class="header flex items-center justify-between p-5">
              <span>{{ item.tick }}</span>
              <span><img src="/src/assets/img/success2.png" class="w-5" /></span>
            </div>
            <div class="tags flex items-center justify-between px-5">
              <span>Irc-10</span>
              <span>mint</span>
              <span>#{{ item.blockNumber }}</span>
            </div>
            <div class="content py-6">
              <h3 class="yellow">{{ item.amt }}</h3>
              <p>
                <span class="green">$ {{ item.price }}</span
                >/
                <span>{{ item.tick }}</span>
              </p>
            </div>
            <div class="buy p-5">
              <div class="flex items-center justify-between py-3">
                <span>#{{ item.inscriptionId }}</span>
                <span>{{ item.owner }}</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="flex items-center">
                  <img src="/src/assets/img/iost.png" alt="" class="mr-3 w-4" />100
                </span>
                <span>$4.67</span>
              </div>
              <div class="flex items-center justify-between">
                <BaseButton
                  class="bg-button"
                  variant="text-text"
                  style="height: 30px; width: auto"
                  @click="handleBuyModal(item)"
                >
                  BUY
                </BaseButton>
                <img src="/src/assets/img/shop.png" alt="shop" class="h-5 w-5" />
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="mobile mk-list block sm:my-10 sm:hidden">
      <div class="search mb-5">
        <BaseInputSearch
          v-model="searchValue"
          :default-search-value="defaultSearchValue"
          class="w-full"
        />
      </div>

      <a-row :gutter="[8, 8]" class="mk-list__row">
        <a-col v-for="(item, index) in mkResData" :key="index" :span="24" class="mk-list__col">
          <div class="mk-list__col__div">
            <div class="header flex items-center justify-between p-5">
              <span>{{ item.tick }}</span>
              <span><img src="/src/assets/img/success2.png" class="w-5" /></span>
            </div>
            <div class="tags flex items-center justify-between px-5">
              <span>Irc-10</span>
              <span>mint</span>
              <span>#{{ item.blockNumber }}</span>
            </div>
            <div class="content py-6">
              <h3 class="yellow">{{ item.amt }}</h3>
              <p>
                <span class="green">$ 3.24</span>/
                <span>{{ item.tick }}</span>
              </p>
            </div>
            <div class="buy p-5">
              <div class="flex items-center justify-between py-3">
                <span>#{{ item.inscriptionId }}</span>
                <span>{{ item.owner }}</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="flex items-center">
                  <img src="/src/assets/img/iost.png" alt="" class="mr-3 w-4" />100
                </span>
                <span>$4.67</span>
              </div>
              <div class="flex items-center justify-between">
                <BaseButton
                  class="bg-button"
                  variant="text-text"
                  style="height: 30px; width: auto"
                  @click="handleBuyModal(item)"
                >
                  BUY
                </BaseButton>
                <img src="/src/assets/img/shop.png" alt="shop" class="h-5 w-5" />
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <buyModal
      :buy-visible="buyVisible"
      :tick="buyTick"
      @handleOk="handleOkBuy()"
      @handleCancle="handleHideBuy()"
    />
  </div>
</template>
<script lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  import { defineComponent, ref, onMounted, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import BaseTabs from '~/components/core/Tabs.vue';
  import BaseInput from '~/components/core/Input.vue';
  import BaseButton from '~/components/core/Button.vue';
  import buyModal from '~/views/marketplace/buyModal.vue';
  import BaseSelect from '~/components/core/Select.vue';
  import BaseInputSearch from '~/components/core/InputSearch.vue';
  import { getMkList, getMkInfo, getTokenInfo } from '~/api/index';

  export default defineComponent({
    name: 'MKDetail',
    components: {
      BaseTabs,
      // BaseInput,
      BaseButton,
      buyModal,
      BaseSelect,
      BaseInputSearch,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const buyTick = ref('');
      const ircInfo = ref({});
      const mkResData = ref([]);
      // 模拟异步请求方法
      const fetchData = async (param: string) => {
        console.log('param---', param);
        try {
          // 发起异步请求，这里可以使用你的请求库（例如 axios）
          const response = await getTokenInfo(param);
          // 处理请求结果，例如更新组件状态
          console.log('response---', response);
          ircInfo.value = response.data;
          const mkRes = await getMkInfo(param);
          console.log('mkRes---', mkRes.data.nodes);
          mkResData.value = mkRes.data.nodes;
          // 处理请求结果，例如更新组件状态
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      // 定义一个响应式变量，存储 query 参数的值
      const queryParam = ref<string | null>(null);
      // 使用路由钩子监听路由变化
      const route = useRoute();

      watchEffect(() => {
        // 在路由变化时更新 queryParam 的值
        queryParam.value = (route.query.id as string) || null;
        console.log('queryParam.value111---', queryParam.value);
        // 在 queryParam 变化时触发请求方法
        if (queryParam.value) {
          // 执行你的请求方法，例如 fetchData 方法
          fetchData(queryParam.value);
        }
      });

      // tabs
      const tabs = ref([
        { label: '在售列表', content: 'Content for Tab 1' },
        { label: '值', content: 'Content for Tab 2' },
        { label: '订单', content: 'Content for Tab 3' },
        { label: '我的订单', content: 'Content for Tab 4' },
      ]);
      const selectedTabIndex = ref(0);

      const handleTabSelected = (index: number) => {
        console.log('index---', index);
        // 处理选中事件，例如更新内容或执行其他逻辑
        selectedTabIndex.value = index;
      };

      // 搜索
      const searchToken = ref('');
      const options = ref<SelectProps['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ]);
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      const handleBlur = () => {
        console.log('blur');
      };
      const handleFocus = () => {
        console.log('focus');
      };
      const filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };
      // 购买弹窗
      const buyVisible = ref(false);
      const handleBuyModal = (i: any) => {
        console.log('2222--', i);
        buyTick.value = i.tick;
        buyVisible.value = true;
      };
      const handleOkBuy = () => {
        buyVisible.value = false;
      };
      const handleHideBuy = () => {
        buyVisible.value = false;
      };

      //select 组件
      const selectedValue = ref<string | number | null>(null);
      const defaultSelectedValue = '2';
      const handleSelectChange = (value: any) => {
        console.log('Selected value:', value);
      };
      // search 组件
      const searchValue = ref<string>('');
      const defaultSearchValue = 'initial search text';

      const router = useRouter();
      const goBack = () => {
        router.push({ name: 'Tokens' });
      };

      return {
        tabs,
        selectedTabIndex,
        handleTabSelected,
        searchToken,
        selectValue: ref<string | undefined>(undefined),
        filterOption,
        handleBlur,
        handleFocus,
        handleChange,
        options,
        buyVisible,
        handleBuyModal,
        handleOkBuy,
        handleHideBuy,
        selectedValue,
        defaultSelectedValue,
        handleSelectChange,
        searchValue,
        defaultSearchValue,
        goBack,
        ircInfo,
        mkResData,
        buyTick,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  @import '~/style/variables.less';
  h1 {
    color: @success;
    font-weight: bold;
  }
  .mk-list {
    &__col__div {
      // width: 100%;
      // max-width: 600px;
      // border: 1px solid @lightSecondaryBackground;
      border-radius: 20px;
      // background-color: @lightBackground;
      overflow: hidden;
      background: url('../../assets/img/mint-modal1.png') no-repeat;
      background-size: 100% 100%;
    }
    .buy {
      background: @purple2;
    }
    .yellow {
      color: @yellow;
    }
    .green {
      color: @green;
    }
  }
</style>
