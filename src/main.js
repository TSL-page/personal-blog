import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/stores/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 引入持久化插件
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // / 引入中文语言包
pinia.use(piniaPluginPersistedstate)


const app = createApp(App)
app.use(router)
app.use(ElementPlus,{ locale: zhCn })
app.use(pinia)
app.mount('#app')



