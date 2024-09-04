import './assets/all.scss'
import 'bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import JAPAN from '@vee-validate/i18n/dist/locale/ja.json'
import enUS from '@vee-validate/i18n/dist/locale/en.json'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
// import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'
import { createI18n } from 'vue-i18n'
import zh from './languages/zh-TW.json'
import en from './languages/en.json'
import jp from './languages/jp.json'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { date, currency } from '@/methods/filters'

// ---------------
import App from './App.vue'
import router from './router'
// ---------------
const app = createApp(App)

// vee-validate setting start
Object.keys(all).forEach((rule) => { // 定義規則-全部加入
  defineRule(rule, all[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW, en: enUS, jp: JAPAN }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系
// vee-validate setting end

// i18n setting start
const i18n = createI18n({
  legacy: false, // 啟用新的 Vue3 選項
  locale: 'zh-TW', // 設置默認語言
  messages: {
    en,
    'zh-TW': zh, // 引入 zh-TW.json 文件
    jp
  }
})

app.config.globalProperties.$i18n = i18n
// i18n setting end

// dayjs setting start
app.config.globalProperties.$dayjs = dayjs // 設定全域使用this.$dayjs (但Store中是不能使用這種形式的)

dayjs.extend(utc) // 擴展時間套件
dayjs.extend(timezone) // 擴展時間套件
// dayjs setting end

// 自定義函式庫
app.config.globalProperties.$filters = {
  date,
  currency
}

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
// app.use(CkeditorPlugin)
app.use(i18n)

app.component('LoadingOverlay', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
