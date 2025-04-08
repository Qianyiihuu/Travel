import {createRouter,createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Destination from '../views/Destination.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

const routes=[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/login',
        name:'login',
        component:Login,
    },
    {
        path:'/home',
        name:'Home',
        component:Home,
    },
    {
        path:'/destinaitons',
        name:'destination',
        component:Destination,
    },
    {
        path:'/about',
        name:'about',
        component:About,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
  
  export default router;
