<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-backdrop" @click.self="handleBackdropClick">
        <div class="modal-container" :class="[typeClass]" role="dialog" aria-modal="true">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title-group">
              <div class="icon-circle icon-circle-sm" :class="[iconClass]">
                <svg v-if="type === 'danger'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <svg v-else-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <h3 class="modal-title">{{ title }}</h3>
            </div>
            <button class="modal-close-btn icon-link" @click="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <slot>
              <p>{{ message }}</p>
            </slot>
          </div>

          <!-- Modal Actions -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">
              {{ cancelText }}
            </button>
            <button type="button" class="btn" :class="[confirmBtnClass]" @click="confirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmation' },
  message: { type: String, default: '' },
  type: { type: String, default: 'primary' }, // primary, danger, success, warning
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  closeOnBackdrop: { type: Boolean, default: true },
});

const emit = defineEmits(['close', 'confirm']);

const close = () => emit('close');
const confirm = () => emit('confirm');

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) close();
};

const typeClass = computed(() => `modal-type-${props.type}`);

const iconClass = computed(() => {
  if (props.type === 'danger') return 'badge-danger';
  if (props.type === 'success') return 'badge-success';
  if (props.type === 'warning') return 'badge-warning';
  return 'badge-info';
});

const confirmBtnClass = computed(() => {
  if (props.type === 'danger') return 'btn-danger';
  if (props.type === 'success') return 'btn-success';
  return 'btn-primary';
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-container {
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-800);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--elevation-5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(229, 181, 103, 0.15);
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-title {
  margin: 0;
  font-size: 1.15rem;
  color: var(--color-gold-500);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--color-grey-300);
}

.modal-close-btn:hover {
  color: var(--color-gold-400);
}

.modal-body {
  padding: 20px;
  color: var(--color-grey-100);
  font-size: 0.95rem;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  background-color: var(--color-surface-600);
  border-top: 1px solid rgba(229, 181, 103, 0.1);
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
}

.btn-secondary {
  background-color: var(--color-surface-400);
  color: var(--color-grey-100);
}

.btn-secondary:hover {
  background-color: var(--color-surface-300);
}

.btn-primary {
  background-color: var(--color-gold-500);
  color: var(--color-background);
}

.btn-primary:hover {
  background-color: var(--color-gold-400);
}

.btn-danger {
  background-color: var(--color-error-500);
  color: #ffffff;
}

.btn-danger:hover {
  background-color: var(--color-error-400);
}

.btn-success {
  background-color: var(--color-success-500);
  color: #ffffff;
}

.btn-success:hover {
  background-color: var(--color-success-400);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
