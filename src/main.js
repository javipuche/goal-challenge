import '@/assets/scss/reset.scss'
import '@/assets/scss/styles.scss'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import stores from '@/stores'
import { createI18n } from 'vue-i18n'
import locales from '@/locales'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: locales,
})

createApp(App)
    .use(stores)
    .use(router)
    .use(i18n)
    .mount('#app')
