import Vue from 'vue';
import App from './App.vue';
import Details from './components/details.vue';
import HeadList from './components/headList.vue';
import VueRouter from 'vue-router';
import 'jquery';
import 'bootstrap';
import 'bootstrap-vue';
import './assets/app.scss'

Vue.use(VueRouter);

const routes = [
  {path: '/details/:id', name: 'details', component: Details},
  {path: '/', name:'home', component: HeadList}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
