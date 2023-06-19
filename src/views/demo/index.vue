<template>
  <div>
    <input v-model="name" placeholder="Name" />
    <input v-model.number="age" placeholder="Age" />
    <button @click="saveUser">Save</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useUserStore } from '~/stores/modules/user';

  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const name = ref('');
      const age = ref(0);
      const saveUser = () => {
        userStore.setName(name.value);
        userStore.setAge(age.value);
      };

      return {
        name,
        age,
        saveUser,
      };
    },
  });
</script>
