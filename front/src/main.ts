import './assets/main.css'

// Vue & Pinia
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// App & Vue Router
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// App creation
const app = createApp(App)

// Vuetify configuration
const vuetify = createVuetify({
  components,
  directives,
})

// App setup
app.use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
