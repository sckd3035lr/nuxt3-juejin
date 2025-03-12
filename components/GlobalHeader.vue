<template>
  <header class="header-wrapper">
    <!--    <div id="header" :class="{ hidden: !isIndexNavBlock }" class="header">-->
    <div id="header" class="header">
      <div class="header-container">
        <div class="header-content">
          <div class="header-left">
            <a class="header-logo" href="/public" target="_self">
              <img class="header-logo-pc" src="../assets/svg/juejin-old.svg" alt="">
            </a>
            <nav class="header-nav">
              <div class="header-nav-mobile-menu-wrap">
                <div
                    class="header-nav-mobile-menu"
                    :class="{ active: isMobileMenuActive }"
                    @click="toggleMobileMenu"
                >
                  首页
                  <i class="jj-icon jj-icon-down header-nav-mobile-menu-icon"></i>
                </div>
              </div>
              <ul class="header-nav-list" :class="{ visible: isMobileMenuActive }">
                <li>
                  <a
                      class="header-nav-list-item"
                      :class="{ active: isIndexPage }"
                      target="_self"
                      href="/public"
                      title="首页"
                  >
                    首页
                  </a>
                </li>
                <li v-for="page in pages" :key="page.slug">
                  <a
                      class="header-nav-list-item"
                      :class="{ active: isPageActive(page.slug) }"
                      target="_self"
                      :href="page.permalink"
                      :title="page.title"
                  >
                    {{ page.title }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="header-right">
            <div class="header-search-wrap" :class="{ 'open-search': isSearchOpen }" ref="searchRef">
              <form class="header-search-form" method="post" role="search">
                <input
                    id="header-search-input"
                    class="header-search-input"
                    type="text"
                    maxlength="40"
                    placeholder="输入关键字搜索"
                    autocomplete="off"
                    @focus="toggleSearch(true)"
                >
                <label for="header-search-input" class="header-search-btn" tabindex="0">
                  <SearchOutlined/>
                </label>
                <div class="search-history" :class="{ visible: isSearchHistoryVisible }">
                  <div class="search-history-head">
                    <span class="search-history-head-title">搜索历史</span>
                    <span class="search-history-clear-btn" @click="clearSearchHistory">清空</span>
                  </div>
                  <div class="search-history-list"></div>
                </div>
              </form>
              <a-dropdown
                  placement="bottomRight"
                  style="margin-top: 10px"
                  :transitionName="''"
                  :trigger="['hover']"
                  :overlayStyle="{zIndex: '888'}"
              >
                <div class="header-post-wrapper">
                  <!--                  <a class="header-post-btn" :class="{ login: !isLogin }">发布</a>-->
                  <a class="header-post-btn">发布</a>
                </div>
                <template #overlay>
<!--                  <a-menu :items="postItems" v-login="doMenuClick"/>-->
                  <a-menu :items="postItems" @click="doMenuClick"/>
                </template>
              </a-dropdown>
            </div>
            <!--            <a-dropdown-->
            <!--                v-if="isLogin"-->
            <!--                placement="bottomRight"-->
            <!--                :transitionName="''"-->
            <!--                :trigger="['hover']"-->
            <!--                :overlayStyle="{zIndex: '888'}"-->
            <!--            >-->
            <!--            <span class="section">-->
            <!--              &lt;!&ndash;                  <a-badge :count="unread['total'] ? unread['total'] : 0">&ndash;&gt;-->
            <!--              <svg-icon name="notice"/>-->
            <!--              &lt;!&ndash;                  </a-badge>&ndash;&gt;-->
            <!--            </span>-->
            <!--              <template #overlay>-->
            <!--                <a-menu>-->
            <!--                  <a-menu-item>-->
            <!--                    &lt;!&ndash;                    <a-badge v-if="unread[item.id]" :count="unread[item.id]"/>&ndash;&gt;-->
            <!--                    点赞消息-->
            <!--                  </a-menu-item>-->
            <!--                  <a-menu-item>评论消息</a-menu-item>-->
            <!--                  <a-menu-item>新增粉丝</a-menu-item>-->
            <!--                  <a-menu-item>私信</a-menu-item>-->
            <!--                </a-menu>-->
            <!--              </template>-->
            <!--            </a-dropdown>-->
            <!--            <button v-if="!isLogin" class="header-login-btn" @click="openLoginModal">登录</button>-->
            <button class="header-login-btn" @click="openLoginModal">登录</button>
            <!--            <a-dropdown-->
            <!--                v-else-->
            <!--                :transitionName="''"-->
            <!--                placement="bottomRight"-->
            <!--                :trigger="['click']"-->
            <!--                :overlayStyle="{zIndex: '999'}"-->
            <!--                v-model:open="visible"-->
            <!--                @openChange="onVisibleChange"-->
            <!--            >-->
            <!--            <span class="avatar-wrapper">-->
            <!--              <a-avatar :src="loginUser.avatar" :size="40"/>-->
            <!--            </span>-->
            <!--              <template #overlay>-->
            <!--                &lt;!&ndash;                <HeaderUserInfo @cancel="visible = false"/>&ndash;&gt;-->
            <!--              </template>-->
            <!--            </a-dropdown>-->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue';
// import { useSystemStore } from "~/stores/systemStore.js";
// import { useUserStore } from "~/stores/userStore.js";
// import { throttle } from "~/utils/common.js";
import { SearchOutlined } from "@ant-design/icons-vue/lib/icons";
import { useRouter, type Router } from "vue-router";

type PageItem = {
  slug: string;
  title: string;
  permalink: string;
};

type MenuItem = {
  key: string;
  label: string;
  title: string;
};

const router: Router = useRouter();

const pages: Ref<PageItem[]> = ref([
  {slug: 'qa', title: '问答', permalink: '/post/1'},
]);

const postItems: MenuItem[] = [
  {key: '/editor', label: '写文章', title: '写文章'},
];

// 响应式状态
const isMobileMenuActive: Ref<boolean> = ref(false);
const isSearchOpen: Ref<boolean> = ref(false);
const isSearchHistoryVisible: Ref<boolean> = ref(false);
const isUserMenuVisible: Ref<boolean> = ref(false);
const isIndexPage: Ref<boolean> = ref(true);
const searchRef: Ref<HTMLElement | null> = ref(null);
const visible: Ref<boolean> = ref(false);

// const systemStore = useSystemStore();
// const userStore = useUserStore();

// const isIndexNavBlock = computed(() => systemStore.isIndexNavBlock);
// const isLogin = computed(() => userStore.isLogin());
// const loginUser = computed(() => userStore.getUserInfo());

onMounted(() => {
  // scrollingElement = document.scrollingElement as HTMLElement;
  // // 监听滚动事件
  // window.addEventListener('scroll', handleScroll);
  window.addEventListener('click', handleSearchClose);
});

onUnmounted(() => {
  // window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('click', handleSearchClose);
});

const doMenuClick = (e: MenuItem) => {
  const resolved = router.resolve({
    path: e.key
  });
  window.open(resolved.href, '_blank');
};

const toggleMobileMenu = () => {
  isMobileMenuActive.value = !isMobileMenuActive.value;
};

// let scrollingElement: HTMLElement | null = null;
// let scrollTop: number = 0;
//
// const handleScroll = throttle(() => {
//   if (scrollingElement) {
//     if (Math.abs(scrollingElement.scrollTop - scrollTop) < 100) {
//       return;
//     }
//     if (scrollingElement.scrollTop < 300) {
//       if (!isIndexNavBlock.value) {
//         systemStore.updateIndexNavBlock(true);
//       }
//       return;
//     }
//     if (scrollingElement.scrollTop > scrollTop) {
//       systemStore.updateIndexNavBlock(false);
//     } else if (scrollingElement.scrollTop < scrollTop) {
//       systemStore.updateIndexNavBlock(true);
//     }
//     scrollTop = scrollingElement.scrollTop;
//   }
// }, 100);

const handleSearchClose = (e: MouseEvent) => {
  if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
    toggleSearch(false);
  }
};

const toggleSearch = (open: boolean) => {
  isSearchOpen.value = open;
  isSearchHistoryVisible.value = open;
};

const clearSearchHistory = () => {
  // 清空搜索历史逻辑
  isSearchHistoryVisible.value = false;
};

const toggleUserMenu = () => {
  isUserMenuVisible.value = !isUserMenuVisible.value;
};

const openLoginModal = () => {
  // systemStore.openLoginModal();
};

const onVisibleChange = (val: boolean) => {
  visible.value = val;
};

const isPageActive = (slug: string): boolean => {
  // 判断当前页面是否为指定页面
  return false;
};
</script>


<style lang="less" scoped>
.header-wrapper {
  z-index: 999;
  position: relative;
  height: 55px;
}

.shadow {
  box-shadow: 0 2px 8px #f2f3f5
}

#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: var(--jj-header-bg-color);
  transition: transform 0.2s;
  padding-left: calc(100vw - 100%);

  &.hidden {
    transform: translate3D(0, -100%, 0);
  }
}

.header-container {
  max-width: 1440px;
  margin: 0 auto;
}

.header-content {
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.header-right {
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.header-logo {
  height: 55px;
  display: flex;
  margin-right: 20px;
  align-items: center;
}

.header-logo-pc {
  width: 100px !important;
  height: 22px !important;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -2px;
}

.header-logo-mobile {
  display: none;
  height: 100%;
  pointer-events: none;
}

.header-nav {
  height: 100%;
  position: relative;
}

.header-nav-mobile-menu-wrap {
  display: none;
  height: 100%;
}

.header-nav-mobile-menu {
  height: 100%;
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--jj-header-text-active);
  white-space: nowrap;
  cursor: pointer;

  &.active {
    .header-nav-mobile-menu-icon {
      color: var(--jj-header-text-active);
      transform: rotate(180deg);
    }
  }

  &:active {
    opacity: 0.7;
  }
}

.header-nav-mobile-menu-icon {
  margin-left: 4px;
  color: var(--jj-header-text-color);
  transition: transform 0.2s ease-in-out;
}

.header-nav-list {
  display: flex;
  align-items: center;
  white-space: nowrap;

  &.visible {
    display: flex;
  }
}

.header-nav-list-item {
  position: relative;
  display: block;
  height: 55px;
  line-height: 55px;
  padding: 0 10px;
  font-size: 14px;
  color: var(--jj-header-text-color);
  text-decoration: none;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 10px;
    bottom: 0;
    right: 10px;
    background-color: var(--jj-header-text-active);
  }

  &:hover {
    color: var(--jj-header-text-hover);

    &::after {
      height: 2px;
    }
  }

  &.active {
    color: var(--jj-header-text-active);
  }
}

.header-search-wrap {
  width: 370px;
  height: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;

  &.open-search {
    .header-post-wrapper {
      margin-left: 0;
      width: 0;
      overflow: hidden;
    }
  }
}

.header-search-form {
  flex-grow: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  height: 34px;
  position: relative;
}

.header-search-input {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid var(--jj-header-search-input-border);
  border-radius: 3px;
  outline: none;
  //padding: 5px 53px 5px 10px;
  padding: 0 53px 0 10px;
  font-size: 13px;
  color: var(--jj-header-search-input-color);
  transition: width 0.2s;

  &::placeholder {
    color: var(--jj-header-search-placeholder-color);
  }

  &:hover {
    border: 1px solid var(--jj-font-color-3);
  }

  &:focus {
    border-color: var(--jj-header-search-input-border-active);

    + .header-search-btn {
      color: var(--jj-header-search-btn-color-active);
      background-color: var(--jj-header-search-btn-bg-active);
    }
  }
}

.header-search-btn {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 40px;
  height: 28px;
  font-size: 18px;
  color: var(--jj-header-search-btn-color);
  background-color: var(--jj-header-search-btn-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
}

.header-post-wrapper {
  white-space: nowrap;
  margin-left: 20px;
  width: 70px;
  height: 55px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: margin 0.2s, width 0.2s, background-color 0.1s linear;
}

.header-post-btn {
  flex-shrink: 0;
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  background-color: var(--jj-header-post-btn-bg);
  color: var(--jj-header-post-btn-color);
  border-radius: 4px;

  &:hover {
    background-color: var(--jj-header-post-btn-bg-hover);
  }

  &:active {
    opacity: 0.7;
  }
}

.search-history {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  margin-top: 1px;
  background-color: var(--jj-header-bg-color);
  border: 1px solid var(--jj-header-nav-border-color);
  border-radius: 4px;
  box-shadow: 0 8px 24px var(--jj-header-nav-box-shadow);
  overflow: hidden;

  &.visible {
    display: block;
  }
}

.search-history-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 2;
  color: var(--jj-search-history-title-color);
  border-bottom: 1px solid var(--jj-header-nav-border-color);
}

.search-history-clear-btn {
  color: var(--jj-search-history-clear-color);
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
}

.search-history-list {
  font-size: 12px;
  line-height: 2;
  color: var(--jj-search-history-text-color);
  cursor: pointer;
}

.search-history-list-item {
  padding: 6px 12px;
  white-space: nowrap;

  &:hover,
  &:active {
    background-color: var(--jj-search-history-item-bg);
  }
}

.section {
  margin-left: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .svg-icon {
    width: 22px !important;
    height: 22px !important;
    vertical-align: -5px !important;
    color: #c2c8d1 !important;
    cursor: pointer;

    &:hover {
      color: #c2c8d1;
    }
  }
}

.header-login-btn {
  margin-left: 20px;
  height: 34px;
  padding: 4px 16px;
  background-color: var(--jj-header-login-btn-bg);
  border: 1px solid var(--jj-header-login-btn-border);
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  color: var(--jj-header-login-btn-color);
  cursor: pointer;
  transition: background-color 0.1s linear;

  &:hover {
    background-color: var(--jj-header-login-btn-bg-hover);
  }

  &:active {
    opacity: 0.7;
  }
}

.avatar-wrapper {
  color: #86909c;
  font-size: 15px;
  margin-left: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

// 移动端搜索
.mobile-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: none;
  overflow: hidden;

  &.visible {
    .mobile-search-mask {
      opacity: 1;
    }

    .mobile-search-content {
      transform: translate3D(0, 0, 0);
    }
  }
}

.mobile-search-mask {
  height: 100%;
  background-color: var(--jj-mobile-search-mask-bg);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.mobile-search-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-color: var(--jj-mobile-search-bg);
  transition: transform 0.15s ease-in-out;
  transform: translate3D(0, -100%, 0);
}

.mobile-search-close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
  color: var(--jj-header-search-btn-color);
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
}

.mobile-search-close-icon {
  font-size: inherit;
}

.mobile-search-body {
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

@media screen and (max-width: 1190px) {
  .header-nav-mobile-menu-wrap {
    display: block;
  }

  .header-nav-list {
    position: absolute;
    top: 80%;
    left: 0;
    margin-left: -30px;
    width: 140px;
    padding: 8px;
    display: none;
    flex-direction: column;
    background-color: var(--jj-header-bg-color);
    border: 1px solid var(--jj-header-nav-border-color);
    border-radius: 4px;
    box-shadow: 0 8px 24px var(--jj-header-nav-box-shadow);
  }

  .header-nav-list-item {
    height: 48px;
    line-height: 48px;
  }
}
</style>