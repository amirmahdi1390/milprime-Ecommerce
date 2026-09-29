const STORAGE_KEY = 'milprime_discounts';

/**
 * Load all stored discounts from localStorage
 * @returns {Record<string, number>}
 */
function getStoredDiscounts() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error reading discounts from localStorage', e);
    return {};
  }
}

/**
 * Save discounts to localStorage
 * @param {Record<string, number>} discounts 
 */
function saveDiscounts(discounts) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(discounts));
  } catch (e) {
    console.error('Error writing discounts to localStorage', e);
  }
}

/**
 * Deterministically get or generate once-per-browser discount for a product.
 * Returns discount amount (0 if no discount, or integer between 1 and 20).
 * About 50-60% of products receive a discount.
 * 
 * @param {string|number} productId 
 * @param {number} originalPrice 
 * @returns {number} discount amount in USD
 */
export function getProductDiscount(productId, originalPrice) {
  if (!productId) return 0;
  const idStr = String(productId);
  const discounts = getStoredDiscounts();

  // If already generated and stored for this browser, return it
  if (discounts[idStr] !== undefined) {
    const stored = discounts[idStr];
    // Ensure discount never drops price below $1
    if (originalPrice && originalPrice - stored < 1) {
      return Math.max(0, Math.floor(originalPrice * 0.2));
    }
    return stored;
  }

  // Generate once: some products get discount, some do not (approx 55% chance)
  // Deterministic seed based on id characters so first generation feels organic
  const hash = idStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const getsDiscount = hash % 10 < 6; // 60% chance

  let discountAmount = 0;
  if (getsDiscount) {
    // Random discount between $2 and $20
    const rawDiscount = (hash % 19) + 2;
    // Don't let discount exceed 40% of item price or make price invalid
    if (originalPrice && rawDiscount >= originalPrice) {
      discountAmount = Math.max(1, Math.floor(originalPrice * 0.2));
    } else {
      discountAmount = rawDiscount;
    }
  }

  discounts[idStr] = discountAmount;
  saveDiscounts(discounts);
  return discountAmount;
}

/**
 * Calculate final price and discount metadata for a product
 * @param {object} product 
 * @returns {{ hasDiscount: boolean, discountAmount: number, finalPrice: number, originalPrice: number }}
 */
export function calculatePricing(product) {
  const originalPrice = parseFloat(product?.price) || 0;
  const discountAmount = getProductDiscount(product?.id || product?.slug, originalPrice);
  const hasDiscount = discountAmount > 0;
  const finalPrice = hasDiscount ? Math.max(0.5, originalPrice - discountAmount) : originalPrice;

  return {
    hasDiscount,
    discountAmount,
    finalPrice,
    originalPrice,
  };
}
