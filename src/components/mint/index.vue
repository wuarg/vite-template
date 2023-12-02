<template>
  <div class="mint-container p-10">
    <p class="mt-16 text-3xl">The frst inscription platform on IOST</p>
    <img src="/src/assets/img/banner.png" class="mb-10 mt-8 inline w-1/3" alt="" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  export default defineComponent({
    name: 'Mint',
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      return {};
    },
    computed: {},
  });
</script>
<style lang="less" scoped></style>
