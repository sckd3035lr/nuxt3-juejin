import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 定义响应式状态
  const token = ref('');
  const userinfo = reactive({});
  // 用户登录
  const login = (data: any) => {
    setToken(data.token);
    setUserInfo(data.userinfo);
  };

  // 单独更新或写入 token
  const setToken = (data: any) => {
    token.value = data;
  };

  // 单独更新用户信息或写入
  const setUserInfo = (data: any) => {
    Object.assign(userinfo, data);
  };

  // 用户退出
  const logout = () => {
    token.value = '';
    Object.keys(userinfo).forEach(key => delete userinfo[key]);
  };

  return {
    token,
    userinfo,
    login,
    setToken,
    setUserInfo,
    logout
  };
}, {
  persist: {
    key: 'USER-INFO',
    storage: piniaPluginPersistedstate.localStorage(),
  }
});