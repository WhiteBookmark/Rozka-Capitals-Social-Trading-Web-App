<template>
  <div class="auth-page-container">
    <div class="auth-card card">
      <!-- Header -->
      <div class="auth-header">
        <router-link to="/" class="logo-link brand-logo-wrapper" title="Rozka Capitals Social Trading">
          <img src="/Logo.png" alt="Rozka Capitals Logo" class="auth-logo-img" />
        </router-link>
        <h2 class="auth-title">Client Login</h2>
        <p class="auth-subtitle">Access your Rozka Capitals Social Trading account</p>
      </div>

      <!-- Error Alert -->
      <div v-if="authStore.errorMessage" class="badge badge-danger alert-box">
        <span>{{ authStore.errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLoginSubmit" class="auth-form" novalidate>
        <!-- Email Input -->
        <CustomInput
          id="login-email"
          label="Email Address"
          type="email"
          v-model="email"
          placeholder="name@example.com"
          required
          :error="emailError"
          autocomplete="email"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </template>
        </CustomInput>

        <!-- Password Input -->
        <CustomInput
          id="login-password"
          label="Password"
          type="password"
          v-model="password"
          placeholder="Enter your account password"
          required
          :error="passwordError"
          autocomplete="current-password"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </template>
        </CustomInput>

        <!-- Form Utilities -->
        <div class="form-row-between">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe" />
            <span>Remember login on this device</span>
          </label>
          <a href="#" class="forgot-password-link" @click.prevent="showForgotNotice">Forgot password?</a>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn-submit"
          :class="{ 'is-loading': authStore.isLoading }"
          :disabled="authStore.isLoading"
        >
          <span v-if="authStore.isLoading" class="spinner-icon"></span>
          <span>{{ authStore.isLoading ? 'Signing In...' : 'Sign In To Dashboard' }}</span>
        </button>
      </form>

      <!-- Footer Call to Action -->
      <div class="auth-footer">
        <p>Don't have a social trading account yet?</p>
        <router-link to="/register" class="register-cta-link">Open Account Now</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import CustomInput from '../components/CustomInput.vue';
import { validateEmail, validatePassword } from '../utils/validators';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('alexander@rozka.com');
const password = ref('RozkaSecure2026!');
const rememberMe = ref(true);

const emailError = ref('');
const passwordError = ref('');

const handleLoginSubmit = async () => {
  emailError.value = '';
  passwordError.value = '';

  const emailVal = validateEmail(email.value);
  if (!emailVal.isValid) {
    emailError.value = emailVal.error;
    return;
  }

  const passVal = validatePassword(password.value);
  if (!passVal.isValid) {
    passwordError.value = passVal.error;
    return;
  }

  const result = await authStore.login({
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });

  if (result.success) {
    router.push('/dashboard');
  }
};

const showForgotNotice = () => {
  authStore.errorMessage = 'Password reset link sent to your registered email address!';
};
</script>

<style scoped>
.auth-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
}

.auth-card {
  width: 100%;
  max-width: 460px;
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-800);
  border-radius: 16px;
  padding: 36px;
  box-shadow: var(--elevation-4);
}

.auth-header {
  text-align: center;
  margin-bottom: 28px;
}

.auth-logo-img {
  height: 52px;
  width: auto;
  margin-bottom: 12px;
}

.auth-title {
  font-size: 1.6rem;
  color: var(--color-gold-500);
  margin-bottom: 6px;
}

.auth-subtitle {
  font-size: 0.9rem;
  color: var(--color-grey-300);
}

.alert-box {
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 20px;
  justify-content: center;
}

.form-row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  font-size: 0.88rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-grey-200);
  font-family: var(--font-family-body);
  text-transform: none;
}

.forgot-password-link {
  color: var(--color-gold-500);
  font-size: 0.88rem;
}

.btn-submit {
  width: 100%;
  height: 48px;
  background-color: var(--color-gold-500);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  background-color: var(--color-gold-400);
}

.spinner-icon {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-background);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(243, 198, 73, 0.15);
  font-size: 0.9rem;
  color: var(--color-grey-300);
}

.register-cta-link {
  display: inline-block;
  margin-top: 6px;
  font-weight: 700;
  color: var(--color-gold-500);
}
</style>
