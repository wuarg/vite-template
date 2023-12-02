<!-- eslint-disable vue/no-duplicate-attributes -->
<template>
  <input
    type="text"
    :class="`app-input size-${size} app-input-${border} app-input-${background}`"
    v-bind="$attrs"
    :value="modelValue"
    @input="inputHandler"
  />
</template>

<script>
  export default {
    name: 'BaseInput',
    props: {
      modelValue: {
        type: String,
      },
      size: {
        type: String,
        default: 'medium',
        validator(value) {
          return ['medium', 'large'].includes(value);
        },
      },
      bg: {
        type: Boolean,
      },
      background: {
        type: String,
      },
      border: {
        type: String,
      },
    },
    methods: {
      inputHandler(e) {
        this.$emit('update:modelValue', e.target.value);
      },
    },
  };
</script>

<style lang="less" scoped>
  @import '~/style/variables.less';
  .app-input {
    // width: 100%;
    background: none;
    font-size: 16px;
    padding: 5px 12px;
    border-radius: 20px;
    // border: 1px solid @darkBorderSecondaryColor;
    // background-color: @darkSecondaryBackground;
    color: @darkSecondaryBackground;
    box-sizing: border-box;

    &.size-large {
      font-size: 18px;
      padding: 16px 50px;
    }
    &,
    &:focus {
      outline: none;
      // color: @darkSecondaryBackground;
    }
    &-border {
      border: 1px solid @darkBorderSecondaryColor;
      color: #fff;
    }
    &-background {
      background-color: @darkSecondaryBackground;
    }
  }
</style>
