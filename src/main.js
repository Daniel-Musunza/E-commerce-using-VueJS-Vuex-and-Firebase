import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import '@/assets/styles/style.css'
import './../node_modules/bulma/css/bulma.css'
import Vue3Editor from "vue3-editor"
import UploadButton from "vuetify-upload-button"
import firebase from "firebase/app"
import "firebase/auth"

let app;
firebase.auth().onAuthStateChanged(() =>
    {
        if (!app) {
            const aPP=createApp(App)
            aPP.use(store)
            aPP.use(router)
            aPP.use(Vue3Editor)
            aPP.use(UploadButton)
            aPP.config.productionTip = false
            aPP.mount('#app')
        }
    });

