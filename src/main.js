// Components
import App from './App.vue'
import router from './router/index.js'
// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from './plugins'

const app = createApp(App)
app.use(router)

registerPlugins(app)

app.mount('#app')
