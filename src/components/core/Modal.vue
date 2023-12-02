<template>
  <transition name="fade">
    <div v-if="isVisible" class="app-modal" @click.self="hide">
      <section class="app-modal-content">
        <header class="app-modal-header">
          <slot v-if="$slots.headerTitle" name="headerTitle" />

          <h3 v-else class="header-title">
            {{ title }}
          </h3>
          <BaseButton class="close-modal-button" variant="text" @click="hide">
            <img
              class="svg-image-to-white"
              src="../../assets/img/close.png"
              alt="close modal icon"
            />
          </BaseButton>
        </header>

        <article
          :class="[
            'app-modal-body',
            { 'no-body-padding': noBodyPadding, 'no-footer': !$slots.footer },
          ]"
        >
          <slot />
        </article>

        <footer v-if="$slots.footer" class="app-modal-footer">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BaseButton from '~/components/core/Button.vue';

  export default defineComponent({
    name: 'Modal',
    components: {
      BaseButton,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      noBodyPadding: {
        type: Boolean,
      },
    },
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      show() {
        this.isVisible = true;
        this.$emit('onShow');
      },
      hide() {
        this.isVisible = false;
        this.$emit('onHide');
      },
    },
  });
</script>

<style lang="less" scoped>
  @import '~/style/variables.less';
  .app-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
  }
  .app-modal-content {
    width: 100%;
    max-width: 600px;
    // border: 1px solid @lightSecondaryBackground;
    border-radius: 20px;
    // background-color: @lightBackground;
    overflow: hidden;
    background: url('../../assets/img/mint-modal.png') no-repeat;
    background-size: 100% 100%;
    // background-attachment: fixed;
  }
  .app-modal-header {
    padding: 30px 30px 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @lightBorderColor;
    .header-title {
      margin: 0;
    }
    .close-modal-button {
      width: 20px;
      padding: 0;
    }
  }
  .app-modal-body {
    &:not(.no-body-padding) {
      padding: 20px 30px;
      &.no-footer {
        padding-bottom: 16px;
      }
    }
  }
  .app-modal-footer {
    padding: 16px;
    // background-color: @lightSecondaryBackground;
    // border-top: 1px solid @lightBorderColor;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
