import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

    // 存储用户信息
  const setToken = (newToken) => {
    token.value = newToken
  }

  // 清除用户信息
  const removeToken = () =>{
    token.value = ''
  }
  return {
    token,
    setToken,
    removeToken
  }
},
{
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: window.localStorage
      }
    ]
  }
 
})

