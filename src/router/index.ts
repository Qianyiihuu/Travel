import {createRouter,createWebHistory} from 'vue-router';
import Home from '../components/Home.vue'
import Destination from '../components/Destination.vue'
import About from '../components/About.vue'

const routes=[
    {
        path:'/',
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
