import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import InvestorView from '../views/InvestorView.vue';
import MasterTraderView from '../views/MasterTraderView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { title: 'Home - Rozka Capitals Social Trading' } },
  { path: '/login', name: 'Login', component: LoginView, meta: { title: 'Login - Rozka Capitals Social Trading' } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { title: 'Register - Rozka Capitals Social Trading' } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { title: 'Dashboard - Rozka Capitals Social Trading' } },
  { path: '/investor', name: 'Investor', component: InvestorView, meta: { title: 'Investor Center - Rozka Capitals Social Trading' } },
  { path: '/master-trader', name: 'MasterTrader', component: MasterTraderView, meta: { title: 'Master Trader Portal - Rozka Capitals' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
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
