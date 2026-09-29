/**
 * Format numeric value to USD currency string.
 * @param {number|string} amount 
 * @returns {string} e.g. "$120.00"
 */
export function formatCurrency(amount) {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}
