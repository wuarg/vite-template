<template>
  <div class="irc--container m-auto w-3/4">
    <div class="my-10 flex justify-between">
      <h1 class="mb-5 text-left text-xl font-bold">热门代币</h1>
    </div>
    <div class="irc20-info flex items-center justify-between">
      <div class="irc20-info__img">
        <img src="/src/assets/img/twitter.png" alt="twitter" />
      </div>
      <div class="irc20-info__div">
        <p>IRC- 100 IOST</p>
        <p>低价- 100 IOST</p>
      </div>
      <div class="irc20-info__div">
        <p>单价$ 0.5</p>
      </div>
      <div class="irc20-info__div">
        <p>拥有者 1450</p>
      </div>
      <div class="irc20-info__div">
        <p>在售 540</p>
      </div>
      <div class="irc20-info__div">
        <p>总供应量 21000000</p>
      </div>
    </div>
    <div class="my-10 flex justify-start">
      <BaseTabs :tabs="tabs" :initial-tab="selectedTabIndex" @change="handleTabSelected" />
    </div>
    <div class="irc20-search my-10 flex justify-between">
      <div class="irc20-search-refresh flex items-center justify-between">
        <span style="color: #fff132">数量：21000</span>
        <img src="/src/assets/img/refresh.png" alt="refresh" class="mx-3 w-5" />
      </div>
      <div class="irc20-search-input">
        <BaseInput
          v-model="searchToken"
          placeholder="根据铭文ID搜索"
          background="background"
          border="border"
          class="mx-5"
        />
        <a-select
          v-model:value="selectValue"
          class="mx-5"
          show-search
          placeholder="显示所有"
          style="width: 200px; margin: 0 10px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
        <a-select
          v-model:value="selectValue"
          class="mx-5"
          show-search
          placeholder="价格从高到低"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  import { defineComponent, ref, onMounted, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import BaseTabs from '~/components/core/Tabs.vue';
  import BaseInput from '~/components/core/Input.vue';

  export default defineComponent({
    name: 'MKDetail',
    components: {
      BaseTabs,
      BaseInput,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      // 模拟异步请求方法
      const fetchData = async (param: string) => {
        console.log('param---', param);
        // try {
        //   // 发起异步请求，这里可以使用你的请求库（例如 axios）
        //   const response = await fetch(`https://example.com/api/data?param=${param}`);
        //   const data = await response.json();

        //   // 处理请求结果，例如更新组件状态
        //   console.log(data);
        // } catch (error) {
        //   console.error('Error fetching data:', error);
        // }
      };
      // 定义一个响应式变量，存储 query 参数的值
      const queryParam = ref<string | null>(null);
      // 使用路由钩子监听路由变化
      const route = useRoute();

      watchEffect(() => {
        // 在路由变化时更新 queryParam 的值
        queryParam.value = (route.query.id as string) || null;
        console.log('queryParam.value111---', queryParam.value);
      });
      // 在 queryParam 变化时触发请求方法
      watchEffect(() => {
        console.log('queryParam.value222---', queryParam.value);
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
</style>
