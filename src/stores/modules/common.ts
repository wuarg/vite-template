// src/store/modules/user.ts

import { defineStore } from 'pinia';

export const commonStore = defineStore('common', {
  state() {
    return {
      walletReady: false,
      account: '',
      iostPrice: 0,
      xusdPrice: 0,
      myIOST: {},
      profile: {},
      myObject: {} as Record<string, any>,
      allPairs: [],
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
      return state.iostPrice;
    },
    getXusdPrice(state) {
      return state.xusdPrice;
    },
    getAllPairs(state) {
      return state.allPairs;
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
    setIostPrice(iostPrice: number) {
      this.iostPrice = iostPrice;
    },
    setXusdPrice(xusdPrice: number) {
      this.xusdPrice = xusdPrice;
    },
    setAllPairs(allPairs: Array) {
      this.allPairs = allPairs;
    },
    setObjectProperty(key: string, value: any) {
      this.myObject[key] = value;
    },
  },
});
