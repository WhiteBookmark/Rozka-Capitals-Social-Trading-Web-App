import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', name: 'Login', component: LoginView, meta: { title: 'Login - Rozka Capitals Social Trading' } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { title: 'Register - Rozka Capitals Social Trading' } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { title: 'Dashboard - Rozka Capitals Social Trading' } },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || 'Rozka Capitals Social Trading';
  next();
});

export default router;
