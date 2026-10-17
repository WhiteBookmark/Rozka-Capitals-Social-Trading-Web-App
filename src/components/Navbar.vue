<template>
  <header class="site-header">
    <div class="container header-container">
      <!-- Clickable Brand Logo (Navigates to Home / Dashboard without underline) -->
      <router-link to="/" class="logo-link brand-logo-wrapper" title="Rozka Capitals Social Trading Home">
        <img src="/Logo.png" alt="Rozka Capitals Logo" class="brand-logo-img" />
        <div class="brand-text-group">
          <span class="brand-title">Rozka Capitals</span>
          <span class="brand-subtitle">Social Trading</span>
        </div>
      </router-link>

      <!-- Desktop Navigation Links -->
      <nav class="desktop-nav">
        <router-link to="/" class="nav-link">Copy Trade</router-link>
        <router-link to="/dashboard" class="nav-link">Social Dashboard</router-link>
        <router-link to="/investor" class="nav-link">Investor Center</router-link>
        <router-link to="/master-trader" class="nav-link">Master Portal</router-link>
      </nav>

      <!-- User Auth Actions / Status -->
      <div class="auth-actions">
        <template v-if="authStore.isLoggedIn">
          <div class="user-badge">
            <img :src="authStore.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'" alt="User Avatar" class="user-avatar" />
            <div class="user-info">
              <span class="user-name">{{ authStore.userName }}</span>
              <span class="user-type">{{ authStore.user?.accountType || 'Pro Copy Trader' }}</span>
            </div>
          </div>
          <button class="logout-btn" @click="handleLogout" title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-link btn-login">Login</router-link>
          <router-link to="/register" class="btn-link btn-register">Register</router-link>
        </template>

        <!-- Mobile Menu Toggle Button -->
        <button class="mobile-toggle-btn icon-link" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle Navigation Menu">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <Transition name="drawer">
      <div v-if="isMobileMenuOpen" class="mobile-nav-drawer">
        <router-link to="/" class="mobile-nav-link" @click="isMobileMenuOpen = false">Copy Trade</router-link>
        <router-link to="/dashboard" class="mobile-nav-link" @click="isMobileMenuOpen = false">Social Dashboard</router-link>
        <router-link to="/investor" class="mobile-nav-link" @click="isMobileMenuOpen = false">Investor Center</router-link>
        <router-link to="/master-trader" class="mobile-nav-link" @click="isMobileMenuOpen = false">Master Portal</router-link>
        
        <div class="mobile-auth-group">
          <template v-if="authStore.isLoggedIn">
            <button class="btn-link btn-login full-width" @click="handleLogout">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn-link btn-login full-width" @click="isMobileMenuOpen = false">Login</router-link>
            <router-link to="/register" class="btn-link btn-register full-width" @click="isMobileMenuOpen = false">Register</router-link>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const isMobileMenuOpen = ref(false);

const handleLogout = () => {
  authStore.logout();
  isMobileMenuOpen.value = false;
  router.push('/login');
};
</script>

<style scoped>
.site-header {
  background-color: var(--color-surface-500);
  border-bottom: 1px solid rgba(243, 198, 73, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--elevation-2);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

.brand-logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo-img {
  height: 44px;
  width: auto;
  object-fit: contain;
}

.brand-text-group {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-family-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-gold-500);
  line-height: 1.1;
}

.brand-subtitle {
  font-size: 0.75rem;
  color: var(--color-grey-300);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-grey-100);
}

.nav-link.router-link-active {
  color: var(--color-gold-500);
  font-weight: 700;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--color-surface-400);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(243, 198, 73, 0.2);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-gold-500);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-gold-500);
}

.user-type {
  font-size: 0.7rem;
  color: var(--color-grey-300);
}

.logout-btn {
  background: none;
  border: none;
  color: var(--color-gold-500);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: rgba(243, 198, 73, 0.1);
  color: var(--color-error-500);
}

.btn-link {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

.btn-login {
  color: var(--color-gold-500);
  border: 1px solid var(--color-gold-500);
}

.btn-login:hover {
  background-color: rgba(243, 198, 73, 0.1);
}

.btn-register {
  background-color: var(--color-gold-500);
  color: var(--color-background);
}

.btn-register:hover {
  background-color: var(--color-gold-400);
}

.mobile-toggle-btn {
  display: none;
  background: none;
  border: none;
  color: var(--color-gold-500);
  padding: 6px;
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .mobile-toggle-btn {
    display: flex;
  }

  .user-info {
    display: none;
  }
}

.mobile-nav-drawer {
  background-color: var(--color-surface-500);
  border-bottom: 1px solid var(--color-gold-800);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-nav-link {
  font-size: 1.05rem;
  padding: 8px 0;
  border-bottom: 1px solid rgba(243, 198, 73, 0.08);
}

.mobile-auth-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.full-width {
  width: 100%;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 400px;
  opacity: 1;
}

.drawer-enter-from,
.drawer-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
