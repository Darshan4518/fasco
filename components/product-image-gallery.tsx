"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageGalleryProps {
  mainImage: string
  thumbnails: string[]
}

export default function ProductImageGallery({ mainImage, thumbnails }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(mainImage)

  return (
    <div className="relative">
      <div className="aspect-square bg-gray-100 mb-4">
        <Image
          src={currentImage || "/placeholder.svg"}
          alt="Product"
          width={600}
          height={600}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto md:hidden">
        {thumbnails.map((thumb, index) => (
          <div
            key={index}
            className={`w-20 h-24 border cursor-pointer ${currentImage === thumb ? "border-black" : ""}`}
            onClick={() => setCurrentImage(thumb)}
          >
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
    </div>
  )
}

