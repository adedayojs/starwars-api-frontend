import Vue from 'vue';
import Home from './components/Home/Home.vue';
import Planets from './components/Planets/PopularPlanets.vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'isActive',
  routes: [
    { path: '/', name: 'App', component: Home },
    { path: '/planets', name: 'Planets', component: Planets, props:{} }
  ]
});
