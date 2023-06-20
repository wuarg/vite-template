// src/store/modules/user.ts

import { defineStore } from 'pinia';

export const commonStore = defineStore('common', {
  state() {
    return {
      walletReady: false,
      account: '',
      myIOST: {},
      profile: {},
      myObject: {} as Record<string, any>,
    };
  },
  getters: {
    getWalletReady(state) {
      return state.walletReady;
    },
    getAccount(state) {
      return state.account;
    },
    getMyIOST(state) {
      return state.myIOST;
    },
    getProfile(state): Record<string, any> {
      return state.profile;
    },
    getMyObject(state) {
      return state.myObject;
    },
    getIostPrice(state) {
      return state.profile.iostPrice;
    },
    getXusdPrice(state) {
      return state.profile.xusdPrice;
    },
  },
  actions: {
    setWalletReady(walletReady: boolean) {
      this.walletReady = walletReady;
    },
    setAccounte(account: string) {
      this.account = account;
    },
    setMyIOST(myIOST: object) {
      this.myIOST = myIOST;
    },
    setProfile(profile: any) {
      this.profile = profile;
    },
    setObjectProperty(key: string, value: any) {
      this.myObject[key] = value;
    },
  },
});
