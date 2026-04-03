export function formatCurrency(value: number, currency = 'USD') {
  const fractionalDigits = Number.isInteger(value) ? 0 : 2

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: fractionalDigits,
  }).format(value)
}

export function formatSignedCurrency(value: number, currency = 'USD') {
  const formatted = formatCurrency(Math.abs(value), currency)

  return `${value >= 0 ? '+' : '-'}${formatted}`
}

export function formatPercent(value: number, fractionDigits = 1) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(fractionDigits)}%`
}

export function formatShortDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}
