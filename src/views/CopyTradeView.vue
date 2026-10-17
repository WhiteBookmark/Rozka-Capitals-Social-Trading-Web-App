<template>
  <div class="copy-trade-page">
    <!-- Top Sub-Header & Live Breadcrumb Bar -->
    <div class="sub-header-bar">
      <div class="container sub-header-content">
        <div class="breadcrumb-group">
          <router-link to="/" class="breadcrumb-item logo-link">Home</router-link>
          <span class="breadcrumb-separator">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
          <span class="breadcrumb-current">Copy Trade</span>
        </div>

        <!-- Right Quick Status / Portfolio Balance -->
        <div class="quick-status-group">
          <div class="balance-chip card-elevation-1">
            <span class="balance-label">Copy Wallet</span>
            <strong class="balance-amount">${{ formatCurrency(tradingStore.accountSummary.totalBalance) }}</strong>
          </div>
          <div class="status-indicator-chip card-elevation-1">
            <span class="live-dot-pulse"></span>
            <span class="status-text">Institutional Feed Active</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container main-content-container">
      <!-- Sub-Navigation Tabs Bar (Leaderboard, Copy Masters, My Copies, Become A Master, Community) -->
      <nav class="sub-nav-tabs" aria-label="Copy Trade Navigation Tabs">
        <button
          v-for="tab in navigationTabs"
          :key="tab.id"
          type="button"
          class="tab-btn"
          :class="{ 'is-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon" v-html="tab.icon"></span>
          <span>{{ tab.label }}</span>
          <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
        </button>
      </nav>

      <!-- ===================================================================
           TAB 1: LEADERBOARD VIEW (Exact match to provided screenshots)
           =================================================================== -->
      <section v-if="activeTab === 'leaderboard'" class="tab-content-section" aria-labelledby="leaderboard-heading">
        <!-- Section Header with Live Badge -->
        <div class="leaderboard-header-row">
          <div class="title-with-badge">
            <h1 id="leaderboard-heading" class="page-title">Leaderboard</h1>
            <span class="live-badge">
              <span class="live-dot-pulse"></span>
              Live
            </span>
          </div>
          <p class="section-tagline">
            Real-time performance rankings of verified Rozka Capitals copy accounts, institutional metrics, and verified master allocations.
          </p>
        </div>

        <!-- 4 Top KPI Cards Grid -->
        <div class="kpi-metrics-grid">
          <div class="kpi-card card">
            <span class="kpi-label">Total Traders</span>
            <div class="kpi-value">{{ formatNumber(tradingStore.leaderboardSummary.totalTraders) }}</div>
            <span class="kpi-footer-note">Verified Global Network</span>
          </div>

          <div class="kpi-card card">
            <span class="kpi-label">30 Day Copy Volume</span>
            <div class="kpi-value gold-highlight">{{ formatNumber(tradingStore.leaderboardSummary.copyVolume30d) }} Lots</div>
            <span class="kpi-footer-note">Institutional Execution</span>
          </div>

          <div class="kpi-card card">
            <span class="kpi-label">Online Now</span>
            <div class="kpi-value text-success">
              <span class="online-indicator"></span>
              {{ tradingStore.leaderboardSummary.onlineNow }}
            </div>
            <span class="kpi-footer-note">Real-Time Copiers Active</span>
          </div>

          <div class="kpi-card card">
            <span class="kpi-label">Total Copies</span>
            <div class="kpi-value">{{ formatNumber(tradingStore.leaderboardSummary.totalCopies) }}</div>
            <span class="kpi-footer-note">Active Subscribed Portfolios</span>
          </div>
        </div>

        <!-- Live Real-Time Trade Stream Ticker (Continuous Marquee) -->
        <div class="live-ticker-marquee card" aria-label="Real-time Copier Trade Stream">
          <div class="marquee-track">
            <div
              v-for="(trade, idx) in duplicatedStream"
              :key="idx"
              class="ticker-item"
            >
              <div class="avatar-circle-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span class="ticker-user">{{ trade.maskedCopier }}</span>
              <span class="ticker-symbol">{{ trade.symbol }}</span>
              <span class="ticker-profit">+${{ formatCurrency(trade.profit) }}</span>
            </div>
          </div>
        </div>

        <!-- Dual Big Feature Cards: Copiers Realised & Top Master This Month -->
        <div class="dual-feature-grid">
          <!-- Left Big Card: Copiers Realised, Last 30 Days -->
          <div class="feature-card-left card">
            <div class="feature-card-header">
              <h2 class="feature-title">Copiers Realised, Last 30 Days</h2>
              <div class="giant-profit-number">+${{ formatCurrency(tradingStore.leaderboardSummary.copiersRealised30d) }}</div>
              <p class="feature-subtitle">
                Closed profit and loss on copied trades over the last 30 days, across the copiers on the board.
              </p>
            </div>

            <!-- 4 Sub-Metrics Grid -->
            <div class="feature-sub-grid">
              <div class="sub-metric-item">
                <span class="sub-metric-label">Ranked Accounts Profitable</span>
                <span class="sub-metric-value text-success">{{ tradingStore.leaderboardSummary.rankedAccountsProfitable }}%</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-metric-label">New Copiers Today</span>
                <span class="sub-metric-value">{{ tradingStore.leaderboardSummary.newCopiersToday }}</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-metric-label">Started Copying, Last Hour</span>
                <span class="sub-metric-value">{{ tradingStore.leaderboardSummary.startedCopyingLastHour }}</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-metric-label">Volume Traded, 24h</span>
                <span class="sub-metric-value">{{ tradingStore.leaderboardSummary.volumeTraded24h }} Lots</span>
              </div>
            </div>

            <!-- Action Buttons & Live Indicator -->
            <div class="feature-actions-row">
              <button
                type="button"
                class="btn-primary-action"
                @click="openStartCopyingModal"
              >
                Start Copying
              </button>
              <button
                type="button"
                class="btn-outline-action"
                @click="isRankingWorksModalOpen = true"
              >
                How Ranking Works
              </button>
              <div class="live-started-note">
                <span class="live-dot-pulse"></span>
                <span>{{ tradingStore.leaderboardSummary.lastCopierStarted }}</span>
              </div>
            </div>
          </div>

          <!-- Right Big Card: Top Master This Month -->
          <div class="feature-card-right card">
            <div class="top-master-header">
              <h2 class="feature-title">Top Master This Month</h2>
              <span class="badge badge-subtle">By Copiers' Results</span>
            </div>

            <div class="master-profile-block">
              <div class="master-monogram-circle">
                {{ tradingStore.topMasterMonth.monogram }}
              </div>
              <div class="master-meta-info">
                <h3 class="master-name">{{ tradingStore.topMasterMonth.name }}</h3>
                <span class="master-active-copiers">{{ tradingStore.topMasterMonth.activeCopiers }} Active Copiers</span>
              </div>
            </div>

            <div class="master-pnl-section">
              <span class="master-pnl-label">Copiers' Realised P&L, Last 30 Days</span>
              <div class="master-pnl-value text-success">+${{ formatCurrency(tradingStore.topMasterMonth.copiersRealised30d) }}</div>
            </div>

            <div class="master-action-footer">
              <button
                type="button"
                class="btn-primary-action full-width"
                @click="openCopyModalForTrader(tradingStore.topMasterMonth)"
              >
                Copy Master
              </button>
              <span class="started-week-caption">{{ tradingStore.topMasterMonth.startedThisWeek }} Started Copying This Week</span>
            </div>
          </div>
        </div>

        <!-- ===================================================================
             CONQUEST CAMPAIGN: COPY, QUALIFY AND WIN THE CAR
             =================================================================== -->
        <div class="raffle-campaign-section">
          <div class="raffle-headline-wrapper">
            <h2 class="raffle-stylized-title">COPY, QUALIFY AND WIN THE CAR</h2>
            <p class="raffle-subtitle">
              Qualify by achieving copy trading volume missions with Rozka Capitals master traders to enter the exclusive luxury vehicle draw.
            </p>
          </div>

          <!-- 3 Luxury Vehicle Cards -->
          <div class="raffle-cars-grid">
            <div
              v-for="car in tradingStore.raffleCampaign.cars"
              :key="car.id"
              class="car-prize-card card"
            >
              <div class="car-image-container">
                <img :src="car.image" :alt="car.name" class="car-photo" loading="lazy" />
                <div class="car-mission-badge badge">
                  {{ car.mission }}
                </div>
              </div>
              <div class="car-card-content">
                <h3 class="car-name">{{ car.name }}</h3>
                <p class="car-specs-text">{{ car.specs }}</p>
                <div class="car-status-row">
                  <span class="draw-label">Scheduled Draw: <strong>{{ car.drawDate }}</strong></span>
                  <span v-if="tradingStore.raffleCampaign.userLotsTraded >= car.targetLots" class="badge badge-success">
                    Qualified
                  </span>
                  <span v-else class="badge badge-warning">
                    {{ (car.targetLots - tradingStore.raffleCampaign.userLotsTraded).toFixed(1) }} Lots Needed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Raffle Action Buttons -->
          <div class="raffle-buttons-row">
            <button
              type="button"
              class="btn-primary-action raffle-btn"
              @click="isRaffleModalOpen = true"
            >
              Enter The Raffle
            </button>
            <button
              type="button"
              class="btn-outline-action raffle-btn"
              @click="isHowItWorksModalOpen = true"
            >
              How It Works
            </button>
          </div>
        </div>

        <!-- ===================================================================
             COPIER LEADERBOARD PODIUM (Top 3)
             =================================================================== -->
        <div class="podium-section">
          <h2 class="podium-section-title">COPIER LEADERBOARD</h2>
          <p class="podium-subtitle">Leading community copiers ranked by verified 7-day audited returns.</p>

          <div class="podium-grid">
            <!-- Rank 2 Card (Left) -->
            <div class="podium-card podium-card-rank-2 card">
              <div class="podium-rank-badge rank-2-badge">2</div>
              <div class="podium-avatar-wrapper">
                <div class="podium-avatar-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
              <div class="podium-user-id">{{ tradingStore.podiumCopiers[0].maskedId }}</div>
              <div class="podium-master-copied">Copies {{ tradingStore.podiumCopiers[0].masterCopied }}</div>
              <div class="podium-pnl-number text-success">+${{ formatCurrency(tradingStore.podiumCopiers[0].pnl) }}</div>
              <div class="podium-return-tag badge">{{ tradingStore.podiumCopiers[0].return7d }} · {{ tradingStore.podiumCopiers[0].days }}</div>
            </div>

            <!-- Rank 1 Card (Center - Elevated Champion Card) -->
            <div class="podium-card podium-card-rank-1 card">
              <div class="champion-crown-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>
                Champion
              </div>
              <div class="podium-rank-badge rank-1-badge">1</div>
              <div class="podium-avatar-wrapper rank-1-avatar">
                <div class="podium-avatar-circle rank-1-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
              <div class="podium-user-id champion-name">{{ tradingStore.podiumCopiers[1].maskedId }}</div>
              <div class="podium-master-copied">Copies {{ tradingStore.podiumCopiers[1].masterCopied }}</div>
              <div class="podium-pnl-number champion-pnl text-success">+${{ formatCurrency(tradingStore.podiumCopiers[1].pnl) }}</div>
              <div class="podium-return-tag badge badge-success">{{ tradingStore.podiumCopiers[1].return7d }} · {{ tradingStore.podiumCopiers[1].days }}</div>
            </div>

            <!-- Rank 3 Card (Right) -->
            <div class="podium-card podium-card-rank-3 card">
              <div class="podium-rank-badge rank-3-badge">3</div>
              <div class="podium-avatar-wrapper">
                <div class="podium-avatar-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
              <div class="podium-user-id">{{ tradingStore.podiumCopiers[2].maskedId }}</div>
              <div class="podium-master-copied">Copies {{ tradingStore.podiumCopiers[2].masterCopied }}</div>
              <div class="podium-pnl-number text-success">+${{ formatCurrency(tradingStore.podiumCopiers[2].pnl) }}</div>
              <div class="podium-return-tag badge">{{ tradingStore.podiumCopiers[2].return7d }} · {{ tradingStore.podiumCopiers[2].days }}</div>
            </div>
          </div>
        </div>

        <!-- ===================================================================
             DETAILED COPIER PERFORMANCE TABLE
             =================================================================== -->
        <div class="leaderboard-table-card card">
          <!-- Table Search & Filter Toolbar -->
          <div class="table-toolbar">
            <div class="search-input-box">
              <span class="search-icon-inside">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                ref="tableSearchInput"
                type="text"
                v-model="searchQuery"
                placeholder="Search Copier ID Or Master Trader..."
                class="table-search-field"
                autofocus
              />
            </div>

            <!-- Single Row Selectable Chips (< 5 items) per user rules -->
            <div class="filter-chips-row" role="radiogroup" aria-label="Copier Table Filter">
              <button
                v-for="chip in filterChips"
                :key="chip.id"
                type="button"
                class="chip-filter"
                :class="{ 'is-selected': selectedFilterChip === chip.id }"
                @click="selectedFilterChip = chip.id"
              >
                {{ chip.label }}
              </button>
            </div>
          </div>

          <!-- Responsive Table Container -->
          <div class="table-responsive-wrapper">
            <table class="copier-table">
              <thead>
                <tr>
                  <th scope="col" class="th-copier">Copier</th>
                  <th scope="col" class="th-return">Return 7D</th>
                  <th scope="col" class="th-pnl">P&L</th>
                  <th scope="col" class="th-equity">Equity Curve</th>
                  <th scope="col" class="th-master">Master Portfolio</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="copier in paginatedCopiers"
                  :key="copier.id"
                  class="table-row-item"
                >
                  <!-- Copier Column: Avatar, Masked ID, Drawdown, Trades count -->
                  <td class="td-copier">
                    <div class="copier-cell-group">
                      <div class="copier-avatar-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                      <div class="copier-id-stack">
                        <strong class="copier-masked-id">{{ copier.maskedId }}</strong>
                        <span class="copier-stats-line">
                          Drawdown {{ copier.drawdown }}% · {{ copier.tradesCount }} Trades
                        </span>
                      </div>
                    </div>
                  </td>

                  <!-- Return 7D Column -->
                  <td class="td-return">
                    <span class="return-percentage-tag text-success">
                      +{{ copier.return7d }}%
                    </span>
                  </td>

                  <!-- P&L Column -->
                  <td class="td-pnl">
                    <strong class="pnl-amount text-success">
                      +${{ formatCurrency(copier.pnl) }}
                    </strong>
                  </td>

                  <!-- Equity Sparkline SVG Column -->
                  <td class="td-equity">
                    <div class="sparkline-wrapper" :title="'Equity Performance Curve'">
                      <svg class="sparkline-svg" viewBox="0 0 120 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient :id="'sparkGrad_' + copier.id" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="hsl(156, 87%, 43%)" stop-opacity="0.3" />
                            <stop offset="100%" stop-color="hsl(156, 87%, 43%)" stop-opacity="0.0" />
                          </linearGradient>
                        </defs>
                        <!-- Sparkline Area Fill -->
                        <polygon
                          :points="generateAreaPoints(copier.equityTrend)"
                          :fill="'url(#sparkGrad_' + copier.id + ')'"
                        />
                        <!-- Sparkline Line -->
                        <polyline
                          :points="generateLinePoints(copier.equityTrend)"
                          fill="none"
                          stroke="hsl(156, 87%, 43%)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </td>

                  <!-- Master Trader Column with Copy Button -->
                  <td class="td-master">
                    <div class="master-action-cell">
                      <button
                        type="button"
                        class="btn-copy-master-pill"
                        @click="openCopyModalByName(copier.masterName)"
                      >
                        Copy Master
                      </button>
                      <span class="master-name-sub">{{ copier.masterName }}</span>
                    </div>
                  </td>
                </tr>

                <tr v-if="filteredCopiers.length === 0">
                  <td colspan="5" class="empty-state-cell">
                    <div class="empty-state-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <p>No verified copiers found matching "{{ searchQuery }}"</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Table Footer Info & Pagination Controls (Matching screenshots) -->
          <div class="table-footer-bar">
            <div class="table-info-left">
              <span class="footer-highlight-note">
                7 Days · Winners, Flat And Losing Copiers On Every Page · {{ totalCopiersCount }} Copiers
                <button
                  type="button"
                  class="info-tooltip-btn icon-link"
                  @click="isRankingWorksModalOpen = true"
                  title="Drawdown Explanation"
                >
                  <span class="info-badge-circle">i</span>
                </button>
              </span>
              <span class="range-status-text">
                {{ paginationRangeText }} Of {{ totalCopiersCount }} Copiers
              </span>
              <span class="fairness-caption">
                Losses Are Shown With The Same Weight As Wins.
              </span>
            </div>

            <!-- Pagination Buttons -->
            <div class="pagination-controls">
              <button
                type="button"
                class="pagination-btn"
                :disabled="currentPage === 1"
                @click="currentPage > 1 && currentPage--"
              >
                &lt; Prev
              </button>
              <span class="pagination-page-indicator">
                Page {{ currentPage }} Of {{ totalPages }}
              </span>
              <button
                type="button"
                class="pagination-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage < totalPages && currentPage++"
              >
                Next &gt;
              </button>
            </div>
          </div>

          <!-- Conquest Footnote Disclaimer -->
          <div class="conquest-disclaimer">
            Never Trade Solely To Qualify For A Prize. Full Conquest Terms Apply.
          </div>
        </div>
      </section>

      <!-- ===================================================================
           TAB 2: COPY MASTERS DIRECTORY
           =================================================================== -->
      <section v-else-if="activeTab === 'masters'" class="tab-content-section" aria-labelledby="masters-heading">
        <div class="section-title-bar">
          <h2 id="masters-heading" class="section-title">Institutional Master Traders</h2>
          <p class="section-subtitle">
            Audited strategies with verified track records, institutional risk management, and automatic proportional execution.
          </p>
        </div>

        <div class="masters-catalog-grid">
          <div
            v-for="master in tradingStore.masterTraders"
            :key="master.id"
            class="master-catalog-card card"
          >
            <div class="catalog-card-header">
              <img :src="master.avatar" :alt="master.name" class="catalog-avatar" />
              <div class="catalog-meta">
                <h3 class="catalog-name">{{ master.name }}</h3>
                <span class="catalog-strategy-title">{{ master.title }}</span>
              </div>
              <span v-if="master.isCopied" class="badge badge-success">Copied</span>
            </div>

            <p class="catalog-strategy-desc">{{ master.strategy }}</p>

            <div class="catalog-stats-row">
              <div class="mini-stat">
                <span class="mini-stat-label">30D ROI</span>
                <span class="mini-stat-value text-success">+{{ master.roi30d }}%</span>
              </div>
              <div class="mini-stat">
                <span class="mini-stat-label">Win Rate</span>
                <span class="mini-stat-value">{{ master.winRate }}%</span>
              </div>
              <div class="mini-stat">
                <span class="mini-stat-label">Copiers</span>
                <span class="mini-stat-value">{{ formatNumber(master.copiers) }}</span>
              </div>
              <div class="mini-stat">
                <span class="mini-stat-label">Risk Tier</span>
                <span class="mini-stat-value gold-highlight">{{ master.riskScore }}/5</span>
              </div>
            </div>

            <div class="catalog-actions-footer">
              <button
                v-if="!master.isCopied"
                type="button"
                class="btn-primary-action full-width"
                @click="openCopyModalForTrader(master)"
              >
                Copy Master
              </button>
              <button
                v-else
                type="button"
                class="btn-stop-copy full-width"
                @click="handleStopCopying(master.id)"
              >
                Stop Copying
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           TAB 3: MY COPIES PORTFOLIO
           =================================================================== -->
      <section v-else-if="activeTab === 'my_copies'" class="tab-content-section" aria-labelledby="my-copies-heading">
        <div class="section-title-bar">
          <h2 id="my-copies-heading" class="section-title">My Active Copied Portfolios</h2>
          <p class="section-subtitle">
            Manage your capital allocations, real-time mirrored positions, and risk control parameters.
          </p>
        </div>

        <div v-if="tradingStore.copiedTraders.length > 0" class="my-copies-grid">
          <div
            v-for="copied in tradingStore.copiedTraders"
            :key="copied.id"
            class="my-copy-card card"
          >
            <div class="my-copy-header">
              <img :src="copied.avatar" :alt="copied.name" class="my-copy-avatar" />
              <div>
                <h3 class="my-copy-name">{{ copied.name }}</h3>
                <span class="my-copy-title">{{ copied.title }}</span>
              </div>
              <span class="badge badge-success">Active Mirror</span>
            </div>

            <div class="my-copy-stats-grid">
              <div class="sub-metric-item">
                <span class="sub-metric-label">Allocated Capital</span>
                <span class="sub-metric-value">${{ formatCurrency(copied.copiedAmount) }}</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-metric-label">Current P&L</span>
                <span class="sub-metric-value" :class="copied.currentPnl >= 0 ? 'text-success' : 'text-danger'">
                  {{ copied.currentPnl >= 0 ? '+' : '' }}${{ formatCurrency(copied.currentPnl) }}
                </span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-metric-label">30D Master ROI</span>
                <span class="sub-metric-value text-success">+{{ copied.roi30d }}%</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-metric-label">Win Rate</span>
                <span class="sub-metric-value">{{ copied.winRate }}%</span>
              </div>
            </div>

            <div class="my-copy-actions">
              <button
                type="button"
                class="btn-stop-copy full-width"
                @click="handleStopCopying(copied.id)"
              >
                Stop Copying
              </button>
            </div>
          </div>
        </div>

        <div v-else class="empty-state-card card">
          <div class="empty-state-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <h3>No Master Portfolios Currently Copied</h3>
            <p>Select any verified master trader from the Leaderboard or Masters catalog to begin automated institutional copying.</p>
            <button type="button" class="btn-primary-action" @click="activeTab = 'leaderboard'">
              Explore Leaderboard
            </button>
          </div>
        </div>
      </section>

      <!-- ===================================================================
           TAB 4: BECOME A MASTER APPLICATION
           =================================================================== -->
      <section v-else-if="activeTab === 'become_master'" class="tab-content-section" aria-labelledby="become-heading">
        <div class="section-title-bar">
          <h2 id="become-heading" class="section-title">Become A Rozka Master Trader</h2>
          <p class="section-subtitle">
            Monetize your trading edge. Earn up to 30% performance fees on all follower profits with zero hosting setup.
          </p>
        </div>

        <!-- Create Operation Card with 'X' Close icon taking user back per rule -->
        <div class="become-master-card card">
          <div class="card-create-header">
            <div class="create-title-stack">
              <h3 class="create-card-title">Master Trader Application</h3>
              <span class="create-card-subtitle">Fill in your trading credentials to request master verification</span>
            </div>
            <!-- X icon on top right taking user back per user rules -->
            <button
              type="button"
              class="card-close-x icon-link"
              @click="activeTab = 'leaderboard'"
              title="Return To Leaderboard"
              aria-label="Return To Leaderboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <form @submit.prevent="submitMasterApplication" class="application-form">
            <!-- Full Name (sanitized with validators) -->
            <CustomInput
              id="masterApplicantName"
              v-model="masterForm.applicantName"
              label="Full Legal Name"
              placeholder="e.g. Alexander Vance"
              required
              :error="formErrors.applicantName"
              autofocus
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </template>
            </CustomInput>

            <!-- Strategy Name -->
            <CustomInput
              id="masterStrategyName"
              v-model="masterForm.strategyName"
              label="Strategy Name"
              placeholder="e.g. Dynamic FX Volatility Breakout"
              required
              :error="formErrors.strategyName"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </template>
            </CustomInput>

            <!-- Minimum Recommended Follower Deposit ($) -->
            <CustomInput
              id="masterMinDeposit"
              v-model="masterForm.minDeposit"
              type="number"
              min="100"
              max="50000"
              step="50"
              label="Minimum Recommended Follower Deposit (USD)"
              placeholder="e.g. 500"
              required
              :error="formErrors.minDeposit"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </template>
            </CustomInput>

            <!-- Strategy Overview -->
            <div class="textarea-group">
              <label for="masterStrategyDesc" class="input-label">
                Strategy Methodology & Risk Rules
                <span class="required-star">*</span>
              </label>
              <textarea
                id="masterStrategyDesc"
                v-model="masterForm.description"
                rows="4"
                placeholder="Describe your asset universe, average holding duration, stop-loss strategy, and max historical drawdown..."
                class="custom-textarea-field"
                required
              ></textarea>
            </div>

            <!-- Single Row Selectable Chips (< 5 items) for Performance Fee Selection -->
            <div class="chips-selector-group">
              <label class="input-label">Requested Performance Fee Rate</label>
              <div class="chips-row" role="radiogroup" aria-label="Performance Fee Options">
                <button
                  v-for="rate in feeOptions"
                  :key="rate"
                  type="button"
                  class="chip-option"
                  :class="{ 'is-selected': masterForm.performanceFee === rate }"
                  @click="masterForm.performanceFee = rate"
                >
                  {{ rate }}% Profit Share
                </button>
              </div>
            </div>

            <!-- Submit Button (No Cancel button per user rules) -->
            <div class="form-submit-row">
              <button
                type="submit"
                class="btn-primary-action submit-btn"
                :disabled="isSubmittingApplication"
              >
                <span v-if="isSubmittingApplication" class="spinner-icon"></span>
                <span>{{ isSubmittingApplication ? 'Submitting Application...' : 'Submit Application For Audit' }}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- ===================================================================
           TAB 5: COMMUNITY FEED
           =================================================================== -->
      <section v-else-if="activeTab === 'community'" class="tab-content-section" aria-labelledby="community-heading">
        <div class="section-title-bar">
          <h2 id="community-heading" class="section-title">Rozka Social Trading Community</h2>
          <p class="section-subtitle">
            Connect with copiers worldwide, discuss trade setups, and track community market sentiment in real time.
          </p>
        </div>

        <div class="community-grid">
          <!-- Community Discussion Posts -->
          <div class="community-posts-column">
            <div
              v-for="post in communityPosts"
              :key="post.id"
              class="community-post-card card"
            >
              <div class="post-header">
                <div class="post-author-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div class="post-author-meta">
                  <strong class="post-author-name">{{ post.author }}</strong>
                  <span class="post-timestamp">{{ post.time }}</span>
                </div>
                <span class="badge badge-subtle">{{ post.tag }}</span>
              </div>
              <p class="post-body-text">{{ post.content }}</p>
              <div class="post-footer">
                <span class="post-stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                  {{ post.likes }} Likes
                </span>
                <span class="post-stat-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  {{ post.replies }} Replies
                </span>
              </div>
            </div>
          </div>

          <!-- Community Sentiment & Rules Column -->
          <div class="community-sidebar-column">
            <div class="sentiment-widget card">
              <h3 class="widget-title">Copier Sentiment (24h)</h3>
              <p class="widget-desc">Real-time aggregate direction across all copied open orders.</p>
              
              <div class="sentiment-meter-bar">
                <div class="meter-segment segment-bullish" style="width: 74%"></div>
                <div class="meter-segment segment-bearish" style="width: 26%"></div>
              </div>

              <div class="sentiment-labels-row">
                <span class="text-success"><strong>74%</strong> Long / Bullish</span>
                <span class="text-danger"><strong>26%</strong> Short / Bearish</span>
              </div>
            </div>

            <div class="rules-widget card">
              <h3 class="widget-title">Community Code</h3>
              <ul class="community-rules-list">
                <li>Respect verified master track records and fair audits.</li>
                <li>No spam or unsolicited trading bot promotion.</li>
                <li>Share risk-management observations transparently.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ===================================================================
         MODAL 1: COPY MASTER ALLOCATION MODAL (No Cancel button per rules)
         =================================================================== -->
    <CustomModal
      :is-open="isCopyModalOpen"
      :title="'Allocate Capital to Copy ' + (targetTrader?.name || 'Master Trader')"
      type="primary"
      confirm-text="Confirm & Start Mirroring"
      @close="isCopyModalOpen = false"
      @confirm="executeCopyAction"
    >
      <div v-if="targetTrader" class="modal-copy-content">
        <div class="modal-trader-summary">
          <img :src="targetTrader.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'" :alt="targetTrader.name" class="modal-trader-avatar" />
          <div>
            <h4 class="modal-trader-title">{{ targetTrader.name }}</h4>
            <span class="modal-trader-sub">{{ targetTrader.title || targetTrader.category }}</span>
          </div>
        </div>

        <!-- Copy Amount Input with autofocus -->
        <CustomInput
          id="copyAllocationAmount"
          v-model="copyAllocationAmount"
          type="number"
          :min="targetTrader.minInvestment || 100"
          :max="tradingStore.accountSummary.totalBalance"
          step="50"
          label="Investment Amount (USD)"
          placeholder="e.g. 1000"
          required
          autofocus
          :error="copyModalError"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </template>
        </CustomInput>

        <p class="modal-wallet-balance">
          Available Wallet Balance: <strong>${{ formatCurrency(tradingStore.accountSummary.totalBalance) }}</strong>
        </p>

        <!-- Selectable Stop-Loss Chips (< 5 items) -->
        <div class="chips-selector-group">
          <label class="input-label">Max Drawdown Protection Level</label>
          <div class="chips-row" role="radiogroup" aria-label="Max Drawdown Stop Level">
            <button
              v-for="level in [5, 10, 15, 20]"
              :key="level"
              type="button"
              class="chip-option"
              :class="{ 'is-selected': selectedDrawdownStop === level }"
              @click="selectedDrawdownStop = level"
            >
              {{ level }}% Max Loss
            </button>
          </div>
        </div>
      </div>
    </CustomModal>

    <!-- ===================================================================
         MODAL 2: ENTER THE RAFFLE MODAL (No Cancel button)
         =================================================================== -->
    <CustomModal
      :is-open="isRaffleModalOpen"
      title="Conquest Luxury Car Raffle"
      type="primary"
      confirm-text="Claim Raffle Entry"
      @close="isRaffleModalOpen = false"
      @confirm="executeRaffleEntry"
    >
      <div class="modal-raffle-content">
        <p class="raffle-info-intro">
          You currently have <strong>{{ tradingStore.raffleCampaign.userLotsTraded }} Lots</strong> of qualified copy volume and <strong>{{ tradingStore.raffleCampaign.userTickets }} Active Tickets</strong>.
        </p>

        <div class="raffle-car-select-list">
          <div
            v-for="car in tradingStore.raffleCampaign.cars"
            :key="car.id"
            class="raffle-car-select-item"
            :class="{ 'is-selected': selectedRaffleCarId === car.id }"
            @click="selectedRaffleCarId = car.id"
          >
            <img :src="car.image" :alt="car.name" class="raffle-car-thumb" />
            <div class="raffle-car-meta">
              <strong>{{ car.name }}</strong>
              <span>Required: {{ car.mission }}</span>
            </div>
            <span v-if="tradingStore.raffleCampaign.userLotsTraded >= car.targetLots" class="badge badge-success">
              Eligible
            </span>
            <span v-else class="badge badge-warning">
              Locked
            </span>
          </div>
        </div>
      </div>
    </CustomModal>

    <!-- ===================================================================
         MODAL 3: HOW RANKING WORKS (Methodology)
         =================================================================== -->
    <CustomModal
      :is-open="isRankingWorksModalOpen"
      title="Audited Copier Ranking Methodology"
      type="primary"
      confirm-text="Acknowledge & Close"
      @close="isRankingWorksModalOpen = false"
      @confirm="isRankingWorksModalOpen = false"
    >
      <div class="ranking-modal-body">
        <p>Rozka Capitals ranks copiers using our proprietary institutional formula ensuring full transparency:</p>
        <ul class="methodology-points">
          <li><strong>7-Day Return:</strong> Compound realized percentage gain achieved across all closed positions over the preceding 7 trading days.</li>
          <li><strong>Drawdown Equal Weight:</strong> Losses and drawdowns are calculated with identical mathematical weight as profits to prevent martingale strategies from masquerading as top performers.</li>
          <li><strong>Lot & Slippage Normalization:</strong> Returns are calculated net of commissions and spreads across all copiers on each page.</li>
        </ul>
      </div>
    </CustomModal>

    <!-- ===================================================================
         MODAL 4: HOW THE CONQUEST RAFFLE WORKS
         =================================================================== -->
    <CustomModal
      :is-open="isHowItWorksModalOpen"
      title="Conquest Campaign Regulations"
      type="primary"
      confirm-text="Understood"
      @close="isHowItWorksModalOpen = false"
      @confirm="isHowItWorksModalOpen = false"
    >
      <div class="ranking-modal-body">
        <p>Participation in the Rozka Capitals Luxury Conquest Raffle is straightforward:</p>
        <ul class="methodology-points">
          <li><strong>1. Copy Any Master:</strong> Allocate capital to any verified master trader on Rozka Capitals.</li>
          <li><strong>2. Complete Volume Missions:</strong> Every qualifying lot mirrored automatically counts toward unlocking vehicle tiers.</li>
          <li><strong>3. Claim Entry Tickets:</strong> As missions are completed (1 lot for Brabus G63, 4 lots for Rolls-Royce Cullinan, 9 lots for Ferrari SF90), tickets are minted to your profile.</li>
          <li><strong>4. Institutional Delivery:</strong> Winners receive the vehicle delivered directly or can choose a cash equivalent credit.</li>
        </ul>
      </div>
    </CustomModal>

    <!-- Global Floating Toast Notification -->
    <GlobalToast
      v-if="toastMessage"
      :message="toastMessage"
      :type="toastType"
      @dismiss="toastMessage = ''"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useTradingStore } from '../stores/tradingStore';
import CustomInput from '../components/CustomInput.vue';
import CustomModal from '../components/CustomModal.vue';
import GlobalToast from '../components/GlobalToast.vue';
import { sanitizeName } from '../utils/validators';

const tradingStore = useTradingStore();

// --- SUB-NAV TABS ---
const activeTab = ref('leaderboard');
const navigationTabs = [
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    badge: 'Live',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    id: 'masters',
    label: 'Copy Masters',
    badge: null,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
  {
    id: 'my_copies',
    label: 'My Copies',
    badge: computed(() => tradingStore.copiedTraders.length ? `${tradingStore.copiedTraders.length}` : null),
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  },
  {
    id: 'become_master',
    label: 'Become A Master',
    badge: 'Earn 30%',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  },
  {
    id: 'community',
    label: 'Community',
    badge: null,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  },
];

// --- LIVE TICKER MARQUEE REPEAT ---
const duplicatedStream = computed(() => {
  return [...tradingStore.liveTradeStream, ...tradingStore.liveTradeStream];
});

// --- TABLE CONTROLS & FILTERING ---
const tableSearchInput = ref(null);
const searchQuery = ref('');
const selectedFilterChip = ref('all');
const filterChips = [
  { id: 'all', label: 'All Copiers' },
  { id: 'profitable', label: 'Profitable Only' },
  { id: 'low_drawdown', label: 'Low Drawdown (<5%)' },
  { id: 'high_activity', label: 'High Activity (>50 Trades)' },
];

const currentPage = ref(1);
const itemsPerPage = 6;
const totalCopiersCount = 369; // As displayed in screenshots (369 copiers)

const filteredCopiers = computed(() => {
  let list = tradingStore.copierLeaderboard;

  // Search filter
  if (searchQuery.value && searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.maskedId.toLowerCase().includes(q) ||
        c.masterName.toLowerCase().includes(q)
    );
  }

  // Chip filter
  if (selectedFilterChip.value === 'profitable') {
    list = list.filter((c) => c.pnl > 0);
  } else if (selectedFilterChip.value === 'low_drawdown') {
    list = list.filter((c) => c.drawdown < 5.0);
  } else if (selectedFilterChip.value === 'high_activity') {
    list = list.filter((c) => c.tradesCount >= 50);
  }

  return list;
});

const totalPages = computed(() => 15); // Match screenshots "Page 1 of 15"

const paginatedCopiers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // If list is small, loop or display all filtered items
  if (filteredCopiers.value.length <= itemsPerPage) {
    return filteredCopiers.value;
  }
  return filteredCopiers.value.slice(start, end);
});

const paginationRangeText = computed(() => {
  const start = (currentPage.value - 1) * 25 + 1;
  const end = Math.min(start + 24, totalCopiersCount);
  return `${start}–${end}`;
});

// --- SPARKLINE GENERATORS ---
const generateLinePoints = (data) => {
  if (!data || data.length === 0) return '0,15 120,15';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = 120 / (data.length - 1);
  return data
    .map((val, i) => {
      const x = (i * stepX).toFixed(1);
      const y = (26 - ((val - min) / range) * 22).toFixed(1);
      return `${x},${y}`;
    })
    .join(' ');
};

const generateAreaPoints = (data) => {
  if (!data || data.length === 0) return '0,15 120,15 120,30 0,30';
  const line = generateLinePoints(data);
  return `0,30 ${line} 120,30`;
};

// --- MODALS & FORMS STATE ---
const isCopyModalOpen = ref(false);
const targetTrader = ref(null);
const copyAllocationAmount = ref(500);
const selectedDrawdownStop = ref(10);
const copyModalError = ref('');

const isRaffleModalOpen = ref(false);
const selectedRaffleCarId = ref('car_1');

const isRankingWorksModalOpen = ref(false);
const isHowItWorksModalOpen = ref(false);

const toastMessage = ref('');
const toastType = ref('success');

const showToast = (msg, type = 'success') => {
  toastMessage.value = msg;
  toastType.value = type;
  setTimeout(() => {
    if (toastMessage.value === msg) {
      toastMessage.value = '';
    }
  }, 4500);
};

// --- COPY TRADER ACTIONS ---
const openStartCopyingModal = () => {
  targetTrader.value = tradingStore.topMasterMonth;
  copyAllocationAmount.value = 500;
  copyModalError.value = '';
  isCopyModalOpen.value = true;
};

const openCopyModalForTrader = (trader) => {
  targetTrader.value = trader;
  copyAllocationAmount.value = trader.minInvestment || 500;
  copyModalError.value = '';
  isCopyModalOpen.value = true;
};

const openCopyModalByName = (masterName) => {
  const found = tradingStore.masterTraders.find(
    (m) => m.name.toLowerCase() === masterName.toLowerCase()
  );
  if (found) {
    openCopyModalForTrader(found);
  } else {
    targetTrader.value = {
      id: 'custom_' + masterName.toLowerCase().replace(/\s+/g, '_'),
      name: masterName,
      title: 'Institutional Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      minInvestment: 500,
    };
    copyAllocationAmount.value = 500;
    copyModalError.value = '';
    isCopyModalOpen.value = true;
  }
};

const executeCopyAction = () => {
  if (!targetTrader.value) return;
  const amount = Number(copyAllocationAmount.value);
  const min = targetTrader.value.minInvestment || 100;

  if (isNaN(amount) || amount < min) {
    copyModalError.value = `Minimum allocation amount is $${min}.`;
    return;
  }

  if (amount > tradingStore.accountSummary.totalBalance) {
    copyModalError.value = 'Insufficient wallet balance.';
    return;
  }

  const result = tradingStore.startCopying(targetTrader.value.id, amount);
  isCopyModalOpen.value = false;

  if (result.success) {
    showToast(result.message, 'success');
  } else {
    showToast(result.error, 'error');
  }
};

const handleStopCopying = (traderId) => {
  const result = tradingStore.stopCopying(traderId);
  if (result.success) {
    showToast(result.message, 'info');
  } else {
    showToast(result.error, 'error');
  }
};

const executeRaffleEntry = () => {
  const result = tradingStore.enterRaffle(selectedRaffleCarId.value);
  isRaffleModalOpen.value = false;
  if (result.success) {
    showToast(result.message, 'success');
  } else {
    showToast(result.error, 'error');
  }
};

// --- BECOME A MASTER APPLICATION FORM ---
const masterForm = ref({
  applicantName: '',
  strategyName: '',
  minDeposit: 500,
  description: '',
  performanceFee: 20,
});
const formErrors = ref({});
const feeOptions = [10, 15, 20, 25];
const isSubmittingApplication = ref(false);

const submitMasterApplication = () => {
  formErrors.value = {};

  // Sanitize name
  const cleanedName = sanitizeName(masterForm.value.applicantName);
  if (!cleanedName || cleanedName.length < 3) {
    formErrors.value.applicantName = 'Please enter a valid full legal name.';
    return;
  }
  masterForm.value.applicantName = cleanedName;

  if (!masterForm.value.strategyName || masterForm.value.strategyName.trim().length < 3) {
    formErrors.value.strategyName = 'Strategy name must be at least 3 characters.';
    return;
  }

  const deposit = Number(masterForm.value.minDeposit);
  if (isNaN(deposit) || deposit < 100) {
    formErrors.value.minDeposit = 'Minimum follower deposit must be at least $100.';
    return;
  }

  isSubmittingApplication.value = true;
  setTimeout(() => {
    isSubmittingApplication.value = false;
    showToast('Your master trader audit application has been submitted successfully!', 'success');
    activeTab.value = 'leaderboard';
    masterForm.value = {
      applicantName: '',
      strategyName: '',
      minDeposit: 500,
      description: '',
      performanceFee: 20,
    };
  }, 1200);
};

// --- COMMUNITY POSTS ---
const communityPosts = [
  {
    id: 1,
    author: '22****6121 (Champion #1)',
    time: '25m ago',
    tag: 'Execution Insights',
    content: 'Mirrored Alex Warren on the BTC break above 66k. Proportional auto-execution locked in +$3,215 with zero slippage. Best risk-adjusted return this quarter.',
    likes: 42,
    replies: 11,
  },
  {
    id: 2,
    author: '23****4497 (Rank #4)',
    time: '1h ago',
    tag: 'Macro FX',
    content: 'Oil & Majors is holding tight ranges on WTI crude during inventory releases. Drawdown remained well below 3.5%. Solid institutional discipline.',
    likes: 29,
    replies: 6,
  },
  {
    id: 3,
    author: '23****7741 (Rank #2)',
    time: '3h ago',
    tag: 'Conquest Mission',
    content: 'Just crossed 5.4 lots volume on my Crypto Swing mirror! Ticket minted for the Rolls-Royce Cullinan draw. Who else is aiming for the 9 lot SF90 mission?',
    likes: 58,
    replies: 19,
  },
];

// Formatting utilities
const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '0.00';
  return Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatNumber = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return Number(val).toLocaleString('en-US');
};

// Lifecycle
onMounted(() => {
  nextTick(() => {
    if (tableSearchInput.value) {
      tableSearchInput.value.focus();
    }
  });
});
</script>

<style scoped>
/* ==========================================================================
   COPY TRADE VIEW - Obsidian & Luxury Gold Brand Design System
   All colors use HSL tokens from theme.css
   ========================================================================== */

.copy-trade-page {
  width: 100%;
  min-height: calc(100vh - 80px);
  padding-bottom: 60px;
}

/* Sub-Header & Breadcrumb Bar */
.sub-header-bar {
  background-color: var(--color-surface-500);
  border-bottom: 1px solid var(--color-gold-alpha-15);
  padding: 14px 0;
  margin-bottom: 24px;
}

.sub-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.breadcrumb-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}

.breadcrumb-item {
  color: var(--color-grey-300);
}

.breadcrumb-item:hover {
  color: var(--color-gold-400);
}

.breadcrumb-separator {
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
}

.breadcrumb-current {
  color: var(--color-gold-500);
  font-weight: 600;
}

.quick-status-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.balance-chip {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-30);
  border-radius: 20px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
}

.balance-label {
  color: var(--color-grey-400);
  font-family: var(--font-family-heading);
}

.balance-amount {
  color: var(--color-gold-500);
  font-weight: 700;
}

.status-indicator-chip {
  background-color: var(--color-surface-400);
  border: 1px solid hsl(156 87% 43% / 0.3);
  border-radius: 20px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--color-success-100);
}

.live-dot-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-success-500);
  box-shadow: 0 0 8px var(--color-success-400);
  display: inline-block;
  animation: pulseAnimation 2s infinite ease-in-out;
}

@keyframes pulseAnimation {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

/* Sub-Navigation Tabs Bar */
.sub-nav-tabs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
}

.tab-btn {
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-15);
  color: var(--color-grey-200);
  border-radius: 24px;
  padding: 10px 20px;
  font-size: 0.92rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.25s ease;
}

.tab-btn:hover {
  background-color: var(--color-surface-400);
  color: var(--color-gold-400);
  border-color: var(--color-gold-alpha-55);
}

.tab-btn.is-active {
  background-color: var(--color-surface-300);
  color: var(--color-gold-500);
  border-color: var(--color-gold-500);
  box-shadow: var(--elevation-2);
}

.tab-icon {
  display: flex;
  align-items: center;
  color: inherit;
}

.tab-badge {
  background-color: var(--color-gold-500);
  color: var(--color-surface-900);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  line-height: 1.2;
}

/* Leaderboard Heading Area */
.leaderboard-header-row {
  margin-bottom: 24px;
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 14px;
}

.page-title {
  font-size: 2rem;
  color: var(--color-gold-500);
  margin-bottom: 4px;
}

.live-badge {
  background-color: var(--color-surface-400);
  border: 1px solid hsl(156 87% 43% / 0.4);
  color: var(--color-success-400);
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.section-tagline {
  color: var(--color-grey-300);
  font-size: 0.95rem;
  max-width: 800px;
}

/* 4 KPI Metrics Grid */
.kpi-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.kpi-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-gold-alpha-55);
}

.kpi-label {
  font-family: var(--font-family-heading);
  font-size: 0.88rem;
  color: var(--color-grey-300);
  text-transform: capitalize;
}

.kpi-value {
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--color-grey-50);
  font-family: var(--font-family-body);
  display: flex;
  align-items: center;
  gap: 8px;
}

.gold-highlight {
  color: var(--color-gold-500);
}

.online-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-success-500);
  box-shadow: 0 0 6px var(--color-success-400);
}

.kpi-footer-note {
  font-size: 0.78rem;
  color: var(--color-grey-400);
}

/* Live Marquee Ticker */
.live-ticker-marquee {
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
  padding: 12px 0;
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-15);
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 28px;
  width: max-content;
  animation: marqueeScroll 35s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  white-space: nowrap;
}

.avatar-circle-sm {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-surface-400);
  color: var(--color-gold-500);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gold-alpha-30);
}

.ticker-user {
  font-weight: 600;
  color: var(--color-grey-200);
}

.ticker-symbol {
  color: var(--color-gold-400);
  font-weight: 500;
}

.ticker-profit {
  color: var(--color-success-400);
  font-weight: 700;
}

/* Dual Big Feature Cards */
.dual-feature-grid {
  display: grid;
  grid-template-columns: 1.6fr 1.1fr;
  gap: 20px;
  margin-bottom: 34px;
}

.feature-card-left,
.feature-card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 12px;
  padding: 28px;
}

.feature-title {
  font-size: 1.35rem;
  color: var(--color-grey-100);
  margin-bottom: 8px;
}

.giant-profit-number {
  font-size: 2.75rem;
  font-weight: 900;
  color: var(--color-success-400);
  line-height: 1.1;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.feature-subtitle {
  color: var(--color-grey-300);
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 24px;
}

.feature-sub-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  padding: 16px 0;
  border-top: 1px solid var(--color-gold-alpha-08);
  border-bottom: 1px solid var(--color-gold-alpha-08);
  margin-bottom: 24px;
}

.sub-metric-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-metric-label {
  font-family: var(--font-family-heading);
  font-size: 0.78rem;
  color: var(--color-grey-300);
  line-height: 1.3;
}

.sub-metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-grey-100);
}

.feature-actions-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.btn-primary-action {
  background-color: var(--color-gold-500);
  color: var(--color-surface-900);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 700;
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.btn-primary-action:hover {
  background-color: var(--color-gold-400);
  transform: translateY(-1px);
}

.btn-outline-action {
  background-color: transparent;
  color: var(--color-gold-500);
  border: 1px solid var(--color-gold-500);
  border-radius: 8px;
  padding: 11px 22px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.25s ease;
}

.btn-outline-action:hover {
  background-color: var(--color-gold-alpha-08);
  color: var(--color-gold-400);
}

.live-started-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--color-grey-300);
  margin-left: auto;
}

/* Right Feature Card: Top Master This Month */
.top-master-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.badge-subtle {
  background-color: var(--color-surface-400);
  color: var(--color-gold-300);
  border: 1px solid var(--color-gold-alpha-30);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.78rem;
  font-weight: 600;
}

.master-profile-block {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.master-monogram-circle {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background-color: var(--color-surface-400);
  border: 2px solid var(--color-gold-500);
  color: var(--color-gold-500);
  font-size: 1.45rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-heading);
  box-shadow: var(--elevation-2);
}

.master-meta-info {
  display: flex;
  flex-direction: column;
}

.master-name {
  font-size: 1.35rem;
  color: var(--color-gold-500);
  margin: 0;
}

.master-active-copiers {
  font-size: 0.88rem;
  color: var(--color-grey-300);
}

.master-pnl-section {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 24px;
}

.master-pnl-label {
  display: block;
  font-family: var(--font-family-heading);
  font-size: 0.85rem;
  color: var(--color-grey-300);
  margin-bottom: 4px;
}

.master-pnl-value {
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.master-action-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.started-week-caption {
  font-size: 0.82rem;
  color: var(--color-grey-400);
}

/* ===================================================================
   CONQUEST CAMPAIGN (LUXURY CAR SHOWCASE)
   =================================================================== */
.raffle-campaign-section {
  margin-bottom: 44px;
  padding: 34px;
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-30);
  border-radius: 16px;
  box-shadow: var(--elevation-3);
  text-align: center;
}

.raffle-headline-wrapper {
  margin-bottom: 28px;
}

.raffle-stylized-title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--color-gold-500);
  text-transform: uppercase;
  font-family: var(--font-family-heading);
  text-shadow: 0 0 16px var(--color-gold-alpha-30);
  margin-bottom: 8px;
}

.raffle-subtitle {
  color: var(--color-grey-200);
  font-size: 0.98rem;
  max-width: 700px;
  margin: 0 auto;
}

.raffle-cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 30px;
  text-align: left;
}

.car-prize-card {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
  padding: 0;
}

.car-prize-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-gold-500);
  box-shadow: var(--elevation-4);
}

.car-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: var(--color-surface-600);
  overflow: hidden;
}

.car-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.car-prize-card:hover .car-photo {
  transform: scale(1.05);
}

.car-mission-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: var(--color-surface-500);
  color: var(--color-gold-400);
  border: 1px solid var(--color-gold-500);
  font-weight: 700;
}

.car-card-content {
  padding: 18px;
}

.car-name {
  font-size: 1.15rem;
  color: var(--color-gold-500);
  margin-bottom: 4px;
}

.car-specs-text {
  font-size: 0.85rem;
  color: var(--color-grey-300);
  margin-bottom: 14px;
}

.car-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-gold-alpha-08);
  padding-top: 12px;
  font-size: 0.82rem;
}

.draw-label {
  color: var(--color-grey-400);
}

.draw-label strong {
  color: var(--color-grey-200);
}

.raffle-buttons-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.raffle-btn {
  min-width: 180px;
}

/* ===================================================================
   COPIER LEADERBOARD PODIUM
   =================================================================== */
.podium-section {
  margin-bottom: 34px;
  text-align: center;
}

.podium-section-title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--color-gold-500);
  font-family: var(--font-family-heading);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.podium-subtitle {
  color: var(--color-grey-300);
  font-size: 0.95rem;
  margin-bottom: 28px;
}

.podium-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  align-items: flex-end;
  gap: 20px;
  max-width: 1050px;
  margin: 0 auto;
}

.podium-card {
  position: relative;
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 14px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.podium-card:hover {
  transform: translateY(-4px);
}

.podium-card-rank-1 {
  background-color: var(--color-surface-400);
  border: 2px solid var(--color-gold-500);
  box-shadow: var(--elevation-4);
  padding: 32px 20px;
  z-index: 2;
}

.champion-crown-tag {
  position: absolute;
  top: -14px;
  background-color: var(--color-gold-500);
  color: var(--color-surface-900);
  font-family: var(--font-family-heading);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  letter-spacing: 0.5px;
}

.podium-rank-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: 900;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border: 2px solid;
}

.rank-1-badge {
  width: 38px;
  height: 38px;
  background-color: var(--color-gold-500);
  color: var(--color-surface-900);
  border-color: var(--color-gold-300);
  font-size: 1.2rem;
}

.rank-2-badge {
  background-color: hsl(0, 0%, 75%);
  color: var(--color-surface-900);
  border-color: hsl(0, 0%, 90%);
}

.rank-3-badge {
  background-color: hsl(28, 70%, 55%);
  color: var(--color-surface-900);
  border-color: hsl(28, 80%, 70%);
}

.podium-avatar-wrapper {
  margin-bottom: 12px;
}

.podium-avatar-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-30);
  color: var(--color-gold-400);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-1-circle {
  width: 76px;
  height: 76px;
  background-color: var(--color-surface-300);
  border: 2px solid var(--color-gold-500);
  color: var(--color-gold-500);
}

.podium-user-id {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-grey-100);
  margin-bottom: 2px;
}

.champion-name {
  font-size: 1.35rem;
  color: var(--color-gold-500);
}

.podium-master-copied {
  font-size: 0.82rem;
  color: var(--color-grey-300);
  margin-bottom: 12px;
}

.podium-pnl-number {
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.champion-pnl {
  font-size: 2.1rem;
}

.podium-return-tag {
  font-size: 0.8rem;
  padding: 4px 10px;
}

/* ===================================================================
   DETAILED COPIER TABLE CARD
   =================================================================== */
.leaderboard-table-card {
  background-color: var(--color-surface-500);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 14px;
  padding: 0;
  overflow: hidden;
  box-shadow: var(--elevation-2);
}

.table-toolbar {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 1px solid var(--color-gold-alpha-08);
}

.search-input-box {
  position: relative;
  flex: 1;
  max-width: 380px;
  min-width: 260px;
}

.search-icon-inside {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gold-500);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.table-search-field {
  width: 100%;
  height: 44px;
  padding: 0 16px 0 44px;
  background-color: hsl(0 0% 100% / 0.05);
  border: 1px solid var(--color-gold-alpha-30);
  border-radius: 8px;
  color: hsl(0, 0%, 100%);
  font-size: 0.95rem;
  transition: all 0.25s ease;
}

.table-search-field:focus {
  outline: none;
  border-color: var(--color-gold-500);
  background-color: var(--color-gold-alpha-08);
  box-shadow: 0 0 0 3px var(--color-gold-alpha-15);
}

.table-search-field::placeholder {
  color: hsl(0 0% 100% / 0.4);
}

.filter-chips-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.chip-filter {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-15);
  color: var(--color-grey-200);
  border-radius: 18px;
  padding: 6px 14px;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.chip-filter:hover {
  border-color: var(--color-gold-alpha-55);
  color: var(--color-gold-400);
}

.chip-filter.is-selected {
  background-color: var(--color-surface-300);
  border-color: var(--color-gold-500);
  color: var(--color-gold-500);
  box-shadow: var(--elevation-1);
}

/* Responsive Table */
.table-responsive-wrapper {
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
}

.copier-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.copier-table thead tr {
  background-color: var(--color-surface-600);
  border-bottom: 1px solid var(--color-gold-alpha-15);
}

.copier-table th {
  padding: 16px 20px;
  font-family: var(--font-family-heading);
  font-size: 0.85rem;
  color: var(--color-grey-300);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
}

.copier-table tbody tr {
  border-bottom: 1px solid var(--color-gold-alpha-08);
  transition: background-color 0.2s ease;
}

.copier-table tbody tr:hover {
  background-color: hsl(44 89% 62% / 0.03);
}

.copier-table td {
  padding: 18px 20px;
  vertical-align: middle;
}

.copier-cell-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.copier-avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-30);
  color: var(--color-gold-500);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.copier-id-stack {
  display: flex;
  flex-direction: column;
}

.copier-masked-id {
  font-size: 1.05rem;
  color: var(--color-grey-100);
  font-family: var(--font-family-body);
}

.copier-stats-line {
  font-size: 0.8rem;
  color: var(--color-grey-400);
}

.return-percentage-tag {
  font-size: 1.15rem;
  font-weight: 700;
}

.pnl-amount {
  font-size: 1.15rem;
  font-weight: 700;
}

/* Sparkline SVG */
.sparkline-wrapper {
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
}

.sparkline-svg {
  width: 100%;
  height: 100%;
}

/* Master Column & Copy Pill Button */
.master-action-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.btn-copy-master-pill {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-500);
  color: var(--color-gold-500);
  border-radius: 16px;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-copy-master-pill:hover {
  background-color: var(--color-gold-500);
  color: var(--color-surface-900);
  transform: translateY(-1px);
}

.master-name-sub {
  font-size: 0.8rem;
  color: var(--color-grey-300);
}

.empty-state-cell {
  text-align: center;
  padding: 40px !important;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--color-grey-400);
}

/* Table Footer Bar */
.table-footer-bar {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  background-color: var(--color-surface-600);
  border-top: 1px solid var(--color-gold-alpha-08);
}

.table-info-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
}

.footer-highlight-note {
  color: var(--color-grey-200);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.info-tooltip-btn {
  background: none;
  border: none;
  padding: 0;
}

.info-badge-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-500);
  color: var(--color-gold-500);
  font-size: 0.72rem;
  font-weight: 800;
}

.range-status-text {
  color: var(--color-grey-400);
  font-size: 0.82rem;
}

.fairness-caption {
  color: var(--color-grey-400);
  font-size: 0.78rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-btn {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-30);
  color: var(--color-gold-500);
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--color-gold-500);
  color: var(--color-surface-900);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-page-indicator {
  font-size: 0.88rem;
  color: var(--color-grey-200);
  font-weight: 600;
}

.conquest-disclaimer {
  padding: 12px 20px;
  font-size: 0.76rem;
  color: var(--color-grey-400);
  border-top: 1px solid var(--color-gold-alpha-08);
  background-color: var(--color-surface-700);
}

/* ===================================================================
   TAB 2: MASTERS CATALOG STYLES
   =================================================================== */
.section-title-bar {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.8rem;
  color: var(--color-gold-500);
  margin-bottom: 6px;
}

.section-subtitle {
  color: var(--color-grey-300);
  font-size: 0.95rem;
  max-width: 800px;
}

.masters-catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.master-catalog-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.catalog-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.catalog-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-500);
}

.catalog-meta {
  flex: 1;
}

.catalog-name {
  font-size: 1.15rem;
  color: var(--color-grey-100);
  margin: 0;
}

.catalog-strategy-title {
  font-size: 0.78rem;
  color: var(--color-grey-300);
}

.catalog-strategy-desc {
  font-size: 0.88rem;
  color: var(--color-grey-300);
  line-height: 1.5;
  margin-bottom: 18px;
}

.catalog-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid var(--color-gold-alpha-08);
  border-bottom: 1px solid var(--color-gold-alpha-08);
  margin-bottom: 18px;
}

.mini-stat {
  display: flex;
  flex-direction: column;
}

.mini-stat-label {
  font-family: var(--font-family-heading);
  font-size: 0.72rem;
  color: var(--color-grey-400);
}

.mini-stat-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-grey-100);
}

.btn-stop-copy {
  background-color: var(--color-surface-400);
  color: var(--color-error-400);
  border: 1px solid var(--color-error-600);
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-stop-copy:hover {
  background-color: var(--color-error-900);
}

/* ===================================================================
   TAB 3: MY COPIES STYLES
   =================================================================== */
.my-copies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.my-copy-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.my-copy-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.my-copy-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold-500);
}

.my-copy-name {
  font-size: 1.15rem;
  color: var(--color-gold-500);
  margin: 0;
}

.my-copy-title {
  font-size: 0.78rem;
  color: var(--color-grey-300);
}

.my-copy-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid var(--color-gold-alpha-08);
  border-bottom: 1px solid var(--color-gold-alpha-08);
}

.empty-state-card {
  padding: 60px 20px;
  text-align: center;
}

/* ===================================================================
   TAB 4: BECOME A MASTER APPLICATION
   =================================================================== */
.become-master-card {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  padding: 32px;
}

.card-create-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-gold-alpha-15);
  padding-bottom: 16px;
}

.create-title-stack {
  display: flex;
  flex-direction: column;
}

.create-card-title {
  font-size: 1.45rem;
  color: var(--color-gold-500);
  margin: 0 0 4px 0;
}

.create-card-subtitle {
  font-size: 0.88rem;
  color: var(--color-grey-300);
}

.card-close-x {
  background: none;
  border: none;
  color: var(--color-grey-400);
  padding: 6px;
  border-radius: 6px;
}

.card-close-x:hover {
  color: var(--color-gold-500);
  background-color: var(--color-surface-400);
}

.textarea-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.custom-textarea-field {
  width: 100%;
  padding: 12px 16px;
  background-color: hsl(0 0% 100% / 0.05);
  border: 1px solid var(--color-gold-alpha-30);
  border-radius: 8px;
  color: hsl(0, 0%, 100%);
  font-family: var(--font-family-body);
  font-size: 0.95rem;
  resize: vertical;
}

.custom-textarea-field:focus {
  outline: none;
  border-color: var(--color-gold-500);
  background-color: var(--color-gold-alpha-08);
  box-shadow: 0 0 0 3px var(--color-gold-alpha-15);
}

.chips-selector-group {
  margin-bottom: 24px;
}

.chips-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.chip-option {
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-30);
  color: var(--color-grey-200);
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.chip-option:hover {
  border-color: var(--color-gold-500);
  color: var(--color-gold-400);
}

.chip-option.is-selected {
  background-color: var(--color-surface-300);
  border-color: var(--color-gold-500);
  color: var(--color-gold-500);
  box-shadow: var(--elevation-2);
}

.form-submit-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.spinner-icon {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-surface-900);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===================================================================
   TAB 5: COMMUNITY STYLES
   =================================================================== */
.community-grid {
  display: grid;
  grid-template-columns: 2fr 1.1fr;
  gap: 24px;
}

.community-posts-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.community-post-card {
  padding: 20px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.post-author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-500);
  color: var(--color-gold-500);
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-author-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-author-name {
  color: var(--color-grey-100);
  font-size: 0.95rem;
}

.post-timestamp {
  font-size: 0.78rem;
  color: var(--color-grey-400);
}

.post-body-text {
  font-size: 0.92rem;
  color: var(--color-grey-200);
  line-height: 1.5;
  margin-bottom: 14px;
}

.post-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.82rem;
  color: var(--color-grey-400);
  border-top: 1px solid var(--color-gold-alpha-08);
  padding-top: 10px;
}

.post-stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.community-sidebar-column {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.widget-title {
  font-size: 1.15rem;
  color: var(--color-gold-500);
  margin-bottom: 6px;
}

.widget-desc {
  font-size: 0.85rem;
  color: var(--color-grey-300);
  margin-bottom: 16px;
}

.sentiment-meter-bar {
  display: flex;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
}

.segment-bullish {
  background-color: var(--color-success-500);
}

.segment-bearish {
  background-color: var(--color-error-500);
}

.sentiment-labels-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.community-rules-list {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.88rem;
  color: var(--color-grey-300);
}

/* ===================================================================
   MODAL INTERIOR STYLING
   =================================================================== */
.modal-trader-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background-color: var(--color-surface-400);
  border-radius: 8px;
  margin-bottom: 18px;
}

.modal-trader-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-gold-500);
}

.modal-trader-title {
  font-size: 1.1rem;
  color: var(--color-gold-500);
  margin: 0;
}

.modal-trader-sub {
  font-size: 0.8rem;
  color: var(--color-grey-300);
}

.modal-wallet-balance {
  font-size: 0.85rem;
  color: var(--color-grey-300);
  margin-top: -10px;
  margin-bottom: 16px;
}

.modal-wallet-balance strong {
  color: var(--color-gold-500);
}

.raffle-info-intro {
  font-size: 0.95rem;
  color: var(--color-grey-200);
  margin-bottom: 18px;
}

.raffle-car-select-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.raffle-car-select-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px;
  background-color: var(--color-surface-400);
  border: 1px solid var(--color-gold-alpha-15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.raffle-car-select-item:hover {
  border-color: var(--color-gold-500);
}

.raffle-car-select-item.is-selected {
  border-color: var(--color-gold-500);
  background-color: var(--color-surface-300);
}

.raffle-car-thumb {
  width: 80px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
}

.raffle-car-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.88rem;
}

.methodology-points {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-grey-200);
  font-size: 0.92rem;
  line-height: 1.5;
  margin-top: 14px;
}

.full-width {
  width: 100%;
}

/* ===================================================================
   RESPONSIVE LAYOUT (Mobile & Tablet Optimization)
   =================================================================== */
@media (max-width: 1100px) {
  .dual-feature-grid {
    grid-template-columns: 1fr;
  }

  .podium-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .podium-card-rank-1 {
    order: -1;
  }

  .raffle-cars-grid {
    grid-template-columns: 1fr;
  }

  .community-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .kpi-metrics-grid {
    grid-template-columns: 1fr 1fr;
  }

  .feature-sub-grid {
    grid-template-columns: 1fr 1fr;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .giant-profit-number {
    font-size: 2.1rem;
  }
}

@media (max-width: 600px) {
  .sub-header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .kpi-metrics-grid {
    grid-template-columns: 1fr;
  }

  .table-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input-box {
    max-width: 100%;
  }

  .table-footer-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination-controls {
    justify-content: center;
  }
}
</style>
