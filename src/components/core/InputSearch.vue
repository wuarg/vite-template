<template>
  <a-input-search v-bind="$attrs" v-model="innerValue" @search="handleSearch">
    <!-- <template #enterButton>
      <img src="/src/assets/img/search.png" alt="search"  class="w-4 h-4"/>
    </template> -->
  </a-input-search>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'MyInputSearch',
    props: {
      defaultSearchValue: {
        type: String,
        default: '',
      },
    },
    emits: ['search'],
    setup(props, { emit, attrs }) {
      const innerValue = ref(props.defaultSearchValue);

      const handleSearch = (value: string) => {
        console.log('handleSearch---', value);
        innerValue.value = value;
        emit('search', value);
      };

      return {
        innerValue,
        handleSearch,
      };
    },
  });
</script>
<style lang="less" scoped>
  /deep/ .ant-input {
    background: transparent !important;
  }
  /deep/ .ant-btn,
  /deep/ .ant-input-group-addon {
    background: transparent !important;
    color: #fff !important;
  }
</style>
