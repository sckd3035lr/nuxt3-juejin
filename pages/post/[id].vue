<template>
  <div>
    <h2>{{ data.title }}</h2>
    <div>{{ data.content }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from 'nuxt/app';
import { getById } from "~/api/postApi";
import { defineAppConfig } from "#app";

defineAppConfig({
  head: 'GlobalHeader'
});
const route = useRoute();
const postId = ref(Number(route.params.postId));
const data = ref<any>(null)

const {data: postDetail} = await useAsyncData("index_GetPostDetail", () => getById(postId.value));
if (postDetail.value) {
  data.value = postDetail.value.data;
}

onMounted(() => {
  if (postDetail.value) {
    useHead({
      title: data.value.title,
      meta: [
        {
          name: 'description',
          content: data.value.content?.substring(0, 150) + '...' // 截取部分内容作为描述，可按需调整
        }
      ]
    });
  }
});
</script>

<style scoped>

</style>