<template>
  <div class="details">
    <Editor
        v-if="mode === 'edit'"
        class="editor"
        :value="value"
        placeholder="开始进行创作吧~"
        :plugins="plugins"
        @change="handleChange"
        :uploadImages="uploadImage"
    />
    <Viewer
        v-if="mode === 'view'"
        :tabindex="2"
        :value="value"
        :sanitize="23"
        :plugins="plugins"
    />
  </div>
</template>

<script setup lang="ts">
import { Editor, Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import highlight from '@bytemd/plugin-highlight';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
// import zhHans from '~/utils/bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.css';
import themePlugin from "~/utils/bytemd/theme/index.ts";
import codeStylePlugin from "~/utils/bytemd/codeStyle/index.ts";
// import {uploadApi} from "@/api/ossService";
import { message } from 'ant-design-vue';

// 定义 props
defineProps({
  value: {type: String, default: ''},
  mode: {type: String, default: 'edit'},
});

// 定义 emits
const emits = defineEmits(['input', 'themeChange', 'codeStyleChange']);

// 方法定义
const handleChange = (v) => {
  emits('input', v);
};

const uploadImage = async (files) => {
  const res = await uploadImageServer(files[0]);
  return [
    {
      title: files.map((i) => i.name),
      url: res.data
    }
  ];
};

const uploadImageServer = async (file) => {
  // try {
  //   const data = new FormData();
  //   data.append('file', file);
  //   return await uploadApi(data);
  // } catch (error) {
  //   message.error('上传图片失败，请重新上传');
  // }
};

const handleThemeChange = (newTheme) => {
  emits('themeChange', newTheme);
};

const handleCodeStyleChange = (style) => {
  emits('codeStyleChange', style);
};

const plugins = [
  gfm({
    locale: gfmLocale
  }),
  highlight(),
  mermaid({
    locale: mermaidLocale
  }),
  mediumZoom(),
  themePlugin({
    onThemeChange: handleThemeChange
  }),
  codeStylePlugin({
    onCodeStyleChange: handleCodeStyleChange
  })
];

const handlePicSizeChange = (size) => {
  message.success(size);
  const imgs = document.querySelectorAll('.markdown-body img');
  imgs.forEach((img) => {
    img.style.width = size;
  });
};
</script>

<style lang="less">
.details {
  height: 100% !important;

  .editor {
    height: 100% !important;

    .bytemd {
      height: 100%;
      border: none;
      font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial !important;

      .bytemd-toolbar {
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }

      .bytemd-editor .CodeMirror {
        height: 100%;
        font-size: 14px;
        line-height: 1.5;
        z-index: 0;
        //background: #f8f9fa;
      }
    }
  }

  pre {
    position: relative;
    border-radius: var(--jj-border-radius);
    overflow: hidden;

    .code-block-extension-header {
      height: 32px;
      position: relative;
      background-color: var(--jj-background-3);
      overflow: hidden;

      .expand-icon {
        position: absolute;
        left: 8px;
        top: 6px;
        height: 32px;
        font-size: 12px;
        cursor: pointer;
        color: #777;
        font-style: normal;

        &.ri-arrow-right-s-fill + span + div {
          background: transparent;
        }

        &:hover {
          color: rgba(161, 161, 161, 0.8);
        }
      }

      .copy-code-btn {
        position: absolute;
        top: 10px;
        right: 12px;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        color: hsla(0, 0%, 54.9%, 0.8);
        transition: color 0.1s;
      }

      & > div {
        position: absolute;
        bottom: 0;
        left: 8px;
        right: 8px;
        height: 1px;
        background: hsla(0, 31%, 63%, 0.05);
      }
    }

    code {
      border-radius: 0;
    }
  }

  .markdown-body pre > code.hljs {
    padding: 10px;
  }
}
</style>