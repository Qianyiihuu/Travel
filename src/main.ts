import { createApp } from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router  from './router'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

const vuetify=createVuetify({
    components,
    directives,
});
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
