import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/Pages/Home.vue";
import AllProducts from "@/Pages/AllProducts.vue";
import ProductInfo from "@/Pages/ProductInfo.vue";
import Search from "@/Pages/Search.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/all-products",
    name: "AllProducts",
    component: AllProducts,
  },
  {
    path: "/all-products/:id",
    name: "ProductInfo",
    component: ProductInfo,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
