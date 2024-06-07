import './assets/main.css'
import 'primevue/resources/themes/aura-dark-cyan/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app
    .use(PrimeVue, {
        ripple: true
    })
    .use(ToastService)
    .directive('tooltip', Tooltip)
    .mount('#app')
