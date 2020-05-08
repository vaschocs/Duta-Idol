import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import DatetimePicker from 'vuetify-datetime-picker'
import moment from 'moment'





Vue.use(DatetimePicker)

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

require('@/store/subscriber')

// axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.baseURL = 'https://immense-thicket-40687.herokuapp.com/api'
    // axios.defaults.baseURL = 'https://sipoli-f0ccc.web.app/api'
    // axios.defaults.baseURL = 'https://immense-thicket-40687.herokuapp.com/api'


Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('YYYY/MM/DD HH:mm:ss')
    }
});

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
})
