<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast-list">
        <div
          v-if="message"
          :key="message"
          class="toast-notification"
          :class="[typeClass]"
        >
          <div class="icon-circle icon-circle-sm" :class="[iconBgClass]">
            <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <span class="toast-text">{{ message }}</span>
          <button class="toast-close icon-link" @click="$emit('dismiss')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'info' }, // success, error, info
});

defineEmits(['dismiss']);

const typeClass = computed(() => `toast-${props.type}`);
const iconBgClass = computed(() => {
  if (props.type === 'success') return 'badge-success';
  if (props.type === 'error') return 'badge-danger';
  return 'badge-info';
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast-notification {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-surface-400); /* Darker background with lighter text */
  color: var(--color-gold-100);
  border: 1px solid var(--color-gold-800);
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: var(--elevation-4);
  max-width: 420px;
}

.toast-success {
  border-color: var(--color-success-600);
}

.toast-error {
  border-color: var(--color-error-600);
}

.toast-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.toast-close {
  background: none;
  border: none;
  color: var(--color-grey-300);
  margin-left: auto;
}

.toast-close:hover {
  color: var(--color-gold-500);
}

.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}
.toast-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
