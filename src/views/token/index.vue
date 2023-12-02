<template>
  <div class="token-container p-10">
    <h3 class="title text-4xl">查看地址的代币余额</h3>
    <BaseInput />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
  import BaseInput from '~/components/core/Input.vue';
  export default defineComponent({
    name: 'Token',
    components: {
      BaseInput,
    },
    setup() {
      onMounted(() => {
        //
      });

      return {};
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .title {
    font-family: REEJI-TaikoMagicGB-Flash, REEJI-TaikoMagicGB-Flash;
    font-weight: bold;
  }
</style>
