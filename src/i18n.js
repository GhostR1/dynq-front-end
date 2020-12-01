import en from './assets/i18n/en.json'
import ua from './assets/i18n/ua.json'

import VueI18n from  'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n);

export default new VueI18n({
    locale: localStorage.lang || 'en',
    messages: {
        en: en,
        ua: ua
    }
})