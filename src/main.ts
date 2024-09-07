import "./assets/main.scss"
import './main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import pinia from '@/stores/index'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import App from './App.vue'
import Prism from 'prismjs'
import router from './router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 2000 }
app.provide('ElConfigProvider', {
  locale: zhCn,
})
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

app.use(VueMarkdownEditor)

app.mount('#app')
