<template>
  <div class="mint-container p-10">
    <p class="mt-10 text-3xl">The frst inscription platform on IOST</p>
    <img src="/src/assets/img/banner.png" class="mb-10 mt-8 inline w-1/3" alt="" />
    <div class="mint-process">
      <p class="mint-process__price">
        <span class="p-20"> IOST Labes</span>
        <span class="p-20"> 价格: 10 I0ST</span>
      </p>
      <div class="mx-auto my-10 w-1/3 text-center">
        <BaseProgress :percentage="progress" />
      </div>
      <button @click="increaseProgress">Increase Progress</button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import BaseProgress from '~/components/core/Progress.vue';
  export default defineComponent({
    name: 'Mint',
    components: {
      BaseProgress,
    },
    setup() {
      onMounted(() => {
        // connectWith(connectors[0]);
      });
      const progress = ref(50);
      const increaseProgress = () => {
        if (progress.value < 100) {
          progress.value += 10;
        }
      };

      return {
        progress,
        increaseProgress,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped></style>
