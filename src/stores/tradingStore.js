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
    masterTraders: [
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
  },
});
