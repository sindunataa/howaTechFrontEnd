// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
})

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
})

app.config.globalProperties.$toast = toast

app.mount('#app')