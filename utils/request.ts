import type { NitroFetchRequest } from 'nitropack';
import { useFetch } from '#app';
import { useNuxtApp } from '#imports';
import { useUserStore } from '~/stores/user';
import { message } from 'ant-design-vue';


// 定义响应数据的类型
interface R<T = any> {
  code: number;
  data: T;
  message: string;
}

// 定义请求选项的类型
interface RequestOptions {
  method?: string;
  data?: any;
  contentType?: string;
  headers?: Record<string, string>;
}

// 错误处理函数
const handleError = (nuxtApp: ReturnType<typeof useNuxtApp>, response: any) => {
  if (import.meta.client) {
    message.error(response._data.message);
  } else {
    nuxtApp.runWithContext(() => {
      // navigateTo({
      //   path: '/Error',
      //   query: {
      //     code: response._data.code,
      //     message: response._data.message
      //   }
      // });
    });
  }
};

// 封装的 API 请求函数
const apiRequest = <T>(url: NitroFetchRequest, options: RequestOptions = {}): Promise<R<T>> => {
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp();
  const userStore = useUserStore();
  const contentType = options.contentType || 'application/json';

  return useFetch<R<T>>(url, {
    baseURL: config.public.baseUrl,
    method: options.method || 'GET',
    headers: {
      'Content-Type': contentType,
      'Authorization': `Bearer ${import.meta.client ? userStore.token : ''}`,
      ...options.headers
    },
    body: options.data,
    onResponse({response}) {
      if (response.status >= 200 && response.status < 300) {
        if (response._data.code === 200) {
          return response._data;
        } else {
          handleError(nuxtApp, response);
        }
      }
    },
    onResponseError({response}) {
      handleError(nuxtApp, response);
    },
    ...options
  });
};

// 发起 GET 请求的便捷方法
export const getApi = <T>(url: NitroFetchRequest, params: any = {}, options: RequestOptions = {}): Promise<R<T>> => {
  return apiRequest(url, {
    method: 'GET',
    data: params,
    ...options
  });
};

// 发起 POST 请求的便捷方法
export const postApi = <T>(url: NitroFetchRequest, params: any = {}, options: RequestOptions = {}): Promise<R<T>> => {
  return apiRequest(url, {
    method: 'POST',
    data: params,
    ...options
  });
};