import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import StartPage from './components/StartPage.vue';
import PacientProfile from './components/PacientProfile.vue';

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: StartPage },
    { path: '/patient', 
      component: PacientProfile,  
      props(route) {
        return {  patientID: route.query.patientID }
      } 
    }
  ]
});
export default router