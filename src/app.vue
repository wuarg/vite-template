<template>
  <router-view></router-view>
</template>
<script lang="ts">
  import { commonStore } from '~/stores/modules/common';
  import { defineComponent, ref, onMounted } from 'vue';
  import { ContractService } from '~/utils/contractServe';
  import { environment } from '~/utils/iostConfig';

  export default defineComponent({
    name: '',
    setup() {
      const appStore = commonStore();
      const waiting = ref(false);
      const iostPrice = ref(0);
      const xusdPrice = ref(0);
      const allPairs = ref([]);
      const profile = ref<Record<string, any>>({});
      console.log('ContractService---', ContractService);
      onMounted(() => {
        // connectWith(connectors[0]);
        load();
      });
      const load = async () => {
        waiting.value = true;

        const walletReady = await ContractService.init();
        const account = ContractService.getUserAddress();
        const myIOST = ContractService.getIOST();
        console.log('walletReady---', walletReady);
        console.log('account---', account);
        console.log('myIOST---', myIOST);
        appStore.setWalletReady(walletReady);
        appStore.setAccounte(account);
        appStore.setMyIOST(myIOST);

        if (walletReady && account) {
          profile.value.account = ContractService.getUserAddress();
          profile.value.walletReady = true;
        } else {
          profile.value.account = '';
          profile.value.walletReady = false;
        }
        waiting.value = false;
      };
      appStore.setProfile(profile.value);
      return {};
    },
    computed: {},
  });
</script>
<style lang="less">
  body {
    // @apply transition-colors;
  }
  #app {
    // "Slackey","Karla"
    // font-family: sans-serif;
    // font-family: 'Passion One', cursive;
    font-family: var(--font-family);
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
