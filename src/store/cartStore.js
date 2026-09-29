import { create } from 'zustand';

const CART_STORAGE_KEY = 'milprime_cart';

function getStoredCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
    return [];
  }
}

function persistCart(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
}

export const useCartStore = create((set, get) => ({
  items: getStoredCart(),

  /**
   * Add a product to the cart with optional quantity and pricing
   */
  addToCart: (product, quantity = 1, priceOverride = null) => {
    set((state) => {
      const price = priceOverride !== null ? priceOverride : parseFloat(product.price);
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      let newItems;
      if (existingIndex > -1) {
        newItems = [...state.items];
        const newQty = newItems[existingIndex].quantity + quantity;
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newQty,
          subtotal: parseFloat((newQty * price).toFixed(2)),
        };
      } else {
        const initialQty = Math.max(1, quantity);
        newItems = [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            category: product.category,
            brand: product.brand,
            image_url: product.image_url,
            price: price,
            originalPrice: parseFloat(product.price),
            compare_at_price: product.compare_at_price ? parseFloat(product.compare_at_price) : null,
            quantity: initialQty,
            subtotal: parseFloat((initialQty * price).toFixed(2)),
          },
        ];
      }

      persistCart(newItems);
      return { items: newItems };
    });
  },

  /**
   * Remove item entirely from cart
   */
  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      persistCart(newItems);
      return { items: newItems };
    });
  },

  /**
   * Increase quantity by 1
   */
  increaseQuantity: (productId) => {
    set((state) => {
      const newItems = state.items.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + 1;
          return {
            ...item,
            quantity: newQty,
            subtotal: parseFloat((newQty * item.price).toFixed(2)),
          };
        }
        return item;
      });
      persistCart(newItems);
      return { items: newItems };
    });
  },

  /**
   * Decrease quantity by 1, or remove if reaches 0
   */
  decreaseQuantity: (productId) => {
    set((state) => {
      const target = state.items.find((item) => item.id === productId);
      if (!target) return state;

      if (target.quantity <= 1) {
        const newItems = state.items.filter((item) => item.id !== productId);
        persistCart(newItems);
        return { items: newItems };
      }

      const newItems = state.items.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity - 1;
          return {
            ...item,
            quantity: newQty,
            subtotal: parseFloat((newQty * item.price).toFixed(2)),
          };
        }
        return item;
      });

      persistCart(newItems);
      return { items: newItems };
    });
  },

  /**
   * Update quantity directly to a specified number
   */
  updateQuantity: (productId, quantity) => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => {
      const newItems = state.items.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: qty,
            subtotal: parseFloat((qty * item.price).toFixed(2)),
          };
        }
        return item;
      });
      persistCart(newItems);
      return { items: newItems };
    });
  },

  /**
   * Clear the entire cart
   */
  clearCart: () => {
    persistCart([]);
    set({ items: [] });
  },

  /**
   * Getters / computed selectors
   */
  getTotalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return parseFloat(
      get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
    );
  },
}));
