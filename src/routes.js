import Vue from 'vue';
import Home from './components/Home/Home.vue';
import Planets from './views/Planets/Planets.vue';
import StarShips from './views/Starships/Starships.vue';
import Characters from './views/Characters/Characters.vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'isActive',
  routes: [
    { path: '/', name: 'App', component: Home },
    {
      path: '/planets',
      name: 'Planets',
      component: Planets,
      props: { title: 'Planets' }
    },
    {
      path: '/starships',
      name: 'Starships',
      component: StarShips,
      props: { title: 'StarShips' }
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters,
      props: { title: 'Characters' }
    }
  ]
});
