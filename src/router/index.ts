import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Destination from "../views/Destination.vue";
import About from "../views/About.vue";
import DestinationDetail from "../views/DestinationDetail.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/destinaitons",
    name: "destination",
    component: Destination,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/destinations/:id",
    name: "DestinationDetail",
    component: DestinationDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
