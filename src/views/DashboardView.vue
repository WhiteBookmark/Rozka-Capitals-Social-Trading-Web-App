<template>
  <div class="dashboard-container container">
    <!-- Dashboard Top Greeting Header -->
    <div class="dashboard-header card">
      <div class="header-left">
        <h1 class="page-title">Social Trading Dashboard</h1>
        <p class="page-subtitle">
          Welcome back, <strong class="gold-text">{{ authStore.userName }}</strong>! Your social copy portfolio is active.
        </p>
      </div>
      <div class="header-right">
        <span class="badge badge-success">
          <span class="pulse-dot"></span> System Live & Connected
        </span>
      </div>
    </div>

    <!-- Account Summary Stats Grid -->
    <div class="stats-grid">
      <!-- Balance Card -->
      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Total Balance</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
        </div>
        <div class="stat-value">${{ formatCurrency(tradingStore.accountSummary.totalBalance) }}</div>
        <div class="stat-footer text-muted">Available for allocation</div>
      </div>

      <!-- Equity Card -->
      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Account Equity</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
        </div>
        <div class="stat-value gold-text">${{ formatCurrency(tradingStore.accountSummary.equity) }}</div>
        <div class="stat-footer text-success">Floating unrealized PnL included</div>
      </div>

      <!-- Total Profit / Loss -->
      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Total Profit / Loss</span>
          <div class="icon-circle icon-circle-sm badge-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </div>
        </div>
        <div class="stat-value text-success">+${{ formatCurrency(tradingStore.accountSummary.totalProfitLoss) }}</div>
        <div class="stat-footer text-success">+{{ tradingStore.accountSummary.profitPercentage }}% All-Time Return</div>
      </div>

      <!-- Copied Traders Count -->
      <div class="stat-card card">
        <div class="stat-header">
          <span class="stat-label">Copied Traders</span>
          <div class="icon-circle icon-circle-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
        <div class="stat-value">{{ tradingStore.accountSummary.copiedTradersCount }} Masters</div>
        <div class="stat-footer text-muted">Win Rate: {{ tradingStore.accountSummary.winRate }}%</div>
      </div>
    </div>

    <!-- Master Traders Section Header -->
    <div class="section-title-bar">
      <div class="title-group">
        <h2 class="section-title">Featured Master Traders</h2>
        <p class="section-subtitle">Select and copy institutional strategies in real-time</p>
      </div>
    </div>

    <!-- Master Traders Directory Grid -->
    <div class="traders-grid">
      <div v-for="trader in tradingStore.masterTraders" :key="trader.id" class="trader-card card">
        <!-- Card Header: Avatar & Info -->
        <div class="trader-card-header">
          <img :src="trader.avatar" :alt="trader.name" class="trader-avatar" />
          <div class="trader-meta">
            <h3 class="trader-name">{{ trader.name }}</h3>
            <span class="trader-strategy-title">{{ trader.title }}</span>
          </div>
          <span v-if="trader.isCopied" class="badge badge-success copy-status-badge">Copied</span>
        </div>

        <!-- Strategy Description -->
        <p class="trader-description">{{ trader.strategy }}</p>

        <!-- Performance Stats -->
        <div class="trader-stats-row">
          <div class="mini-stat">
            <span class="mini-label">30D ROI</span>
            <span class="mini-value text-success">+{{ trader.roi30d }}%</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Win Rate</span>
            <span class="mini-value text-gold">{{ trader.winRate }}%</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Copiers</span>
            <span class="mini-value">{{ trader.copiers }}</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Risk Level</span>
            <span class="mini-value" :class="getRiskColor(trader.riskScore)">{{ trader.riskScore }}/5</span>
          </div>
        </div>

        <!-- Allocation Status if Copied -->
        <div v-if="trader.isCopied" class="copied-info-box">
          <div class="info-row">
            <span>Allocated Investment:</span>
            <strong>${{ formatCurrency(trader.copiedAmount) }}</strong>
          </div>
          <div class="info-row">
            <span>Current Floating PnL:</span>
            <strong :class="trader.currentPnl >= 0 ? 'text-success' : 'text-danger'">
              {{ trader.currentPnl >= 0 ? '+' : '' }}${{ formatCurrency(trader.currentPnl) }}
            </strong>
          </div>
        </div>

        <!-- Action Button -->
        <div class="trader-card-footer">
          <button
            v-if="!trader.isCopied"
            class="btn-copy"
            @click="openCopyModal(trader)"
          >
            Copy Strategy
          </button>
          <button
            v-else
            class="btn-stop-copy"
            @click="confirmStopCopying(trader)"
          >
            Stop Copying
          </button>
        </div>
      </div>
    </div>

    <!-- Active Copy Trades Table -->
    <div class="section-title-bar margin-top-lg">
      <div class="title-group">
        <h2 class="section-title">Active Copied Positions</h2>
        <p class="section-subtitle">Real-time open orders executed by your master traders</p>
      </div>
    </div>

    <div class="table-card card">
      <div class="table-responsive">
        <table class="positions-table">
          <thead>
            <tr>
              <th>Master Trader</th>
              <th>Symbol</th>
              <th>Order Type</th>
              <th>Volume (Lots)</th>
              <th>Open Price</th>
              <th>Current Price</th>
              <th>Profit / Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pos in tradingStore.activePositions" :key="pos.id">
              <td class="trader-name-cell">
                <span class="gold-text">{{ pos.trader }}</span>
              </td>
              <td><strong>{{ pos.symbol }}</strong></td>
              <td>
                <span class="badge" :class="pos.type === 'BUY' ? 'badge-success' : 'badge-danger'">
                  {{ pos.type }}
                </span>
              </td>
              <td>{{ pos.volume }}</td>
              <td>${{ pos.openPrice }}</td>
              <td>${{ pos.currentPrice }}</td>
              <td>
                <strong :class="pos.pnl >= 0 ? 'text-success' : 'text-danger'">
                  {{ pos.pnl >= 0 ? '+' : '' }}${{ formatCurrency(pos.pnl) }}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Copy Investment Allocation Modal -->
    <CustomModal
      :isOpen="isCopyModalOpen"
      title="Start Copying Strategy"
      confirmText="Start Copying Now"
      cancelText="Cancel"
      type="success"
      @close="isCopyModalOpen = false"
      @confirm="executeStartCopy"
    >
      <div v-if="selectedTrader" class="modal-copy-content">
        <div class="trader-summary">
          <img :src="selectedTrader.avatar" :alt="selectedTrader.name" class="modal-avatar" />
          <div>
            <h4>{{ selectedTrader.name }}</h4>
            <span class="text-muted">{{ selectedTrader.title }}</span>
          </div>
        </div>

        <div class="copy-input-group margin-top-md">
          <label for="copy-amount" class="input-label">
            Investment Amount (USD) *
          </label>
          <input
            id="copy-amount"
            type="number"
            v-model="copyInvestmentAmount"
            :min="selectedTrader.minInvestment"
            step="100"
            class="modal-number-input"
          />
          <span class="help-text">Minimum allocation for this trader is ${{ selectedTrader.minInvestment }}.</span>
        </div>
      </div>
    </CustomModal>

    <!-- Stop Copy Confirmation Custom Popup (Semantic Red Alert) -->
    <CustomModal
      :isOpen="isStopModalOpen"
      title="Stop Copying Trader?"
      confirmText="Yes, Stop Copying"
      cancelText="Keep Copying"
      type="danger"
      @close="isStopModalOpen = false"
      @confirm="executeStopCopy"
    >
      <p v-if="selectedTrader">
        Are you sure you want to stop copying <strong>{{ selectedTrader.name }}</strong>?
        All open positions copied from this trader will be closed immediately, and your remaining funds will return to your balance.
      </p>
    </CustomModal>

    <!-- Toast Notification -->
    <GlobalToast
      v-if="toastMessage"
      :message="toastMessage"
      :type="toastType"
      @dismiss="toastMessage = ''"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useTradingStore } from '../stores/tradingStore';
import CustomModal from '../components/CustomModal.vue';
import GlobalToast from '../components/GlobalToast.vue';

const authStore = useAuthStore();
const tradingStore = useTradingStore();

const isCopyModalOpen = ref(false);
const isStopModalOpen = ref(false);
const selectedTrader = ref(null);
const copyInvestmentAmount = ref(1000);

const toastMessage = ref('');
const toastType = ref('success');

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '0.00';
  return Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getRiskColor = (score) => {
  if (score <= 2) return 'text-success';
  if (score <= 3) return 'text-gold';
  return 'text-danger';
};

const openCopyModal = (trader) => {
  selectedTrader.value = trader;
  copyInvestmentAmount.value = trader.minInvestment || 500;
  isCopyModalOpen.value = true;
};

const confirmStopCopying = (trader) => {
  selectedTrader.value = trader;
  isStopModalOpen.value = true;
};

const executeStartCopy = () => {
  if (!selectedTrader.value) return;
  const res = tradingStore.startCopying(selectedTrader.value.id, copyInvestmentAmount.value);
  
  if (res.success) {
    toastMessage.value = res.message;
    toastType.value = 'success';
    isCopyModalOpen.value = false;
  } else {
    toastMessage.value = res.error;
    toastType.value = 'error';
  }
};

const executeStopCopy = () => {
  if (!selectedTrader.value) return;
  const res = tradingStore.stopCopying(selectedTrader.value.id);

  if (res.success) {
    toastMessage.value = res.message;
    toastType.value = 'info';
    isStopModalOpen.value = false;
  } else {
    toastMessage.value = res.error;
    toastType.value = 'error';
  }
};
</script>

<style scoped>
.dashboard-container {
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

.gold-text {
  color: var(--color-gold-500);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-success-500);
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 36px;
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

.stat-footer {
  font-size: 0.8rem;
}

.text-success {
  color: var(--color-success-500);
}

.text-danger {
  color: var(--color-error-500);
}

.text-gold {
  color: var(--color-gold-500);
}

.text-muted {
  color: var(--color-grey-400);
}

/* Section Title */
.section-title-bar {
  margin-bottom: 20px;
}

.margin-top-lg {
  margin-top: 40px;
}

.section-title {
  font-size: 1.4rem;
  margin-bottom: 2px;
}

.section-subtitle {
  font-size: 0.88rem;
  color: var(--color-grey-300);
}

/* Traders Grid */
.traders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.trader-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.trader-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  position: relative;
}

.trader-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-500);
}

.trader-meta {
  display: flex;
  flex-direction: column;
}

.trader-name {
  font-size: 1.1rem;
  margin: 0;
  color: var(--color-gold-500);
}

.trader-strategy-title {
  font-size: 0.78rem;
  color: var(--color-grey-300);
}

.copy-status-badge {
  position: absolute;
  top: 0;
  right: 0;
}

.trader-description {
  font-size: 0.88rem;
  color: var(--color-grey-200);
  line-height: 1.5;
  margin-bottom: 16px;
  min-height: 42px;
}

.trader-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  background-color: var(--color-surface-400);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 16px;
  text-align: center;
}

.mini-stat {
  display: flex;
  flex-direction: column;
}

.mini-label {
  font-size: 0.7rem;
  color: var(--color-grey-400);
}

.mini-value {
  font-size: 0.95rem;
  font-weight: 700;
}

.copied-info-box {
  background-color: rgba(229, 181, 103, 0.08);
  border: 1px dashed var(--color-gold-600);
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.85rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.trader-card-footer {
  margin-top: auto;
}

.btn-copy {
  width: 100%;
  height: 42px;
  background-color: var(--color-gold-500);
  color: var(--color-background);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.btn-copy:hover {
  background-color: var(--color-gold-400);
}

.btn-stop-copy {
  width: 100%;
  height: 42px;
  background-color: transparent;
  color: var(--color-error-500);
  border: 1px solid var(--color-error-500);
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.btn-stop-copy:hover {
  background-color: rgba(246, 70, 93, 0.1);
}

/* Positions Table */
.table-card {
  padding: 0;
  overflow: hidden;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.positions-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.92rem;
}

.positions-table th {
  background-color: var(--color-surface-400);
  color: var(--color-gold-500);
  font-family: var(--font-family-heading);
  padding: 14px 18px;
  border-bottom: 1px solid rgba(229, 181, 103, 0.15);
}

.positions-table td {
  padding: 14px 18px;
  border-bottom: 1px solid rgba(229, 181, 103, 0.08);
}

.positions-table tr:hover {
  background-color: rgba(229, 181, 103, 0.03);
}

/* Modal Content */
.modal-copy-content {
  display: flex;
  flex-direction: column;
}

.trader-summary {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.modal-number-input {
  width: 100%;
  height: 44px;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-500);
  border-radius: 8px;
  color: #fff;
  padding: 0 14px;
  font-size: 1.1rem;
  margin-top: 6px;
}

.help-text {
  font-size: 0.8rem;
  color: var(--color-grey-400);
  margin-top: 4px;
  display: block;
}

/* Responsive Breakpoints */
@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .traders-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .traders-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
