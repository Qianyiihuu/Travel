import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Destination from "../views/Destination.vue";
import About from "../views/About.vue";
import DestinationDetail from "../views/DestinationDetail.vue";
import CartView from "../views/CartView.vue";
import Payment from "../views/Payment.vue";

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
    path: "/destinations",
    name: "destination",
    component: Destination,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
    props: (route: {
      query: { from: any; productId: any; quantity: any; sourcePage: any };
    }) => ({
      from: route.query.from, // 'cart' or 'direct'
      productId: route.query.productId || null,
      quantity: route.query.quantity || 1,
      sourcePage: route.query.sourcePage || null,
    }),
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
