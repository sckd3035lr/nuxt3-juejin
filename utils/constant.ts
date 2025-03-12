/**
 * 编辑器代码主题
 * @type {string[]}
 */
export const codeStyleList = [
  "agate",
  "arta",
  "ascetic",
  "atom-one-dark",
  "atom-one-light",
  "darcula",
  "dark",
  "darkula",
  "default",
  "github-gist",
  "github",
  "googlecode",
  "grayscale",
  "idea",
  "ocean",
  "vs",
  "vs2015",
  "xcode",
  "xt256"
]

/**
 * 编辑器主题
 * @type {string[]}
 */
export const themeList = [
  'juejin',
  'github',
  'smart-blue',
  'devui-blue',
  'channing-cyan',
  'healer-readable',
  'qklhk-chocolate',
  'csdn',
  'tencent',
  'awesome-green',
  'cyanosis',
  'v-green',
  'condensed-night-purple',
  'mk-cute',
  'scrolls',
  'nico',
  'vuepress',
  'chinese-red',
  'fancy',
  'greenwillow',
  'z-blue',
  'minimalism'
]

/**
 * 编辑器工具栏配置
 * @type {*[]}
 */
export const mavonEditorToolbars = {
  header: true, // 标题
  bold: true, // 粗体
  italic: true, // 斜体
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  task: true,
  function: true,
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  save: false, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  /* 2.2.1 */
  subfield: true, // 单双栏模式
  preview: true // 预览
}

/**
 * 导出类型
 * @type {({img, name: string, suffixName: string, suffix: string}|{img, name: string, suffixName: string, suffix: string}|{img, name: string, suffixName: string, suffix: string}|{img, name: string, suffixName: string, suffix: string})[]}
 */
// export const exportArticleType = [
//   {
//     img: require('../assets/img/markdown.svg'),
//     name: 'Markdown',
//     suffix: '.md',
//     suffixName: '.md'
//   },
//   {
//     img: require('../assets/img/pdf.svg'),
//     name: 'PDF',
//     suffix: '.pdf',
//     suffixName: '.pdf'
//   },
//   {
//     img: require('../assets/img/word.svg'),
//     name: 'Word',
//     suffix: '.doc',
//     suffixName: '.docx .doc'
//   },
//   {
//     img: require('../assets/img/jpg.svg'),
//     name: 'JPG',
//     suffix: '.jpg',
//     suffixName: '.jpg'
//   }
// ]