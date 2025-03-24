import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./api"

interface CartState {
  items: Product[]
  addItem: (product: Product) => void
  updateQuantity: (productId: string | number, quantity: number) => void
  removeItem: (productId: string | number) => void
  clearCart: () => void
  itemCount: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              item.selectedColor === product.selectedColor &&
              item.selectedSize === product.selectedSize,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id &&
                item.selectedColor === product.selectedColor &&
                item.selectedSize === product.selectedSize
                  ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
                  : item,
              ),
            }
          } else {
            return {
              items: [...state.items, { ...product, quantity: product.quantity || 1 }],
            }
          }
        })
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      itemCount: () => {
        return get().items.reduce((count, item) => count + (item.quantity || 1), 0)
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.salePrice || item.price
          return total + price * (item.quantity || 1)
        }, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string | number) => void
  isInWishlist: (productId: string | number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state
          }
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)

