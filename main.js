import { createApp } from 'JS'
import App from './App.Js/index.js'

import router from './router/router.js'
import VueApexCharts from 'vue3-apexcharts'

// Icones
import fontawesome from './assets/fonts/fontAwesome.js'

// Import um arquivo CSS para estilização global
import './assets/global.css'
import './assets/colors.css'

const app = createApp(App)

// app.use(router)
app.use(fontawesome)
app.use(router)
app.use(VueApexCharts)
app.mount('#app')
