<template>
  <a-select v-bind="$attrs" v-model="innerValue" @change="handleChange">
    <!-- 这里可以添加其他插槽或者修改内容 -->
    <slot></slot>
  </a-select>
</template>

<script lang="ts">
  import { defineComponent, ref, PropType, watch } from 'vue';
  import { SelectValue } from 'ant-design-vue/lib/select';

  export default defineComponent({
    name: 'MySelect',
    props: {
      defaultValue: {
        type: [String, Number, Array] as PropType<SelectValue>,
        default: undefined,
      },
      modelValue: {
        type: [String, Number, Array] as PropType<SelectValue>,
      },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, attrs }) {
      const innerValue = ref(props.modelValue ?? props.defaultValue);

      const handleChange = (value: SelectValue) => {
        innerValue.value = value;
        emit('update:modelValue', value);
        emit('change', value);
      };

      // 监听 defaultValue 的变化并更新 innerValue
      watch(
        () => props.defaultValue,
        (newValue) => {
          console.log('props.defaultValue--', props.defaultValue);
          console.log('newValue--', newValue);
          innerValue.value = props.modelValue ?? newValue;
        },
      );

      return {
        innerValue,
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  /deep/ .ant-select-selector {
    background: #707070 !important;
    border: none !important;
    color: #9ea0a5 !important;
  }
  /deep/ .ant-select-arrow {
    color: #9ea0a5 !important;
  }
</style>
