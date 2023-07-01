import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { openWebsocket } from './websocket'
import './assets/main.css'
openWebsocket()
const app = createApp(App)

app.use(router)

app.mount('#app')
