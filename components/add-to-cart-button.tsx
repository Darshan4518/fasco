"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore } from "@/lib/store"

export default function AddToCartButton({ product , showQuantity = false }:any) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <Button onClick={handleAddToCart} className="w-full bg-emerald-600 hover:bg-emerald-700">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}

