<template>
  <MyCard v-show="!isTocEmpty" class="post-toc">
    <template #title>目录</template>
    <template #body>
      <!--目录树-->
      <div class="directory-tree toc-scroll-bar" v-html="treeTemplate"></div>
    </template>
  </MyCard>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { throttle } from "~/utils/common";
import MyCard from "~/components/custom/MyCard.vue";

// 定义 props 类型
const props = defineProps<{
  contentHtml: string | null;
}>();

// 定义目录项的类型
interface CatalogItem {
  text: string;
  depth: number;
  count: number;
  children?: CatalogItem[];
}

// 模拟全局变量
let catalog: CatalogItem[] = [];
let catalog_count = 0;
let isInitialHashHandled = false; // 处理hash标记

// 响应式数据
const treeTemplate = ref<string>('');
const activeItem = ref<HTMLElement | null>(null);
const titles = ref<HTMLElement[]>([]);
const clickTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const isTocEmpty = ref<boolean>(false);

onMounted(() => {
  // 处理文章内容，添加锚点
  const newContent = addAnchorPoint(props.contentHtml || '');
  // 生成目录树
  treeTemplate.value = getJJDirectoryTree();
  if (!treeTemplate.value) {
    return;
  }

  nextTick(() => {
    // 获取标题元素
    const listAList = Array.from(document.querySelectorAll('.directory-tree-list-item-link')) as HTMLAnchorElement[];
    titles.value = listAList.map((a) => {
      const id = a.getAttribute('href')?.replace('#', '');
      return document.getElementById(id) as HTMLElement;
    }).filter(Boolean);

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    // list点击事件
    const list = document.querySelector('.directory-tree-list') as HTMLElement;
    if (list) {
      list.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const isA = target instanceof HTMLAnchorElement;
        const isLink = target.classList.contains('directory-tree-list-item-link');
        if (isA || isLink) {
          const href = target.getAttribute('href');
          const id = href ? href.replace('#', '') : null;
          const a = document.querySelector(`.directory-tree-list-item-link[href="#${id}"]`) as HTMLAnchorElement;
          if (a) {
            setTimeout(() => {
              setParentItemActive(a);
              // 让高亮目录处于盒子中间
              const listWrap = document.querySelector('.directory-tree') as HTMLElement;
              if (listWrap) {
                const item = findParentElementByClass(a, 'directory-tree-list-item') as HTMLElement;
                const itemTop = item.offsetTop;
                const containerHeight = listWrap.clientHeight;
                const itemHeight = item.offsetHeight;
                const scrollToTop = itemTop - (containerHeight - itemHeight) / 2;
                listWrap.scrollTo({top: scrollToTop});
              }
            }, 200);
          }
        }
        if (clickTimer.value) {
          clearTimeout(clickTimer.value);
          clickTimer.value = null;
        }
        clickTimer.value = setTimeout(() => {
          clickTimer.value = null;
        }, 100);
      });
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 给文章内容标题添加锚点
const addAnchorPoint = (content: string): string => {
  catalog = [];
  catalog_count = 0;
  content = content.replace(/<h([1-6])(.*?)>(.*?)<\/h\1>/gi, (match, p1, p2, p3) => {
    catalog_count++;
    catalog.push({text: p3.trim().replace(/<[^>]+>/g, ''), depth: Number(p1), count: catalog_count});
    return `<h${p1}${p2} id="heading-${catalog_count}">${p3}</h${p1}>`;
  });
  return content;
};

// 获取目录树
const getJJDirectoryTree = (maxDirectory = 3): string => {
  return generateTreeTemplate([...catalog], maxDirectory);
};

// 删除目录树数组指定层级children
const removeChildren = (list: CatalogItem[], depth: number, currentDepth = 0): CatalogItem[] => {
  list.forEach((item) => {
    if (item.children && item.children.length > 0) {
      if (currentDepth < depth - 1) {
        item.children = removeChildren(item.children, depth, currentDepth + 1);
      } else {
        delete item.children;
      }
    }
  });
  return list;
};

// 生成目录树html
const generateTreeTemplate = (arr: CatalogItem[], depth: number, currentDepth = 1, isChildren = false): string => {
  if (arr.length <= 0) {
    isTocEmpty.value = true;
    return '';
  }
  if (currentDepth > depth) {
    return '';
  }
  let output = !isChildren ? '<ul class="directory-tree-list">' : '';
  arr.forEach((item) => {
    const itemDepth = item.depth - Math.min(...arr.map(i => i.depth)) + 1; // 计算当前项的实际深度
    output += `<li class="directory-tree-list-item depth-${itemDepth}"><a class="directory-tree-list-item-link" href="#heading-${item.count - 1}" title="${item.text}">${item.text}</a>`;
    output += '</li>';
  });
  output += !isChildren ? '</ul>' : '';
  return output;
};

// 查找父元素
const findParentElementByClass = (element: HTMLElement, className: string): HTMLElement | null => {
  while (element && !element.classList.contains(className)) {
    element = element.parentElement;
  }
  return element;
};

// 滚动事件
const handleScroll = throttle(() => {
  if (clickTimer.value) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const viewHeight = document.documentElement.clientHeight;
  let activeTitle: HTMLElement | undefined;
  const dataList = titles.value.map((title) => {
    return {
      title,
      offsetTop: getOffsetTopBetter(title)
    };
  }).filter((item) => item.title);

  const hash = location.hash;
  if (hash && hash.includes('heading-') && !isInitialHashHandled) {
    // 首次加载才执行
    isInitialHashHandled = true;
    const targetId = hash.substring(1);
    const element = document.getElementById(targetId) as HTMLElement;
    setTimeout(() => {
      // 高亮标题
      activeTitle = element;
      // 滚动到hash值对应的位置
      window.scrollTo({top: element.offsetTop});
    }, 100);
  } else {
    const firstData = dataList[0];
    const lastData = dataList[dataList.length - 1];
    if (firstData.offsetTop >= scrollTop + viewHeight) {
      activeTitle = firstData.title;
    } else if (lastData.offsetTop < scrollTop + viewHeight) {
      activeTitle = lastData.title;
    } else {
      const filterDataList = dataList.filter(({offsetTop}) => {
        return offsetTop < scrollTop + viewHeight && offsetTop >= scrollTop;
      });
      if (filterDataList.length !== 0) activeTitle = filterDataList[0].title;
    }
  }

  if (activeTitle) {
    const id = activeTitle.getAttribute('id');
    if (id) {
      const a = document.querySelector(`.directory-tree-list-item-link[href="#${id}"]`) as HTMLAnchorElement;
      if (a) {
        setParentItemActive(a);
        // 让高亮目录处于盒子中间
        const listWrap = document.querySelector('.directory-tree') as HTMLElement;
        if (listWrap) {
          const item = findParentElementByClass(a, 'directory-tree-list-item') as HTMLElement;
          const itemTop = item.offsetTop;
          const containerHeight = listWrap.clientHeight;
          const itemHeight = item.offsetHeight;
          const scrollToTop = itemTop - (containerHeight - itemHeight) / 2;
          listWrap.scrollTo({top: scrollToTop});
        }
      }
    }
  }
}, 50);

// 设置a元素的父级item选中
const setParentItemActive = (target: HTMLAnchorElement): void => {
  let active = findParentElementByClass(target, 'directory-tree-list-item');
  if (active) {
    if (activeItem.value) {
      activeItem.value.classList.remove('active');
    }
    active.classList.add('active');
    activeItem.value = active;
  }
};

// 获取元素距离文档顶部的距离
const getOffsetTopBetter = (element: HTMLElement): number => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement;
  }
  return offsetTop;
};
</script>

<style scoped lang="less">
.post-toc {
  margin-bottom: 20px;
}
</style>