<template>
  <div class="token-container p-10">
    <h3 class="title text-4xl">查看地址的代币余额</h3>
    <div class="search-box input-with-background-image m-auto my-10 flex w-1/2 justify-between">
      <BaseInput
        v-model="searchToken"
        size="large"
        placeholder="Search name or paste address"
        class="w-3/4"
      />
      <img src="/src/assets/img/dis.png" class="mr-15 w-5" />
    </div>
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
      const searchToken = ref('');
      return {
        searchToken,
      };
    },
    computed: {},
  });
</script>
<style lang="less" scoped>
  .title {
    font-family: REEJI-TaikoMagicGB-Flash, REEJI-TaikoMagicGB-Flash;
    font-weight: bold;
  }
  .input-with-background-image {
    /* Set the background image URL */
    background: url('../../assets/img/input.png') no-repeat;
    /* Set background size to cover the input */
    background-size: 100% 100%;
    /* Set the input height and width */
    /* Add padding to make room for text inside the input */
    // height: 80px;
    /* Set border and border-radius for styling */
    /* Set color for text inside the input */
    color: #333;
    /* Remove default input styles */
    outline: none;
  }
  .input-with-background-image::placeholder {
    /* Set color for the placeholder text */
    color: #999;
  }
</style>
