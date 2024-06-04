import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/aura-dark-blue/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue).use(ToastService).mount('#app')
