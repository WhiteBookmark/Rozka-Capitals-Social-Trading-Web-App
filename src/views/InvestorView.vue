<template>
  <div class="investor-container container">
    <!-- Page Header -->
    <div class="dashboard-header card">
      <div class="header-left">
        <h1 class="page-title">Investor Center</h1>
        <p class="page-subtitle">Discover top master traders, configure smart allocation models, and track transparent real-time performance.</p>
      </div>
    </div>

    <!-- The Leaderboard (Discovery) Filters -->
    <div class="section-title-bar margin-top-lg">
      <div class="title-group">
        <h2 class="section-title">The Leaderboard</h2>
        <p class="section-subtitle">Filter the marketplace by your specific investment criteria</p>
      </div>
    </div>
    
    <div class="filters-card card margin-bottom-lg">
      <div class="filters-grid">
        <!-- Filter: Risk Tolerance -->
        <div class="filter-group">
          <label for="filter-risk" class="input-label">Risk Tolerance</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <select id="filter-risk" v-model="filters.risk" class="custom-select has-icon">
              <option value="all">All Risk Levels</option>
              <option value="low">Conservative (1-2)</option>
              <option value="medium">Moderate (3)</option>
              <option value="high">Aggressive (4-5)</option>
            </select>
          </div>
        </div>

        <!-- Filter: Asset Class Focus -->
        <div class="filter-group">
          <label for="filter-asset" class="input-label">Asset Class Focus</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <select id="filter-asset" v-model="filters.assetClass" class="custom-select has-icon">
              <option value="all">All Asset Classes</option>
              <option value="FX">Forex</option>
              <option value="Crypto">Cryptocurrency</option>
              <option value="Commodities">Commodities</option>
              <option value="Indices">Indices</option>
            </select>
          </div>
        </div>

        <!-- Filter: Min 30-Day ROI (%) -->
        <div class="filter-group">
          <label for="filter-min-roi" class="input-label">Min 30-Day ROI (%)</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            <input
              id="filter-min-roi"
              type="number"
              min="0"
              max="1000"
              step="1"
              v-model="filters.minRoi"
              placeholder="e.g., 10"
              class="custom-input-field has-icon"
            />
          </div>
        </div>

        <!-- Filter: Max Historical Drawdown (%) -->
        <div class="filter-group">
          <label for="filter-max-dd" class="input-label">Max Historical Drawdown (%)</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
              <polyline points="17 18 23 18 23 12"/>
            </svg>
            <input
              id="filter-max-dd"
              type="number"
              min="0"
              max="100"
              step="0.1"
              v-model="filters.maxDrawdown"
              placeholder="e.g., 15"
              class="custom-input-field has-icon"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Master Traders Directory Grid -->
    <div class="traders-grid">
      <div v-for="trader in filteredMasters" :key="trader.id" class="trader-card card">
        <div class="trader-card-header">
          <img :src="trader.avatar" :alt="trader.name" class="trader-avatar" />
          <div class="trader-meta">
            <h3 class="trader-name">{{ trader.name }}</h3>
            <span class="trader-strategy-title">{{ trader.assetClass }} | {{ trader.title }}</span>
          </div>
        </div>
        <p class="trader-description">{{ trader.strategy }}</p>
        
        <div class="trader-stats-row">
          <div class="mini-stat">
            <span class="mini-label">30D ROI</span>
            <span class="mini-value text-success">+{{ trader.roi30d }}%</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Max DD</span>
            <span class="mini-value text-danger">{{ trader.maxDrawdown }}%</span>
          </div>
          <div class="mini-stat">
            <span class="mini-label">Risk Level</span>
            <span class="mini-value text-gold">{{ trader.riskScore }}/5</span>
          </div>
        </div>
        
        <div class="trader-card-footer">
          <button class="btn-copy" @click="openSubscribeModal(trader)">Configure Subscription</button>
        </div>
      </div>
      
      <div v-if="filteredMasters.length === 0" class="no-results">
        <p>No master traders found matching your criteria. Adjust your filters to see more results.</p>
      </div>
    </div>

    <!-- Transparent Portfolio Tracking -->
    <div class="section-title-bar margin-top-lg">
      <div class="title-group">
        <h2 class="section-title">Transparent Portfolio Tracking</h2>
        <p class="section-subtitle">Monitor and manually manage real positions executed by your subscribed masters</p>
      </div>
    </div>
    
    <div class="table-card card">
      <div class="table-responsive">
        <table class="positions-table">
          <thead>
            <tr>
              <th>Master Trader</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Volume (Lots)</th>
              <th>Open Price</th>
              <th>Current Price</th>
              <th>Profit / Loss</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pos in activePositions" :key="pos.id">
              <td class="trader-name-cell"><span class="gold-text">{{ pos.trader }}</span></td>
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
                  {{ pos.pnl >= 0 ? '+' : '' }}${{ pos.pnl.toFixed(2) }}
                </strong>
              </td>
              <td>
                <button class="btn-stop-copy btn-small" @click="manualCloseTrade(pos.id)">Close Early</button>
              </td>
            </tr>
            <tr v-if="activePositions.length === 0">
              <td colspan="8" class="text-center text-muted" style="padding: 20px;">No active copied positions.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Subscription & Risk Controls Modal -->
    <CustomModal
      :isOpen="isSubscribeModalOpen"
      :title="`Subscribe to ${selectedTrader?.name || 'Master'}`"
      confirmText="Activate Subscription"
      cancelText="Cancel"
      type="primary"
      @close="isSubscribeModalOpen = false"
      @confirm="executeSubscription"
    >
      <div v-if="selectedTrader" class="modal-copy-content">
        <!-- Flexible Allocation Models -->
        <div class="form-group margin-bottom-md">
          <label for="sub-model" class="input-label">Allocation Model *</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
            <select id="sub-model" v-model="subscriptionConfig.allocationModel" class="custom-select has-icon">
              <option value="proportional">Proportional to Equity (Auto-Scaling)</option>
              <option value="fixed">Fixed Lot / Multiplier</option>
            </select>
          </div>
        </div>
        
        <div class="form-group margin-bottom-md" v-if="subscriptionConfig.allocationModel === 'fixed'">
          <label for="sub-multiplier" class="input-label">Lot Multiplier *</label>
          <div class="input-icon-wrapper">
            <svg class="input-icon-left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
            <input
              id="sub-multiplier"
              type="number"
              step="0.1"
              min="0.01"
              max="100"
              v-model="subscriptionConfig.multiplier"
              class="custom-input-field has-icon"
              placeholder="e.g. 0.5x"
            />
          </div>
          <span class="help-text">Executes trades at {{ subscriptionConfig.multiplier }}x the volume of the master's trade.</span>
        </div>

        <!-- Granular Risk Controls -->
        <h4 class="risk-controls-title margin-top-md">Granular Risk Controls</h4>
        <p class="help-text margin-bottom-md">The system will automatically disconnect you if these thresholds are breached.</p>
        
        <div class="form-row-grid">
          <div class="form-group">
            <label for="sub-max-loss" class="input-label text-danger">Maximum Loss ($) *</label>
            <div class="input-icon-wrapper">
              <svg class="input-icon-left text-danger" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <input
                id="sub-max-loss"
                type="number"
                min="1"
                max="1000000"
                step="1"
                v-model="subscriptionConfig.maxLoss"
                class="custom-input-field has-icon border-danger"
                placeholder="e.g. 500"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="sub-tp" class="input-label text-success">Take Profit ($) *</label>
            <div class="input-icon-wrapper">
              <svg class="input-icon-left text-success" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              <input
                id="sub-tp"
                type="number"
                min="1"
                max="1000000"
                step="1"
                v-model="subscriptionConfig.takeProfit"
                class="custom-input-field has-icon border-success"
                placeholder="e.g. 1500"
              />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>

    <!-- Global Toast Notifications -->
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
 * InvestorView Component
 * Dedicated center for investors featuring leaderboard discovery with filters,
 * flexible allocation models (proportional & fixed lot/multiplier),
 * granular risk controls (max loss & take profit), and transparent portfolio tracking.
 */
import { ref, computed } from 'vue';
import CustomModal from '../components/CustomModal.vue';
import GlobalToast from '../components/GlobalToast.vue';

// Local State
const isSubscribeModalOpen = ref(false);
const selectedTrader = ref(null);
const toastMessage = ref('');
const toastType = ref('success');

// Filtering State
const filters = ref({
  risk: 'all',
  assetClass: 'all',
  minRoi: null,
  maxDrawdown: null
});

// Subscription Config State
const subscriptionConfig = ref({
  allocationModel: 'proportional',
  multiplier: 1.0,
  maxLoss: 500,
  takeProfit: 2000
});

// Mock Master Traders Data
const masters = ref([
  {
    id: 'm1',
    name: 'Elena Rostova',
    title: 'Algorithmic Gold & FX Strategy',
    assetClass: 'FX',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    roi30d: 38.4,
    maxDrawdown: 12.5,
    riskScore: 3,
    strategy: 'Low risk scalping on XAUUSD & EURUSD with automated stop losses.'
  },
  {
    id: 'm2',
    name: 'Marcus Vance',
    title: 'Macro Crypto & Nasdaq Momentum',
    assetClass: 'Crypto',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    roi30d: 64.2,
    maxDrawdown: 22.1,
    riskScore: 5,
    strategy: 'High-frequency momentum trading across US Tech stocks and BTC.'
  },
  {
    id: 'm3',
    name: 'Sophie Lin',
    title: 'Conservative Energy Arbitrage',
    assetClass: 'Commodities',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    roi30d: 19.8,
    maxDrawdown: 4.2,
    riskScore: 2,
    strategy: 'Capital preservation focus trading Brent Crude & Natural Gas spreads.'
  },
  {
    id: 'm4',
    name: 'Viktor Krum',
    title: 'Indices Breakdown Hunter',
    assetClass: 'Indices',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    roi30d: 45.1,
    maxDrawdown: 18.0,
    riskScore: 4,
    strategy: 'Breakout swing trading DAX40 and S&P500 index futures.'
  }
]);

// Transparent Active Positions Mock Data
const activePositions = ref([
  { id: 'pos_1', symbol: 'XAUUSD', type: 'BUY', volume: '1.50', openPrice: '2385.40', currentPrice: '2398.20', pnl: 1920.00, trader: 'Elena Rostova' },
  { id: 'pos_2', symbol: 'BTCUSD', type: 'BUY', volume: '0.25', openPrice: '64200.00', currentPrice: '66800.00', pnl: 650.00, trader: 'Marcus Vance' },
  { id: 'pos_3', symbol: 'USOIL', type: 'SELL', volume: '2.00', openPrice: '78.50', currentPrice: '77.20', pnl: 260.00, trader: 'Sophie Lin' }
]);

// Computed Filters for Leaderboard
const filteredMasters = computed(() => {
  return masters.value.filter(trader => {
    if (!trader) return false;

    // Risk Match
    const matchRisk = filters.value.risk === 'all' ||
      (filters.value.risk === 'low' && trader.riskScore <= 2) ||
      (filters.value.risk === 'medium' && trader.riskScore === 3) ||
      (filters.value.risk === 'high' && trader.riskScore >= 4);

    // Asset Class Match
    const matchAsset = filters.value.assetClass === 'all' || trader.assetClass === filters.value.assetClass;

    // ROI & Drawdown Match with input sanitization and boundary validation
    const minRoiNum = filters.value.minRoi !== null && filters.value.minRoi !== '' ? Number(filters.value.minRoi) : null;
    const maxDdNum = filters.value.maxDrawdown !== null && filters.value.maxDrawdown !== '' ? Number(filters.value.maxDrawdown) : null;

    const matchRoi = minRoiNum === null || isNaN(minRoiNum) || trader.roi30d >= minRoiNum;
    const matchDd = maxDdNum === null || isNaN(maxDdNum) || trader.maxDrawdown <= maxDdNum;

    return matchRisk && matchAsset && matchRoi && matchDd;
  });
});

// Methods
const openSubscribeModal = (trader) => {
  if (!trader) return;
  selectedTrader.value = trader;
  isSubscribeModalOpen.value = true;
};

const executeSubscription = () => {
  if (!selectedTrader.value) return;
  const traderName = selectedTrader.value.name;
  toastMessage.value = `Successfully subscribed to ${traderName} with advanced risk controls enabled.`;
  toastType.value = 'success';
  isSubscribeModalOpen.value = false;
};

const manualCloseTrade = (id) => {
  if (!id) return;
  activePositions.value = activePositions.value.filter(pos => pos.id !== id);
  toastMessage.value = 'Position manually closed. Exited early.';
  toastType.value = 'info';
};
</script>

<style scoped>
.investor-container {
  padding-top: 20px;
  padding-bottom: 60px;
}
.dashboard-header {
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

/* Specific Forms & Input Wrappers with Left Icons */
.filters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
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
.form-row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.border-danger { border-color: var(--color-error-700); }
.border-success { border-color: var(--color-success-700); }
.help-text {
  display: block;
  font-size: 0.8rem;
  color: var(--color-grey-400);
  margin-top: 4px;
}
.input-label {
  display: block;
  font-family: var(--font-family-heading);
  font-size: 0.9rem;
  color: var(--color-gold-500);
  margin-bottom: 6px;
  text-transform: capitalize;
}
.margin-top-md { margin-top: 20px; }
.margin-bottom-md { margin-bottom: 20px; }
.margin-top-lg { margin-top: 40px; }
.margin-bottom-lg { margin-bottom: 30px; }
.risk-controls-title {
  font-size: 1.1rem;
  color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-gold-800);
  padding-bottom: 8px;
  margin-bottom: 8px;
}

/* Grids & Cards */
.traders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.trader-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.trader-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.trader-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-500);
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
.trader-description {
  font-size: 0.88rem;
  color: var(--color-grey-200);
  line-height: 1.5;
  margin-bottom: 16px;
  min-height: 42px;
}
.trader-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.text-success { color: var(--color-success-500); }
.text-danger { color: var(--color-error-500); }
.text-gold { color: var(--color-gold-500); }
.gold-text { color: var(--color-gold-500); }
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background-color: var(--color-surface-500);
  border: 1px dashed var(--color-gold-800);
  border-radius: 12px;
  color: var(--color-grey-300);
}

/* Buttons */
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
  background-color: transparent;
  color: var(--color-error-500);
  border: 1px solid var(--color-error-500);
  border-radius: 6px;
  font-weight: 700;
  transition: background-color 0.3s ease;
}
.btn-stop-copy:hover {
  background-color: rgba(246, 70, 93, 0.1);
}
.btn-small {
  padding: 6px 12px;
  font-size: 0.8rem;
}

/* Tables */
.section-title-bar { margin-bottom: 20px; }
.section-title { font-size: 1.4rem; margin-bottom: 2px; }
.section-subtitle { font-size: 0.88rem; color: var(--color-grey-300); }
.table-card { padding: 0; overflow: hidden; }
.table-responsive { width: 100%; overflow-x: auto; }
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
  border-bottom: 1px solid var(--color-gold-800);
}
.positions-table td {
  padding: 14px 18px;
  border-bottom: 1px solid rgba(229, 181, 103, 0.08);
}
.positions-table tr:hover { background-color: rgba(229, 181, 103, 0.03); }

/* Responsive adjustments */
@media (max-width: 1100px) {
  .filters-grid { grid-template-columns: repeat(2, 1fr); }
  .traders-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .filters-grid, .traders-grid, .form-row-grid { grid-template-columns: 1fr; }
}
</style>
