// src/store/modules/user.ts

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state() {
    return {
      name: '',
      age: 0,
    };
  },
  actions: {
    setName(name: string) {
      this.name = name;
    },
    setAge(age: number) {
      this.age = age;
    },
  },
});
