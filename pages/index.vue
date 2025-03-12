<template>
  <a-button @click="handleClick">
    button
  </a-button>
  <a-button @click="login">
    login
  </a-button>
  <a-button @click="logout">
    logout
  </a-button>
  <div v-if="loginUser">{{ loginUser.name }}</div>
  <div v-if="loading">Loading...</div>
  <p v-else v-for="item in list" :key="item.id">{{ item.title }}</p>
</template>

<script lang="ts" setup>
import { defineAppConfig } from '#app';
import { computed, ref } from "vue";
import { postApi } from "~/utils/request";
import { useUserStore } from '~/stores/user'; // 确保正确导入 useUserStore

const config = useRuntimeConfig()

console.log(config);

const userStore = useUserStore();
const loginUser = computed(() => userStore.userinfo);

defineAppConfig({
  layout: 'GlobalHeader'
});

const login = () => {
  const u = {
    id: 1,
    name: 'sckd'
  }
  userStore.setUserInfo(u)
}

const logout = () => {
  userStore.logout()
}

const list = ref<Info[]>([]); // 初始化 list 变量
const loading = ref(false); // 加载状态

interface Info {
  id: number;
  title: string
}

interface List {
  records: Info[],
}

const handleClick = async () => {
  loading.value = true;
  try {
    const {data} = await postApi<List>('/post/page', {
      pageNo: 1,
      pageSize: 20,
      sortRule: 'newest',
    });
    list.value = data.records;
  } catch (err) {
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* 样式部分可根据需求添加 */
</style>