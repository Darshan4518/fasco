import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartState {
  items: any[]
  addItem: (product: any) => void
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




