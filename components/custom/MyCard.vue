<template>
  <div class="my-card">
    <div class="my-card-header">
      <h3 class="my-card-header-title">
        <slot name="title"></slot>
      </h3>
    </div>
    <div class="my-card-body block-list">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script setup>

</script>
<style scoped lang="less">
// 全局卡片公共样式
.my-card {
  background: var(--jj-background-1);
  border-radius: var(--jj-border-radius);

  &-header {
    padding: 16px 0;
    margin: 0 20px;
    font-size: 16px;
    color: var(--jj-font-color-1);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e4e6eb;

    h3 {
      margin-bottom: 0;
    }

    &-title {
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
      color: #1d2129;
    }

    &-extra {
      font-size: 14px;
    }
  }

  &-body {
    position: relative;
  }
}
</style>