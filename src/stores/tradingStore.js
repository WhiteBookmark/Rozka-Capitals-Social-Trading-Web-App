import { defineStore } from 'pinia';

export const useTradingStore = defineStore('trading', {
  state: () => ({
    accountSummary: {
      totalBalance: 48520.50,
      equity: 51240.80,
      totalProfitLoss: +2720.30,
      profitPercentage: +5.61,
      copiedTradersCount: 3,
      winRate: 84.5,
      activePositionsCount: 7,
    },
    // --- COPIER LEADERBOARD METRICS (from screenshots) ---
    leaderboardSummary: {
      totalTraders: 1709,
      copyVolume30d: 23322, // lots
      onlineNow: 83,
      totalCopies: 800,
      copiersRealised30d: 137849.33,
      rankedAccountsProfitable: 73, // %
      newCopiersToday: 37,
      startedCopyingLastHour: 2,
      volumeTraded24h: 211, // lots
      lastCopierStarted: '22****4251 started copying 50 minutes ago',
    },

    // --- TOP MASTER OF THE MONTH ---
    topMasterMonth: {
      id: 'master_oil_majors',
      name: 'Oil & Majors',
      monogram: 'O&',
      category: 'Energy & FX Macro',
      activeCopiers: 37,
      copiersRealised30d: 37826.45,
      startedThisWeek: 55,
      minInvestment: 500,
      strategy: 'Systematic mean-reversion trading WTI crude oil and major G10 currency pairs with dynamic hedged exposure.',
      roi30d: 52.8,
      riskScore: 3,
      winRate: 88.4,
    },

    // --- LIVE TICKER STREAM (Real-time Copier Trade Stream) ---
    liveTradeStream: [
      { id: 't_1', maskedCopier: '22****9546', symbol: 'BTCUSD', profit: 2.23, time: 'Just now' },
      { id: 't_2', maskedCopier: '23****4112', symbol: 'XAUUSD', profit: 18.40, time: '1m ago' },
      { id: 't_3', maskedCopier: '22****9546', symbol: 'BTCUSD', profit: 0.01, time: '2m ago' },
      { id: 't_4', maskedCopier: '21****8820', symbol: 'EURUSD', profit: 42.50, time: '3m ago' },
      { id: 't_5', maskedCopier: '22****9546', symbol: 'BTCUSD', profit: 1.30, time: '4m ago' },
      { id: 't_6', maskedCopier: '24****7703', symbol: 'USOIL', profit: 9.75, time: '5m ago' },
      { id: 't_7', maskedCopier: '23****9459', symbol: 'GBPJPY', profit: 36.13, time: '6m ago' },
      { id: 't_8', maskedCopier: '22****6121', symbol: 'ETHUSD', profit: 115.80, time: '7m ago' },
      { id: 't_9', maskedCopier: '23****8868', symbol: 'NASDAQ', profit: 187.88, time: '8m ago' },
      { id: 't_10', maskedCopier: '21****9042', symbol: 'XAUUSD', profit: 680.00, time: '9m ago' },
    ],

    // --- CONQUEST LUXURY CAR RAFFLE SHOWCASE ---
    raffleCampaign: {
      title: 'COPY, QUALIFY AND WIN THE CAR',
      subtitle: 'Achieve trading lot volume missions on copied masters to enter the conquest raffle.',
      userLotsTraded: 5.40,
      userTickets: 2,
      cars: [
        {
          id: 'car_1',
          name: 'Mercedes-AMG G 63 Brabus',
          image: '/cars/brabus_g63.jpg',
          mission: '1 Lot Mission',
          targetLots: 1,
          eligible: true,
          specs: '800 HP · Biturbo V8 · Widestar Carbon Aero',
          drawDate: 'End of Quarter',
        },
        {
          id: 'car_2',
          name: 'Rolls-Royce Cullinan',
          image: '/cars/rolls_royce.jpg',
          mission: '4 Lot Mission',
          targetLots: 4,
          eligible: true,
          specs: '6.75L V12 Twin-Turbo · Bespoke Luxury Obsidian',
          drawDate: 'Semi-Annual Grand Finale',
        },
        {
          id: 'car_3',
          name: 'Ferrari SF90 Stradale',
          image: '/cars/ferrari_sf90.jpg',
          mission: '9 Lot Mission',
          targetLots: 9,
          eligible: false,
          specs: '986 HP · Plug-In Hybrid V8 · 0-100 km/h in 2.5s',
          drawDate: 'Annual Pinnacle Gala',
        },
      ],
    },

    // --- COPIER LEADERBOARD PODIUM (Top 3) ---
    podiumCopiers: [
      {
        rank: 2,
        maskedId: '23****7741',
        masterCopied: 'Crypto Swing',
        return7d: '+1.00%',
        pnl: 1000.93,
        days: '7 Days',
        avatarType: 'female_blazer',
      },
      {
        rank: 1,
        maskedId: '22****6121',
        masterCopied: 'Alex Warren',
        return7d: '+456.21%',
        pnl: 3215.41,
        days: '7 Days',
        avatarType: 'male_glasses',
      },
      {
        rank: 3,
        maskedId: '23****4863',
        masterCopied: 'Crypto Swing',
        return7d: '+4.31%',
        pnl: 851.79,
        days: '7 Days',
        avatarType: 'female_casual',
      },
    ],

    // --- DETAILED COPIER LEADERBOARD DIRECTORY (From screenshots) ---
    copierLeaderboard: [
      {
        id: 'copier_1',
        rank: 4,
        maskedId: '23****4497',
        drawdown: 3.35,
        tradesCount: 86,
        return7d: 2.58,
        pnl: 377.95,
        masterName: 'Oil & Majors',
        avatarType: 'female_blazer',
        equityTrend: [100, 108, 105, 120, 135, 130, 148],
      },
      {
        id: 'copier_2',
        rank: 5,
        maskedId: '23****6723',
        drawdown: 6.47,
        tradesCount: 44,
        return7d: 0.90,
        pnl: 103.08,
        masterName: 'Gold Trend',
        avatarType: 'male_casual',
        equityTrend: [100, 96, 102, 98, 105, 104, 112],
      },
      {
        id: 'copier_3',
        rank: 6,
        maskedId: '23****9459',
        drawdown: 6.85,
        tradesCount: 41,
        return7d: 0.97,
        pnl: 36.13,
        masterName: 'Yen Carry',
        avatarType: 'male_glasses',
        equityTrend: [100, 103, 101, 104, 106, 108, 110],
      },
      {
        id: 'copier_4',
        rank: 7,
        maskedId: '23****8868',
        drawdown: 9.73,
        tradesCount: 134,
        return7d: 1.01,
        pnl: 187.88,
        masterName: 'Steady FX',
        avatarType: 'male_suit',
        equityTrend: [100, 94, 99, 103, 98, 106, 114],
      },
      {
        id: 'copier_5',
        rank: 8,
        maskedId: '22****5519',
        drawdown: 4.12,
        tradesCount: 52,
        return7d: 3.42,
        pnl: 512.40,
        masterName: 'Elena Rostova',
        avatarType: 'female_casual',
        equityTrend: [100, 106, 112, 118, 122, 130, 138],
      },
      {
        id: 'copier_6',
        rank: 9,
        maskedId: '23****1108',
        drawdown: 5.80,
        tradesCount: 68,
        return7d: 1.85,
        pnl: 245.10,
        masterName: 'Marcus Vance',
        avatarType: 'male_glasses',
        equityTrend: [100, 97, 105, 109, 115, 112, 121],
      },
      {
        id: 'copier_7',
        rank: 10,
        maskedId: '21****9042',
        drawdown: 2.15,
        tradesCount: 31,
        return7d: 4.10,
        pnl: 680.00,
        masterName: 'Sophie Lin',
        avatarType: 'female_blazer',
        equityTrend: [100, 110, 115, 122, 128, 135, 144],
      },
      {
        id: 'copier_8',
        rank: 11,
        maskedId: '24****3321',
        drawdown: 8.20,
        tradesCount: 95,
        return7d: 0.85,
        pnl: 89.50,
        masterName: 'David Sterling',
        avatarType: 'male_casual',
        equityTrend: [100, 95, 98, 101, 100, 104, 108],
      },
      {
        id: 'copier_9',
        rank: 12,
        maskedId: '22****4251',
        drawdown: 5.10,
        tradesCount: 47,
        return7d: 2.15,
        pnl: 310.20,
        masterName: 'Alex Warren',
        avatarType: 'male_suit',
        equityTrend: [100, 104, 108, 106, 115, 120, 126],
      },
      {
        id: 'copier_10',
        rank: 13,
        maskedId: '23****8014',
        drawdown: 7.30,
        tradesCount: 62,
        return7d: 1.45,
        pnl: 195.40,
        masterName: 'Crypto Swing',
        avatarType: 'female_casual',
        equityTrend: [100, 98, 104, 102, 110, 113, 118],
      },
      {
        id: 'copier_11',
        rank: 14,
        maskedId: '24****9901',
        drawdown: 4.60,
        tradesCount: 55,
        return7d: 1.72,
        pnl: 220.80,
        masterName: 'Oil & Majors',
        avatarType: 'male_glasses',
        equityTrend: [100, 103, 107, 110, 109, 114, 120],
      },
      {
        id: 'copier_12',
        rank: 15,
        maskedId: '22****7732',
        drawdown: 6.10,
        tradesCount: 78,
        return7d: 1.15,
        pnl: 142.60,
        masterName: 'Gold Trend',
        avatarType: 'female_blazer',
        equityTrend: [100, 98, 102, 105, 103, 108, 113],
      },
    ],

    masterTraders: [
      {
        id: 'master_oil_majors',
        name: 'Oil & Majors',
        title: 'Energy & G10 FX Institutional Strategy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        copiers: 37,
        roi30d: 52.8,
        riskScore: 3,
        winRate: 88.4,
        strategy: 'Systematic mean-reversion trading WTI crude oil and major G10 currency pairs with dynamic hedged exposure.',
        minInvestment: 500,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'master_alex_warren',
        name: 'Alex Warren',
        title: 'High Beta Tech & Crypto Breakouts',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        copiers: 4210,
        roi30d: 456.2,
        riskScore: 5,
        winRate: 82.5,
        strategy: 'Momentum breakouts on BTCUSD, ETHUSD, and NVDA with trailing institutional stops.',
        minInvestment: 500,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'master_crypto_swing',
        name: 'Crypto Swing',
        title: 'Quantitative Crypto Swing Trading',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        copiers: 1840,
        roi30d: 48.6,
        riskScore: 4,
        winRate: 79.8,
        strategy: 'Multi-timeframe algorithmic swing trading top liquid cryptocurrency pairs.',
        minInvestment: 250,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'master_steady_fx',
        name: 'Steady FX',
        title: 'Ultra Low Drawdown Forex Core',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        copiers: 960,
        roi30d: 22.4,
        riskScore: 1,
        winRate: 94.2,
        strategy: 'Capital protection priority trading London & New York session currency flow.',
        minInvestment: 200,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'master_yen_carry',
        name: 'Yen Carry',
        title: 'Interest Rate Differential Yield Strategy',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        copiers: 1320,
        roi30d: 31.0,
        riskScore: 2,
        winRate: 87.5,
        strategy: 'Long USDJPY, CHFJPY, and GBPJPY positions exploiting global interest rate differentials.',
        minInvestment: 300,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'master_gold_trend',
        name: 'Gold Trend',
        title: 'Precious Metals Macro Scalper',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        copiers: 2650,
        roi30d: 65.4,
        riskScore: 3,
        winRate: 85.9,
        strategy: 'XAUUSD scalping on intraday volatility spikes, backed by gold-backed reserve indicators.',
        minInvestment: 500,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'trader_1',
        name: 'Elena Rostova',
        title: 'Algorithmic Gold & FX Strategy',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        copiers: 1420,
        roi30d: 38.4,
        riskScore: 3,
        winRate: 89.2,
        strategy: 'Low risk scalping on XAUUSD & EURUSD with automated stop losses.',
        minInvestment: 500,
        isCopied: true,
        copiedAmount: 15000,
        currentPnl: +1840.20,
      },
      {
        id: 'trader_2',
        name: 'Marcus Vance',
        title: 'Macro Crypto & Nasdaq Momentum',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        copiers: 2890,
        roi30d: 64.2,
        riskScore: 5,
        winRate: 78.6,
        strategy: 'High-frequency momentum trading across US Tech stocks and BTC.',
        minInvestment: 1000,
        isCopied: true,
        copiedAmount: 10000,
        currentPnl: +980.50,
      },
      {
        id: 'trader_3',
        name: 'Sophie Lin',
        title: 'Conservative Energy Arbitrage',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        copiers: 980,
        roi30d: 19.8,
        riskScore: 2,
        winRate: 93.1,
        strategy: 'Capital preservation focus trading Brent Crude & Natural Gas spreads.',
        minInvestment: 250,
        isCopied: true,
        copiedAmount: 5000,
        currentPnl: -100.40,
      },
      {
        id: 'trader_4',
        name: 'David Sterling',
        title: 'Institutional Forex Core',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        copiers: 3410,
        roi30d: 29.5,
        riskScore: 3,
        winRate: 86.4,
        strategy: 'Multi-currency basket trading based on central bank rate differential.',
        minInvestment: 500,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
      {
        id: 'trader_5',
        name: 'Viktor Krum',
        title: 'Indices Breakdown Hunter',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        copiers: 1150,
        roi30d: 45.1,
        riskScore: 4,
        winRate: 81.0,
        strategy: 'Breakout swing trading DAX40 and S&P500 index futures.',
        minInvestment: 750,
        isCopied: false,
        copiedAmount: 0,
        currentPnl: 0,
      },
    ],
    activePositions: [
      { id: 'pos_101', symbol: 'XAUUSD', type: 'BUY', volume: '1.50', openPrice: '2385.40', currentPrice: '2398.20', pnl: +1920.00, trader: 'Elena Rostova' },
      { id: 'pos_102', symbol: 'BTCUSD', type: 'BUY', volume: '0.25', openPrice: '64200.00', currentPrice: '66800.00', pnl: +650.00, trader: 'Marcus Vance' },
      { id: 'pos_103', symbol: 'EURUSD', type: 'SELL', volume: '2.00', openPrice: '1.0890', currentPrice: '1.0865', pnl: +500.00, trader: 'Elena Rostova' },
      { id: 'pos_104', symbol: 'USOIL', type: 'BUY', volume: '10.00', openPrice: '78.50', currentPrice: '77.80', pnl: -700.00, trader: 'Sophie Lin' },
    ],
    selectedTraderForCopy: null,
    isCopyModalOpen: false,
  }),

  getters: {
    copiedTraders: (state) => state.masterTraders.filter((t) => t.isCopied),
    availableTraders: (state) => state.masterTraders.filter((t) => !t.isCopied),
  },

  actions: {
    /**
     * Copy a master trader with specified investment amount
     * @param {string} traderId 
     * @param {number} amount 
     */
    startCopying(traderId, amount) {
      const trader = this.masterTraders.find((t) => t.id === traderId);
      if (!trader) return { success: false, error: 'Trader not found.' };

      if (amount < trader.minInvestment) {
        return { success: false, error: `Minimum copy amount for ${trader.name} is $${trader.minInvestment}.` };
      }

      if (amount > this.accountSummary.totalBalance) {
        return { success: false, error: 'Insufficient wallet balance.' };
      }

      trader.isCopied = true;
      trader.copiedAmount = amount;
      trader.copiers += 1;
      this.accountSummary.copiedTradersCount += 1;

      return { success: true, message: `Successfully allocated $${amount} to copy ${trader.name}!` };
    },

    /**
     * Stop copying a master trader
     * @param {string} traderId 
     */
    stopCopying(traderId) {
      const trader = this.masterTraders.find((t) => t.id === traderId);
      if (!trader || !trader.isCopied) return { success: false, error: 'Trader is not currently being copied.' };

      trader.isCopied = false;
      trader.copiedAmount = 0;
      trader.copiers = Math.max(0, trader.copiers - 1);
      this.accountSummary.copiedTradersCount = Math.max(0, this.accountSummary.copiedTradersCount - 1);

      return { success: true, message: `Stopped copying ${trader.name}. Allocated funds returned to your balance.` };
    },

    /**
     * Enter the luxury vehicle conquest raffle for an eligible car
     * @param {string} carId 
     */
    enterRaffle(carId) {
      const car = this.raffleCampaign.cars.find((c) => c.id === carId);
      if (!car) return { success: false, error: 'Vehicle prize mission not found.' };

      if (this.raffleCampaign.userLotsTraded < car.targetLots) {
        return {
          success: false,
          error: `Mission requires ${car.targetLots} traded copy lots. You currently have ${this.raffleCampaign.userLotsTraded} lots.`,
        };
      }

      this.raffleCampaign.userTickets += 1;
      return {
        success: true,
        message: `Congratulations! Ticket #${Math.floor(100000 + Math.random() * 900000)} issued for ${car.name}. Draw date: ${car.drawDate}.`,
      };
    },
  },
});
