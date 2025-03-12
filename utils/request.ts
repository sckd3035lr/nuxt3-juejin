// import { message } from "ant-design-vue";
//
// export const useRequest = (url: string, options: any) => {
//   const config = useRuntimeConfig();
//   const nuxtApp = useNuxtApp();
//
//   // 使用 useFetch 发送请求，并配置各种处理函数和选项
//   return useFetch(url, {
//     // 设置请求的基础 URL，从运行时配置中获取
//     // baseURL: config.public.apiBase,
//     baseURL: '/api',
//     // 请求拦截处理函数
//     onRequest({options}) {
//       const token = localStorage.getItem('token');
//       options.headers = {
//         ...options.headers,
//         Authorization: token ? `Bearer ${token}` : '',
//       };
//       // 打印请求的 URL 和头部信息，方便调试
//       console.log(`Requesting ${url} with headers ${JSON.stringify(options.headers)}`);
//     },
//     // 响应成功处理函数
//     onResponse({response}) {
//       const {status, _data} = response;
//       if (status >= 200 && status < 300) {
//         if (_data.code !== 200) {
//           // 如果在客户端环境
//           if (import.meta.client) {
//
//           } else {
//             // 如果不在客户端环境，使用 Nuxt 应用实例进行页面导航到错误页面，并传递错误信息
//             nuxtApp.runWithContext(() => {
//               navigateTo({path: '/error', query: {message: _data.message, code: _data.code}});
//             });
//           }
//         }
//       }
//       // 打印响应状态码和数据，方便调试
//       console.log(`Response status: ${status}, data: ${JSON.stringify(_data)}`);
//     },
//     // 响应错误处理函数
//     onResponseError({error, response}) {
//       let message = error?.message;
//       message = response._data.message;
//       // 如果在客户端环境
//       if (import.meta.client) {
//
//       } else {
//         // 如果不在客户端环境，使用 Nuxt 应用实例进行页面导航到错误页面，并传递错误信息
//         nuxtApp.runWithContext(() => {
//           navigateTo({path: '/error', query: {message, code: response._data.code}});
//         });
//       }
//       // 打印错误信息、响应状态码和数据，方便调试
//       console.error(`Error: ${message}, response status: ${response.status}, data: ${JSON.stringify(response._data)}`);
//     },
//     // 扩展传入的 options 参数
//     ...options
//   });
// };
//
