<template>
  <div class="irc--container m-auto w-3/4">
    <div class="my-10 flex items-center">
      <img src="/src/assets/img/back.png" alt="back" class="mr-3 w-5" />
      <h1 class="mb-0 text-left text-xl font-bold">代币列表</h1>
    </div>
    <div class="mx-auto my-10 text-center">
      <BaseProgress :percentage="progress" />
    </div>
    <div class="irc-info my-10 p-5">
      <h1 class="mb-5 text-left text-xl font-bold">Overview</h1>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Total Supply</span>
        <span class="text-l text-left font-bold">21000</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Total Supply</span>
        <span class="text-l text-left font-bold">21000</span>
      </div>
      <div class="my-5 flex justify-between">
        <span class="text-l text-left font-bold">Total Supply</span>
        <span class="text-l text-left font-bold">21000</span>
      </div>
    </div>
    <div class="my-10 flex items-center justify-center">
      <BaseTabs :tabs="tabs" :initial-tab="selectedTabIndex" @change="handleTabSelected" />
    </div>
    <div class="tab-content my-10">
      <!-- 根据选中的tab索引显示内容 -->
      <!-- {{ selectedTabIndex }}
      <div v-if="selectedTabIndex === 0">Tab 1 content</div>
      <div v-if="selectedTabIndex === 1">Tab 2 content</div>
      <div v-if="selectedTabIndex === 2">Tab 3 content</div>
      <div v-if="selectedTabIndex === 3">Tab 4 content</div> -->
      <!-- 添加更多tab内容 -->
      <BaseTable :columns="tableColumns2" :data="tableData2" :pagination="true">
        <!-- Slot for customizing header cells -->
        <template #header="{ column }">
          <strong>{{ column.label }}</strong>
        </template>

        <!-- Slot for customizing body cells -->
        <template #cell="{ cell }"> {{ cell }}</template>
      </BaseTable>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import BaseProgress from '~/components/core/Progress.vue';
  import BaseTabs from '~/components/core/Tabs.vue';
  import BaseTable from '~/components/core/Table.vue';
  export default defineComponent({
    name: 'IRC20',
    components: {
      BaseProgress,
      BaseTabs,
      BaseTable,
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
      const progress = ref(50);
      const tabs = ref([
        { label: 'Holders', content: 'Content for Tab 1' },
        { label: 'Transfers', content: 'Content for Tab 2' },
      ]);
      const selectedTabIndex = ref(0);
      const handleTabSelected = (index: number) => {
        console.log('index---', index);
        // 处理选中事件，例如更新内容或执行其他逻辑
        selectedTabIndex.value = index;
      };
      const tableColumns2 = [
        { key: 'iost', label: 'Rank' },
        { key: 'status', label: 'Address' },
        { key: 'from', label: 'Percentage' },
        { key: 'to', label: 'Value' },
      ];
      const tableData2 = [
        {
          iost: '100',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        {
          iost: '13300',
          status: '20000 IOS',
          from: '1000',
          to: '100000 IOST',
        },
        // Add more data as needed
      ];
      return {
        progress,
        tabs,
        selectedTabIndex,
        handleTabSelected,
        tableColumns2,
        tableData2,
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
  .irc-info {
    background: #8456fc;
    border-radius: 10px;
    border: 1px solid #ffffff;
  }
</style>
