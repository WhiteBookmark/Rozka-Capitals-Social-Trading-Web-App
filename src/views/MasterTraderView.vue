<template>
  <div class="master-container container">
    <!-- Header -->
    <div class="dashboard-header card">
      <div class="header-left">
        <h1 class="page-title">Master Trader Portal</h1>
        <p class="page-subtitle">Manage your strategy, configure fees, and track your global audience.</p>
      </div>
      <div class="header-right">
        <span class="badge badge-success">
          <span class="pulse-dot"></span> Strategy Broadcasting
        </span>
      </div>
    </div>

    <!-- Immutable Track Record -->
    <div class="section-title-bar margin-top-lg">
      <div class="title-group">
        <h2 class="section-title">Immutable Track Record</h2>
        <p class="section-subtitle">System-verified, unalterable performance metrics</p>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Total ROI</span>
          <div class="icon-circle icon-circle-sm badge-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </div>
        </div>
        <div class="stat-value text-success">+{{ metrics.totalRoi }}%</div>
        <div class="stat-footer text-success">All-Time Return</div>
      </div>

      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Sharpe Ratio</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ metrics.sharpeRatio }}</div>
        <div class="stat-footer text-muted">Risk-adjusted return</div>
      </div>

      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Win Rate & Max DD</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
          </div>
        </div>
        <div class="stat-value gold-text">{{ metrics.winRate }}%</div>
        <div class="stat-footer text-danger">Max DD: {{ metrics.maxDrawdown }}%</div>
      </div>

      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Days Active</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ metrics.daysActive }}</div>
        <div class="stat-footer text-muted">Verified Trading Days</div>
      </div>
    </div>

    <!-- Audience & P&L Dashboard -->
    <div class="section-title-bar margin-top-lg">
      <div class="title-group">
        <h2 class="section-title">Audience & P&L Dashboard</h2>
        <p class="section-subtitle">Real-time visibility into your followers and pending payouts</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Active Copiers</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ audience.copiers.toLocaleString() }}</div>
        <div class="stat-footer text-success">+{{ audience.copiersGrowth }}% this week</div>
      </div>

      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Total Follower AUM</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
        </div>
        <div class="stat-value gold-text">${{ formatCurrency(audience.totalAUM) }}</div>
        <div class="stat-footer text-muted">Capital mirroring your trades</div>
      </div>

      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Pending Fee Payouts</span>
          <div class="icon-circle icon-circle-sm badge-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
        <div class="stat-value text-success">${{ formatCurrency(audience.pendingPayouts) }}</div>
        <div class="stat-footer text-success">Available for withdrawal on 1st</div>
      </div>
    </div>

    <!-- Layout Grid for Settings -->
    <div class="settings-grid margin-top-lg">
      
      <!-- Monetization Customization -->
      <div class="card">
        <h3 class="card-title">Monetization Customization</h3>
        <p class="card-subtitle margin-bottom-md">Set your fee structure for incoming copiers.</p>
        
        <form @submit.prevent="saveMonetization">
          <div class="form-group margin-bottom-md">
            <label for="fee-type" class="input-label">Fee Structure Type</label>
            <div class="input-icon-wrapper">
              <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <select id="fee-type" v-model="monetization.feeType" class="custom-select has-icon">
                <option value="performance">Performance Fee (% of Profits)</option>
                <option value="subscription">Fixed Subscription ($/Month)</option>
              </select>
            </div>
          </div>

          <div class="form-group margin-bottom-lg" v-if="monetization.feeType === 'performance'">
            <label for="fee-percentage" class="input-label">Performance Fee Percentage (%)</label>
            <div class="input-icon-wrapper">
              <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="5" x2="5" y2="19"/>
                <circle cx="6.5" cy="6.5" r="2.5"/>
                <circle cx="17.5" cy="17.5" r="2.5"/>
              </svg>
              <input
                id="fee-percentage"
                type="number"
                min="0"
                max="30"
                step="1"
                v-model="monetization.percentage"
                class="custom-input-field has-icon"
                placeholder="e.g. 20"
              />
            </div>
            <span class="help-text">Maximum allowed by broker limits is 30%.</span>
          </div>

          <div class="form-group margin-bottom-lg" v-if="monetization.feeType === 'subscription'">
            <label for="fee-fixed" class="input-label">Monthly Subscription Price ($)</label>
            <div class="input-icon-wrapper">
              <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <input
                id="fee-fixed"
                type="number"
                min="0"
                max="1000"
                step="1"
                v-model="monetization.fixedAmount"
                class="custom-input-field has-icon"
                placeholder="e.g. 30"
              />
            </div>
            <span class="help-text">Billed to followers every 30 days.</span>
          </div>

          <button type="submit" class="btn-primary-action">Save Fee Structure</button>
        </form>
      </div>

      <!-- Reverse Copying Toggle -->
      <div class="card">
        <h3 class="card-title">Advanced: Reverse Copying</h3>
        <p class="card-subtitle margin-bottom-md">Allow contrarian investors to auto-invert your trades.</p>
        
        <div class="reverse-copy-box" :class="{ 'is-active': settings.allowReverseCopying }">
          <div class="toggle-info">
            <h4>Enable Reverse Copying</h4>
            <p>If active, followers can choose to map your BUY orders to SELL orders (and vice-versa). Powerful for funds looking to fade specific strategies.</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="settings.allowReverseCopying" @change="toggleReverseCopying">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

    </div>

    <!-- Global Toast -->
    <GlobalToast
      v-if="toastMessage"
      :message="toastMessage"
      :type="toastType"
      @dismiss="toastMessage = ''"
    />
  </div>
</template>

<script setup>
/**
 * MasterTraderView Component
 * Portal for Master Traders featuring immutable system-verified metrics,
 * customizable fee monetization structure, follower audience/AUM metrics, and reverse copying configuration.
 */
import { ref } from 'vue';
import GlobalToast from '../components/GlobalToast.vue';

// Toast State
const toastMessage = ref('');
const toastType = ref('success');

// Immutable Metrics (Mock verified data)
const metrics = ref({
  totalRoi: 142.5,
  sharpeRatio: 1.84,
  winRate: 72.4,
  maxDrawdown: 14.2,
  daysActive: 312
});

// Audience & AUM (Mock dynamic data)
const audience = ref({
  copiers: 3410,
  copiersGrowth: 12.5,
  totalAUM: 2450000.00,
  pendingPayouts: 18450.75
});

// Monetization Settings
const monetization = ref({
  feeType: 'performance',
  percentage: 20,
  fixedAmount: 30
});

// Master Settings
const settings = ref({
  allowReverseCopying: false
});

// Utilities
const formatCurrency = (val) => {
  const num = Number(val);
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Actions
const saveMonetization = () => {
  toastMessage.value = 'Monetization fee structure updated successfully.';
  toastType.value = 'success';
};

const toggleReverseCopying = () => {
  const status = settings.value.allowReverseCopying ? 'Enabled' : 'Disabled';
  toastMessage.value = `Reverse Copying has been ${status}.`;
  toastType.value = 'info';
};
</script>

<style scoped>
.master-container {
  padding-top: 20px;
  padding-bottom: 60px;
}
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.page-title {
  font-size: 1.8rem;
  margin-bottom: 4px;
}
.page-subtitle {
  font-size: 0.95rem;
  color: var(--color-grey-300);
}

/* Base Utility Classes */
.margin-top-lg { margin-top: 40px; }
.margin-bottom-md { margin-bottom: 20px; }
.margin-bottom-lg { margin-bottom: 30px; }
.gold-text { color: var(--color-gold-500); }
.text-success { color: var(--color-success-500); }
.text-danger { color: var(--color-error-500); }
.text-muted { color: var(--color-grey-400); }

/* Typography */
.section-title-bar { margin-bottom: 20px; }
.section-title { font-size: 1.4rem; margin-bottom: 2px; }
.section-subtitle { font-size: 0.88rem; color: var(--color-grey-300); }
.card-title { font-size: 1.2rem; color: var(--color-gold-500); margin-bottom: 4px; }
.card-subtitle { font-size: 0.85rem; color: var(--color-grey-300); }

/* Pulse Indicator */
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-success-500);
  display: inline-block;
  animation: pulse 1.5s infinite;
  margin-right: 6px;
}
@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

/* Stats Grid Re-use */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.stat-label {
  font-size: 0.85rem;
  color: var(--color-grey-300);
  font-family: var(--font-family-heading);
}
.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-50);
  margin-bottom: 6px;
}
.stat-footer { font-size: 0.8rem; }

/* Settings Grid Layout */
.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* Form Styles & Left-Fixated Icons */
.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.input-icon-left {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gold-500);
  pointer-events: none;
  z-index: 2;
}
.custom-select, .custom-input-field {
  width: 100%;
  height: 48px;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-800);
  border-radius: 8px;
  color: var(--color-grey-100);
  padding: 0 16px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.custom-select.has-icon, .custom-input-field.has-icon {
  padding-left: 44px;
}
.custom-select:focus, .custom-input-field:focus {
  outline: none;
  border-color: var(--color-gold-500);
  box-shadow: 0 0 0 3px rgba(243, 198, 73, 0.15);
}
.custom-select option {
  background-color: var(--color-surface-500);
  color: var(--color-grey-100);
}
.input-label {
  display: block;
  font-family: var(--font-family-heading);
  font-size: 0.9rem;
  color: var(--color-gold-500);
  margin-bottom: 6px;
  text-transform: capitalize;
}
.help-text {
  display: block;
  font-size: 0.8rem;
  color: var(--color-grey-400);
  margin-top: 6px;
}
.btn-primary-action {
  width: 100%;
  height: 48px;
  background-color: var(--color-gold-500);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.btn-primary-action:hover {
  background-color: var(--color-gold-400);
}

/* Reverse Copying Special Box */
.reverse-copy-box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-800);
  padding: 20px;
  border-radius: 8px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
.reverse-copy-box.is-active {
  background-color: var(--color-success-900);
  border-color: var(--color-success-500);
}
.toggle-info h4 {
  font-size: 1rem;
  color: var(--color-grey-50);
  margin: 0 0 8px 0;
}
.toggle-info p {
  font-size: 0.85rem;
  color: var(--color-grey-300);
  margin: 0;
  line-height: 1.5;
  max-width: 90%;
}

/* CSS Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  flex-shrink: 0;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--color-surface-300);
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: var(--color-grey-50);
  transition: .4s;
}
input:checked + .slider {
  background-color: var(--color-success-500);
}
input:checked + .slider:before {
  transform: translateX(24px);
}
.slider.round {
  border-radius: 24px;
}
.slider.round:before {
  border-radius: 50%;
}

/* Responsive adjustments */
@media (max-width: 1100px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .stats-grid, .settings-grid { grid-template-columns: 1fr; }
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
