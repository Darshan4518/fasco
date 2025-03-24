"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"
import { useCreateOrder } from "@/lib/api-hooks"
import NewsletterSignup from "@/components/newsletter-signup"

export default function CheckoutPage() {
  const { items, clearCart, totalPrice } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const createOrder = useCreateOrder()

  // Hydration fix for server/client mismatch with localStorage
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (items.length === 0 && !isComplete) {
    return (
      <div className="container px-4 md:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">You need to add items to your cart before checking out.</p>
        <Link href="/products">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-none px-8">CONTINUE SHOPPING</Button>
        </Link>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="container px-4 md:px-6 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped shortly. We've sent a
            confirmation email with all the details.
          </p>
          <p className="font-medium mb-8">Order #: {Math.floor(Math.random() * 10000000)}</p>
          <Link href="/products">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-none px-8">CONTINUE SHOPPING</Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = totalPrice()
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate order creation
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsProcessing(false)
      setIsComplete(true)
      clearCart()
    } catch (error) {
      setIsProcessing(false)
      console.error("Error processing order:", error)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-2">FASCO Demo Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">Delivery</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP code</Label>
                    <Input id="zip" required />
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox id="save-info" />
                  <label htmlFor="save-info" className="ml-2 text-sm">
                    Save this information for next time
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div className="space-y-4">
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2 border p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit Card</Label>
                    <div className="ml-auto flex space-x-2">
                      <Image src="/placeholder.svg?height=24&width=36&text=Visa" alt="Visa" width={36} height={24} />
                      <Image
                        src="/placeholder.svg?height=24&width=36&text=MC"
                        alt="Mastercard"
                        width={36}
                        height={24}
                      />
                      <Image
                        src="/placeholder.svg?height=24&width=36&text=Amex"
                        alt="American Express"
                        width={36}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 border p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                    <Image
                      src="/placeholder.svg?height=24&width=36&text=PayPal"
                      alt="PayPal"
                      width={36}
                      height={24}
                      className="ml-auto"
                    />
                  </div>
                </RadioGroup>

                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration date (MM/YY)</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="ml-2 text-sm">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="max-h-80 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex py-3 border-b">
                    <div className="relative h-16 w-16 rounded overflow-hidden bg-gray-100 mr-4">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute -top-1 -right-1 bg-gray-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && item.selectedSize && ", "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

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

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white rounded-none h-12"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "PLACE ORDER"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  )
}

