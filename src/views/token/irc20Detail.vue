<template>
  <div class="p-10"> template </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    name: 'TemplateVue',
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      // 模拟异步请求方法
      const fetchData = async (param: string) => {
        console.log('param---', param);
        try {
          // 发起异步请求，这里可以使用你的请求库（例如 axios）
          const response = await fetch(`https://example.com/api/data?param=${param}`);
          const data = await response.json();

          // 处理请求结果，例如更新组件状态
          console.log(data);
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
      });
      // 在 queryParam 变化时触发请求方法
      watchEffect(() => {
        console.log('queryParam.value222---', queryParam.value);
        if (queryParam.value) {
          // 执行你的请求方法，例如 fetchData 方法
          fetchData(queryParam.value);
        }
      });

      return {};
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .wrap {
    height: 100vh;
  }
</style>
