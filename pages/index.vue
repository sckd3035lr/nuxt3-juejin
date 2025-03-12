<template>
  <a-button @click="login">
    login
  </a-button>
  <a-button @click="logout">
    logout
  </a-button>
  <client-only>
    <div v-if="loginUser">{{ loginUser.name }}</div>
  </client-only>
  <p v-for="item in list" :key="item.id">
    <nuxt-link :href="`/post/${item.id}`" target="_blank">
      {{ item.title }}
    </nuxt-link>
  </p>
</template>

<script lang="ts" setup>
import { defineAppConfig } from '#app';
import { computed, ref } from "vue";
import { useUserStore } from '~/stores/user';
import { getList } from "~/api/postApi";

const userStore = useUserStore();
const loginUser = computed(() => userStore.userinfo);

defineAppConfig({
  layout: 'GlobalHeader'
});

const login = () => {
  const u = {id: 1, name: 'sckd'}
  userStore.setUserInfo(u)
}

const logout = () => {
  userStore.logout()
}

const list = ref<any[]>([])

const {data: postList} = await useAsyncData("index_GetPostList", () => getList({
  pageNo: 1,
  pageSize: 20,
  sortRule: 'newest',
}));
if (postList.value) {
  list.value = postList.value.data.records;
}

</script>

<style scoped>
</style>