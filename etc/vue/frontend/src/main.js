import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide('bootstrap', bootstrap);

app.use(router)

app.mount('#app')
