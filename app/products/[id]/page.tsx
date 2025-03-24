"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductImageGallery from "@/components/product-image-gallery"
import { useQuery } from "@tanstack/react-query"

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const { data: product, isLoading } = useQuery(
    {
      queryKey: ["product", id],
      queryFn: async () => {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        return response.json()
      },
    }
  )
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  if (isLoading) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-pulse bg-gray-200 aspect-square"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container px-4 md:px-6 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        selectedColor: selectedColor || product.colors?.[0] || "",
        selectedSize: selectedSize || "M",
        quantity,
      })
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const thumbnails = [
    "/placeholder.svg?height=100&width=80&text=Front",
    "/placeholder.svg?height=100&width=80&text=Side",
    "/placeholder.svg?height=100&width=80&text=Back",
    "/placeholder.svg?height=100&width=80&text=Detail",
    "/placeholder.svg?height=100&width=80&text=Fabric",
    "/placeholder.svg?height=100&width=80&text=Model",
  ]

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col gap-2">
            {product?.images?.map((thumb: string, index: number) => (
              <div key={index} className="w-20 h-24 border hover:border-black cursor-pointer">
                <Image
                  src={thumb || "/placeholder.svg"}
                  alt={`Product view ${index + 1}`}
                  width={80}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <ProductImageGallery
              mainImage={product?.thumbnail || "/placeholder.svg?height=600&width=450"}
              thumbnails={thumbnails}
            />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product?.reviews.length} reviews)</span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold mr-3">${product.salePrice || product.price}</span>
              {product.salePrice && <span className="text-lg text-gray-500 line-through">${product.price}</span>}
              {product.salePrice && <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1">SALE</span>}
            </div>

            <p className="text-gray-600 mb-6">
              {product.description ||
                "This premium quality item features a unique design and provides exceptional comfort and style."}
            </p>
            {
              product?.category == "fashion" ? (
                <div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">
                      Color: <span className="text-black font-medium">{selectedColor || colors[0].name}</span>
                    </p>
                    <div className="flex gap-2 mb-4">
                      {colors.map((color) => (
                        <div
                          key={color.value}
                          className={`w-8 h-8 rounded-full cursor-pointer border ${(selectedColor || colors[0].name) === color.name ? "ring-2 ring-black ring-offset-2" : ""
                            }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color.name)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">
                      Size: <span className="text-black font-medium">{selectedSize || "M"}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sizes.map((size) => (
                        <div
                          key={size}
                          className={`w-10 h-10 flex items-center justify-center border text-sm cursor-pointer ${(selectedSize || "M") === size ? "bg-black text-white" : "bg-white text-black"
                            }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null
            }

            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2">Quantity:</p>
              <div className="flex items-center">
                <button className="w-10 h-10 border flex items-center justify-center" onClick={decrementQuantity}>
                  -
                </button>
                <div className="w-12 h-10 border-t border-b flex items-center justify-center">{quantity}</div>
                <button className="w-10 h-10 border flex items-center justify-center" onClick={incrementQuantity}>
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                className="flex-1 bg-black hover:bg-gray-800 text-white rounded-none h-12"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
              <Button variant="outline" className="rounded-none h-12 px-4">
                <Heart size={20} />
              </Button>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Truck size={16} className="mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-500">SKU: {product.sku || "FAS-12345"}</span>
                </div>
              </div>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>Category:</span>
                <Link href={`/products?category=${product.category}`} className="hover:text-black">
                  {product.category || "Women's Clothing"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="border-b w-full justify-start rounded-none">
            <TabsTrigger value="description" className="rounded-none">
              Description
            </TabsTrigger>
            <TabsTrigger value="details" className="rounded-none">
              Additional Information
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none">
              Reviews ({product?.reviews?.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <p className="text-gray-600">
              {product?.description ||
                `This premium quality product is crafted with attention to detail and made from high-quality materials. 
                The design combines style and functionality, making it perfect for everyday use. The durable construction 
                ensures longevity, while the elegant design adds a touch of sophistication to your wardrobe.`}
            </p>
          </TabsContent>
          <TabsContent value="details" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">warrantyInformation</h3>
                <p className="text-gray-600">{
                  product?.warrantyInformation
                  } </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">shippingInformation</h3>
                <p className="text-gray-600">{
                  product?.shippingInformation
                  }</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">returnPolicy</h3>
                <p className="text-gray-600">{
                  product?.returnPolicy
                  }</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Country of Origin</h3>
                <p className="text-gray-600">Imported</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <div className="space-y-4">
              {product?.reviews?.map((review:any) => (
                <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="User" width={48} height={48} />
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium mr-2">{review?.reviewerName}</h4>
                    <div className="flex">
                      {[...Array(review?.rating as number)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Verified Purchase - {review?.date?.toString()}</p>
                  <p className="text-gray-600">
                    {review?.comment}
                  </p>
                </div>
              </div>
              ))}

             
            </div>
          </TabsContent>
        </Tabs>
      </div>


    </div>
  )
}

