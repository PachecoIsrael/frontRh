import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from 'axios';
import store from './store';
import './assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';

axios.defaults.baseURL = 'http://10.38.210.24:8080/api/v1/';

axios.interceptors.response.use(
    res => res,
    err => {
        // let loader = this.$loading.show();

        //console.log(err);
        if(err.response?.status === 403){
            store.dispatch('auth/logout');
                router.push('/acesso');
                // loader.hide()
                
        } 
        if(err.response?.status === 401 &&
            err.response?.data === 'Token Expirado'){
                Swal.fire({
                    title: 'Token Expirado!',
                    text: 'É necessário fazer login novamente',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) =>{
                    if(result.isConfirmed) {
                        setTimeout(() =>{
                            store.dispatch('auth/logout');
                                router.push('/acesso');
                                // loader.hide()
                                
                }, '500');
                }
            });
        }
        throw new Error((err.response?.data.message) || (err.response?.data) || err.message);
    }
)

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

.use(store)
app.use(router)
.use(VueSweetalert2)
app.mount('#app')
