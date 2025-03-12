import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

// 定义用户信息的类型
interface UserInfo {
  [key: string]: any;
}

// 定义登录数据的类型
interface LoginData {
  token: string;
  userinfo: UserInfo;
}

export const useUserStore = defineStore('user', () => {
  // 定义响应式状态
  const token = ref<string>('');
  const userinfo = reactive<UserInfo>({});

  // 用户登录
  const login = (data: LoginData) => {
    setToken(data.token);
    setUserInfo(data.userinfo);
  };

  // 单独更新或写入 token
  const setToken = (data: string) => {
    token.value = data;
  };

  // 单独更新用户信息或写入
  const setUserInfo = (data: UserInfo) => {
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