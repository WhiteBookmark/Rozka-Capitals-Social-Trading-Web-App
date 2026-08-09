<template>
  <div class="auth-page-container">
    <div class="auth-card card">
      <!-- Header -->
      <div class="auth-header">
        <router-link to="/" class="logo-link brand-logo-wrapper" title="Rozka Capitals Social Trading">
          <img src="/Logo.png" alt="Rozka Capitals Logo" class="auth-logo-img" />
        </router-link>
        <h2 class="auth-title">Open Trading Account</h2>
        <p class="auth-subtitle">Join Rozka Capitals Social Trading Network</p>
      </div>

      <!-- Error Alert -->
      <div v-if="authStore.errorMessage" class="badge badge-danger alert-box">
        <span>{{ authStore.errorMessage }}</span>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegisterSubmit" class="auth-form" novalidate>
        <!-- Full Name -->
        <CustomInput
          id="reg-name"
          label="Full Legal Name"
          type="text"
          v-model="name"
          placeholder="e.g. Alexander Rozka"
          required
          :error="nameError"
          @blur="onNameBlur"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </template>
        </CustomInput>

        <!-- Email Address -->
        <CustomInput
          id="reg-email"
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

        <!-- Two Columns: Date of Birth & Age -->
        <div class="form-row-grid">
          <!-- Date of Birth (Max date = Present / Today) -->
          <CustomInput
            id="reg-dob"
            label="Date Of Birth"
            type="date"
            v-model="dob"
            :max="todayDate"
            required
            :error="dobError"
            @change="onDobChange"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </template>
          </CustomInput>

          <!-- Age (Number, min 0, max 150, step 1, auto-calculated from DOB) -->
          <CustomInput
            id="reg-age"
            label="Age (Years)"
            type="number"
            v-model="age"
            min="0"
            max="150"
            step="1"
            required
            :error="ageError"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </template>
          </CustomInput>
        </div>

        <!-- Phone Number (Tel type, max length 20, digits/hyphens/plus only) -->
        <CustomInput
          id="reg-phone"
          label="Phone Number"
          type="tel"
          v-model="phone"
          placeholder="+1 555-019-2831"
          maxlength="20"
          required
          :error="phoneError"
          @input="onPhoneInput"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </template>
        </CustomInput>

        <!-- Password -->
        <CustomInput
          id="reg-password"
          label="Account Password"
          type="password"
          v-model="password"
          placeholder="Min 8 characters"
          required
          :error="passwordError"
          autocomplete="new-password"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </template>
        </CustomInput>

        <!-- Terms Agreement Checkbox -->
        <div class="terms-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="agreeTerms" required />
            <span>I agree to the client trading terms, risk disclosures, and account agreement</span>
          </label>
          <span v-if="termsError" class="error-text">{{ termsError }}</span>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn-submit"
          :class="{ 'is-loading': authStore.isLoading }"
          :disabled="authStore.isLoading"
        >
          <span v-if="authStore.isLoading" class="spinner-icon"></span>
          <span>{{ authStore.isLoading ? 'Creating Account...' : 'Complete Registration' }}</span>
        </button>
      </form>

      <!-- Footer Call to Action -->
      <div class="auth-footer">
        <p>Already registered with Rozka Capitals?</p>
        <router-link to="/login" class="register-cta-link">Sign In Here</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import CustomInput from '../components/CustomInput.vue';
import {
  sanitizeName,
  validateAge,
  getTodayDateString,
  validateDobAndCalculateAge,
  sanitizeAndValidatePhone,
  validateEmail,
  validatePassword,
} from '../utils/validators';

const authStore = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const dob = ref('');
const age = ref('');
const phone = ref('');
const password = ref('');
const agreeTerms = ref(false);

const todayDate = getTodayDateString();

const nameError = ref('');
const emailError = ref('');
const dobError = ref('');
const ageError = ref('');
const phoneError = ref('');
const passwordError = ref('');
const termsError = ref('');

// Auto-clean name on blur
const onNameBlur = () => {
  if (name.value) {
    name.value = sanitizeName(name.value);
  }
};

// Auto-calculate age when DOB is selected
const onDobChange = () => {
  dobError.value = '';
  if (!dob.value) return;

  const result = validateDobAndCalculateAge(dob.value);
  if (!result.isValid) {
    dobError.value = result.error;
    age.value = '';
  } else {
    age.value = result.calculatedAge;
    ageError.value = '';
  }
};

// Clean phone number on input
const onPhoneInput = () => {
  const result = sanitizeAndValidatePhone(phone.value);
  phone.value = result.sanitizedPhone;
};

// Form submission handler
const handleRegisterSubmit = async () => {
  nameError.value = '';
  emailError.value = '';
  dobError.value = '';
  ageError.value = '';
  phoneError.value = '';
  passwordError.value = '';
  termsError.value = '';

  // Sanitize Name
  name.value = sanitizeName(name.value);
  if (!name.value) {
    nameError.value = 'Full legal name is required.';
    return;
  }

  // Validate Email
  const emailVal = validateEmail(email.value);
  if (!emailVal.isValid) {
    emailError.value = emailVal.error;
    return;
  }

  // Validate DOB & Age
  const dobVal = validateDobAndCalculateAge(dob.value);
  if (!dobVal.isValid) {
    dobError.value = dobVal.error;
    return;
  }

  const ageVal = validateAge(age.value);
  if (!ageVal.isValid) {
    ageError.value = ageVal.error;
    return;
  }

  // Validate Phone
  const phoneVal = sanitizeAndValidatePhone(phone.value);
  if (!phoneVal.isValid) {
    phoneError.value = phoneVal.error;
    return;
  }

  // Validate Password
  const passVal = validatePassword(password.value);
  if (!passVal.isValid) {
    passwordError.value = passVal.error;
    return;
  }

  if (!agreeTerms.value) {
    termsError.value = 'You must agree to the terms and privacy policy.';
    return;
  }

  const result = await authStore.register({
    name: name.value,
    email: email.value,
    dob: dob.value,
    age: age.value,
    phone: phone.value,
    password: password.value,
  });

  if (result.success) {
    router.push('/dashboard');
  }
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
  max-width: 540px;
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

.form-row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.terms-group {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--color-grey-200);
  font-family: var(--font-family-body);
  font-size: 0.88rem;
  text-transform: none;
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

.error-text {
  font-size: 0.82rem;
  color: var(--color-error-500);
  display: block;
  margin-top: 4px;
}

.auth-footer {
  text-align: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(229, 181, 103, 0.15);
  font-size: 0.9rem;
  color: var(--color-grey-300);
}

.register-cta-link {
  display: inline-block;
  margin-top: 6px;
  font-weight: 700;
  color: var(--color-gold-500);
}

@media (max-width: 600px) {
  .form-row-grid {
    grid-template-columns: 1fr;
  }
}
</style>
