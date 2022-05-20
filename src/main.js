import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from "vue-gtag"

createApp(App).use(VueGtag, { config: { id: 'UA-228478773-1' } }).use(router).mount('#app')
