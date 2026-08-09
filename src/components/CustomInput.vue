<template>
  <div class="input-group" :class="{ 'has-error': error }">
    <label :for="id" class="input-label" v-if="label">
      {{ label }}
      <span v-if="required" class="required-star">*</span>
    </label>

    <div class="input-wrapper">
      <!-- Fixated Left Icon inside Input Box -->
      <div v-if="$slots.icon || icon" class="input-icon-left">
        <slot name="icon">
          <span class="icon-svg" v-html="icon"></span>
        </slot>
      </div>

      <!-- Native Input Field -->
      <input
        :id="id"
        :type="computedType"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        class="custom-input-field"
        :class="{ 'has-left-icon': $slots.icon || icon, 'has-right-icon': type === 'password' }"
      />

      <!-- Show / Hide Password Toggle Icon -->
      <button
        v-if="type === 'password'"
        type="button"
        class="password-toggle-btn icon-link"
        @click="togglePasswordVisibility"
        :title="isPasswordVisible ? 'Hide Password' : 'Show Password'"
      >
        <!-- Eye / Eye-off SVG -->
        <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      </button>
    </div>

    <!-- Error Message Display -->
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
  icon: { type: String, default: '' },
  min: { type: [String, Number], default: undefined },
  max: { type: [String, Number], default: undefined },
  step: { type: [String, Number], default: undefined },
  maxlength: { type: [String, Number], default: undefined },
  autocomplete: { type: String, default: 'off' },
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus']);

const isPasswordVisible = ref(false);

const computedType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  width: 100%;
}

.input-label {
  font-family: var(--font-family-heading);
  font-size: 0.95rem;
  color: var(--color-gold-500);
  font-weight: 500;
  text-transform: capitalize;
}

.required-star {
  color: var(--color-error-500);
  margin-left: 2px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Fixated left icon inside input box */
.input-icon-left {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gold-500);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
  width: 20px;
  height: 20px;
}

.custom-input-field {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(243, 198, 73, 0.25);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.custom-input-field.has-left-icon {
  padding-left: 44px;
}

.custom-input-field.has-right-icon {
  padding-right: 44px;
}

.custom-input-field:focus {
  outline: none;
  border-color: var(--color-gold-500);
  background-color: rgba(243, 198, 73, 0.08);
  box-shadow: 0 0 0 3px rgba(243, 198, 73, 0.15);
}

.custom-input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.has-error .custom-input-field {
  border-color: var(--color-error-500);
}

.password-toggle-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-gold-500);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.password-toggle-btn:hover {
  color: var(--color-gold-400);
}

.error-text {
  font-size: 0.82rem;
  color: var(--color-error-500);
  margin-top: 2px;
}
</style>
