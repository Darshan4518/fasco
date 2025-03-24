import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { formatCurrency } from "@/lib/utils"
import ColorSelector from "@/components/color-selector"

interface ProductCardProps {
  image: string
  title: string
  price: number
  rating?: number
  reviewCount?: number
  colors?: string[]
  id?: string | number
}

export default function ProductCard({
  image,
  title,
  price,
  rating = 0,
  reviewCount = 0,
  colors = ["#000000", "#FFFFFF"],
  id = "1",
}: ProductCardProps|any) {
  return (
    <div className="group">
      <Link href={`/products/${id}`} className="block">
        <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={450}
            height={600}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </Link>
      <h3 className="font-medium mb-1">{title}</h3>
      <div className="flex items-center mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{formatCurrency(price)}</span>
        <ColorSelector colors={colors} selectedColor={colors[0]} />
      </div>
    </div>
  )
}

