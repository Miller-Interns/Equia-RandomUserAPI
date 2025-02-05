import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import { RouteName } from '@/enums/route-enum';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.HOME,
      component: HomeView,
    },
  ],
});

export default router;
