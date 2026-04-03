export interface FinanceData {
  meta: {
    name: string
    role: string
    date: string
    currency: string
    timezone: string
  }
  profile: {
    displayName: string
    fullName: string
    title: string
    organization: string
    avatar: string
  }
  summary: {
    totalBalance: number
    netSavings: number
    riskIndex: string
    monthlyInflow: number
    monthlyOutflow: number
    safeToSpend: number
    projectedYearlyROI: number
    financialHealthScore: number
  }
  accounts: Array<{
    id: string
    name: string
    type: string
    institution: string
    balance: number
    available: number
    currency: string
    lastUpdated: string
  }>
  budgets: Array<{
    category: string
    budgeted: number
    spent: number
    currency: string
    status: string
  }>
  transactionHistory: Array<{
    id: string
    date: string
    postedAt: string
    description: string
    merchant: string
    category: string
    type: 'expense' | 'income'
    amount: number
    currency: string
    status: string
    account: string
  }>
  insights: {
    primaryOutflow: {
      category: string
      monthlyAllocation: number
      varianceVsLastMonth: number
      shareOfIncome: number
      notes: string
    }
    velocity: {
      lastMonth: number
      thisMonth: number
      changePercent: number
    }
    observations: Array<{
      title: string
      description: string
      sentiment: 'positive' | 'watch' | 'negative'
    }>
    categoryDistribution: Array<{
      label: string
      percent: number
      color: string
    }>
    pageTitle: string
    subtitle: string
    modes: {
      personal: string
      business: string
    }
    callout: {
      title: string
      description: string
      buttonLabel: string
    }
  }
  reports: {
    financialHealthScore: number
    assets: number
    netSavings: number
    riskIndex: string
    projectedYearlyROI: number
    quarterChange: number
    monthlyArchives: Array<{
      period: string
      status: string
      netCashflow: number
      compliance: string
    }>
    pageTitle: string
    subtitle: string
    actions: {
      downloadJson: string
      exportCsv: string
    }
    sharedAccess: {
      statusLabel: string
      title: string
      description: string
      avatars: string[]
      extraCount: number
      actionLabel: string
    }
  }
  roles: Array<{
    name: string
    active: boolean
  }>
  ui: {
    search: {
      global: string
      insights: string
      reports: string
      transactions: string
    }
    footer: {
      legalName: string
      links: Array<{
        label: string
        href: string
      }>
    }
  }
  cards: Array<{
    title: string
    amount: number
    badge: string
    description: string
    icon: string
  }>
  navigation: {
    dashboard: string
    transactions: string
    insights: string
    reports: string
    newTransaction: string
    settings: string
  }
  landing: {
    eyebrow: string
    headlineLines: string[]
    description: string
    primaryCta: string
    demoCta: string
    summaryTitle: string
    summaryDescription: string
    previewTitle: string
    previewAmount: number
    previewDelta: string
    footerCards: Array<{
      title: string
      description: string
      icon: string
    }>
    appButtons: {
      appStore: string
      googlePlay: string
    }
  }
  dashboard: {
    welcomeLabel: string
    title: string
    periodLabel: string
    periodOptions: string[]
    balanceTrend: {
      title: string
      subtitle: string
      tooltipLabel: string
      tooltipAmount: number
      months: string[]
      points: Array<{
        label: string
        date: string
        value: number
      }>
    }
    spendingBreakdown: {
      title: string
      totalSpent: number
      totalLabel: string
      categories: Array<{
        label: string
        percent: string
        color: string
        amount: number
      }>
      slices: Array<{
        label: string
        percent: number
        amount: number
        color: string
      }>
    }
    recentTransactions: Array<{
      id: string
      name: string
      categoryLabel: string
      amountLabel: string
      status: string
      icon?: string
      image?: string
      displayType: 'image' | 'icon'
    }>
  }
  transactions: {
    pageTitle: string
    subtitle: string
    searchPlaceholder: string
    modeLabel: string
    categoryLabel: string
    categoryOptions: string[]
    dateRangeLabel: string
    resetLabel: string
    historyLabel: string
    exportLabel: string
    summaryCards: Array<{
      title: string
      amount: number
      trendLabel: string
      trendType: 'up' | 'down'
      trendPercent: number
    }>
    floatingActionLabel: string
  }
}
