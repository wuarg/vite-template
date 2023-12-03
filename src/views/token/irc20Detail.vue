<template>
  <div class="irc--container m-auto w-3/4">
    <div class="my-10 flex justify-between">
      <h1 class="mb-5 text-left text-xl font-bold">代币列表</h1>
    </div>
    <div class="mx-auto my-10 text-center">
      <BaseProgress :percentage="progress" />
    </div>
    <div class="irc-info p-5">
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
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import BaseProgress from '~/components/core/Progress.vue';
  export default defineComponent({
    name: 'IRC20',
    components: {
      BaseProgress,
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
      return {
        progress,
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
