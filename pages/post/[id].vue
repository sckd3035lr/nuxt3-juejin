<template>
  <div class="index">
    <!--左侧操作按钮-->
    <!--      <PostAction @refreshCommentCount="refreshCommentCount" ref="postActionRef"/>-->
    <a-row :gutter="[16, 16]" justify="center">
      <!-- 文章 -->
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16">
        <div class="main-container">
          <div class="title">{{ data.title }}</div>
          <div class="user-info" v-if="data.user">
            <div class="user-info-box">
              <a class="username" :href="`/user/${data.user.id}`" target="_blank">
                {{ data.user.nickname }}
              </a>
              <div class="post-info">
                <a-space size="middle">
                  <span>上次更新时间</span>
                  <span>{{ data.createTime }}</span>
                  <span>阅读 {{ data.viewCount }}</span>
                  <a-tag v-if="data.auditState === 1" :bordered="false" color="warning">
                    <template #icon>
                      <ClockCircleOutlined/>
                    </template>
                    审核中
                  </a-tag>
                </a-space>
              </div>
              <!--                <a class="edit-action" target="_blank" v-if="loginUser && data.user.id === loginUser.id"-->
              <!--                   :href="`/editor/${postId}`">-->
              <!--                  编辑-->
              <!--                </a>-->
            </div>
          </div>
          <!--正文-->
          <ByteMD class="post-markdown-content" mode="view" :value="data.content"/>
        </div>
        <!--文章评论-->
        <!--          <PostComment-->
        <!--              v-if="data.user"-->
        <!--              ref="commentRef"-->
        <!--              :topicId="postId"-->
        <!--              :createBy="data.user.id"-->
        <!--              :commentCount="commentCount"-->
        <!--              @refresh="refreshPostCount"-->
        <!--          />-->
      </a-col>
      <!--侧边栏-->
      <a-col :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
        <!--          <PostRecommend/>-->
        <!--          <div class="post-right-sticky" :class="{'normal': isIndexNavBlock}">-->
        <div class="post-right-sticky">
          <!--目录-->
          <PostToc v-if="contentHtml" :contentHtml="contentHtml"/>
          <MyCard style="margin-bottom: 20px">
            <template #title>下一篇</template>
            <template #body>
              <nuxt-link :href="'/post/' + data.id" target="_blank" class="entry-item">
                <div class="entry-item-text entry-item-text-post">
                  <a class="title-post">{{ data.title }}</a>
                </div>
              </nuxt-link>
            </template>
          </MyCard>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getById } from "~/api/postApi";
import { defineAppConfig } from "#app";
import { loadTheme } from "~/utils/bytemd/theme";
import { loadCodeStyle } from "~/utils/bytemd/codeStyle";
import MarkdownIt from 'markdown-it';
import MyCard from "~/components/custom/MyCard.vue";
import ByteMD from "~/components/custom/ByteMD.vue";

defineAppConfig({
  head: 'GlobalHeader'
});
const route = useRoute()
const postId = ref(Number(route.params.id));
const data = ref<any>(null)
const contentHtml = ref('')

const {data: postDetail} = await useAsyncData("index_GetPostDetail", () => getById(postId.value));
if (postDetail.value) {
  data.value = postDetail.value.data;

  const md = new MarkdownIt()
  contentHtml.value = md.render(data.value.content)
}

onMounted(() => {
  if (postDetail.value) {
    useHead({
      title: data.value.title,
    });
    loadTheme(data.value.theme);
    loadCodeStyle(data.value.codeStyle);
  }
});
</script>

<style lang="less" scoped>
.index {
  max-width: 1240px;
  margin: 15px auto;

  .main-container {
    padding: 30px;
    background-color: var(--jj-background-1);
    border-radius: var(--jj-border-radius);
    margin-bottom: 15px;
  }

  .user-info {
    display: flex;
    align-items: center;
    margin: 15px 0;
  }

  .user-info-box {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .username {
    color: var(--jj-font-color-2);
    cursor: pointer;
  }

  .post-info {
    color: var(--jj-font-color-3);
    margin-left: 15px;
    font-size: 15px;
  }

  .edit-action {
    margin-left: auto;
  }

  .post-content {
    margin-top: 20px;
  }

  .post-img {
    width: 100%;
    height: 400px;
    margin-bottom: 15px;
  }

  .title {
    font-size: 30px;
    font-weight: 600;
    line-height: 1.31;
    color: var(--jj-font-color-1);
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
  }

  /* 移动设备样式 */
  @media (max-width: 768px) {
    .post-img {
      width: 100%;
      height: 240px;
    }
  }
}

.post-right-sticky {
  transition: top .2s;
  position: sticky;
  top: 15px;
  text-align: left;
  border-radius: 6px;
}

.normal {
  top: 70px
}

img {
  /*cursor: zoom-in;*/
  cursor: pointer;
  transition: transform 300ms cubic-bezier(0.2, 0, 0.2, 1) !important;
}
</style>