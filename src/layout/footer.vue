<template>
  <div class="fixed inset-x-0 bottom-0 my-10 text-center text-lg"> {{ account }} </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { commonStore } from '~/stores/modules/common';
  export default defineComponent({
    name: 'LayoutFooter',
    setup() {
      const appStore = commonStore();
      const account = appStore.getAccount;
      return {
        account,
      };
    },
  });
</script>
<style lang="less" scoped></style>
