"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"
import NewsletterSignup from "@/components/newsletter-signup"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-none px-8">CONTINUE SHOPPING</Button>
        </Link>
      </div>
    )
  }

  const subtotal = totalPrice()
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Shopping Cart</h1>
      <p className="text-center text-gray-500 mb-8">Home / Cart</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="py-4 text-left font-medium">Product</th>
                  <th className="py-4 text-center font-medium">Price</th>
                  <th className="py-4 text-center font-medium">Quantity</th>
                  <th className="py-4 text-right font-medium">Total</th>
                  <th className="py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="py-4">
                      <div className="flex items-center">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=60"}
                          alt={item.title}
                          width={60}
                          height={80}
                          className="object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          {item.selectedColor && <p className="text-gray-500">Color: {item.selectedColor}</p>}
                          {item.selectedSize && <p className="text-gray-500">Size: {item.selectedSize}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center">{formatCurrency(item.price)}</td>
                    <td className="py-4">
                      <div className="flex items-center justify-center">
                        <button
                          className="w-8 h-8 border flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <div className="w-10 h-8 border-t border-b flex items-center justify-center">
                          {item.quantity}
                        </div>
                        <button
                          className="w-8 h-8 border flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                    <td className="py-4 text-right">
                      <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-black">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center">
              <Input placeholder="Coupon code" className="rounded-none border-r-0 w-48" />
              <Button variant="outline" className="rounded-none">
                APPLY COUPON
              </Button>
            </div>
            <Button variant="outline" className="rounded-none" onClick={clearCart}>
              CLEAR CART
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border p-6">
            <h2 className="text-lg font-bold mb-4">Cart Total</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Checkbox id="gift-wrap" />
                <label htmlFor="gift-wrap" className="ml-2 text-sm">
                  Add $5.00 for Gift Wrap
                </label>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-none h-12">
                PROCEED TO CHECKOUT
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  )
}

