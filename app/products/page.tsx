"use client"

import { useState, useEffect, useCallback, SetStateAction } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Star } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import ColorSelector from "@/components/color-selector"
import { Pagination } from "@/components/pagination"
import { useQueries } from "@tanstack/react-query"
import debounce from "lodash.debounce"
import Link from "next/link"




export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("asc")
  const [category, setCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Debounce Search Query to avoid unnecessary re-renders
  const debouncedSetSearchQuery = useCallback(
    debounce((query: SetStateAction<string>) => setSearchQuery(query), 300),
    []
  )

  // Handle Search Input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchQuery(e.target.value)
  }

  // Reset Page When Category or Search Changes
  useEffect(() => {
    setPage(1)
  }, [category, searchQuery])

  // Fetch Data with Queries
  const [{ data: productData, isLoading: isProductLoading, error: productError }, { data: categoriesList, isLoading: isCategoriesLoading, error: categoriesError }] = useQueries({
    queries: [
      {
        queryKey: ["products", category, page, sort, searchQuery],
        queryFn: async () => {
          let url = `https://dummyjson.com/products?limit=9&skip=${(page - 1) * 9}&sortBy=price&order=${sort}`

          if (category !== "all") {
            url = `https://dummyjson.com/products/category/${category}`
          }

          if (searchQuery) {
            url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=9&skip=${(page - 1) * 9}&sortBy=price&order=${sort}`
          }

          const response = await fetch(url)
          if (!response.ok) throw new Error("Failed to fetch products")
          return await response.json()
        },
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["categoriesList"],
        queryFn: async () => {
          const response = await fetch("https://dummyjson.com/products/category-list")
          if (!response.ok) throw new Error("Failed to fetch categories")
          return await response.json()
        },
        staleTime: 1000 * 60 * 5,
      },
    ],
  })


  // Loading & Error States
  if (isProductLoading || isCategoriesLoading) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (productError || categoriesError) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="text-red-500 text-center">Error loading data. Please try again later.</div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <div className="sticky top-24 space-y-6">
            <h2 className="text-lg font-bold">Filters</h2>

            

            

            

            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
             <div className="mb-2">
             <Checkbox
                id={`all`}
                checked={category === "all"}
                onCheckedChange={() => setCategory("all")}
              />
              <Label htmlFor={`all`} className="ml-2 text-sm">
                {"All"}
              </Label>
             </div>
              <div className="space-y-2">
                {categoriesList?.map((cat: string) => (
                  <div key={cat} className="flex items-center">
                    <Checkbox
                      id={`category-${cat}`}
                      checked={category === cat}
                      onCheckedChange={() => setCategory(cat)}
                    />
                    <Label htmlFor={`category-${cat}`} className="ml-2 text-sm">
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              Showing {productData?.products?.length || 0} products
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm">Sort by:</span>
              <select
                className="border-b pb-1 text-sm focus:outline-none"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData?.products?.map((product: any) => (
              <Link href={`/products/${product?.id}`} key={product?.id} className="group">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-4">
                  <Image
                    src={product?.thumbnail || "/placeholder.svg"}
                    alt={product?.title}
                    width={450}
                    height={600}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium mb-1">{product?.title}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(product?.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product?.reviews?.length || 0})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${product?.price}</span>
                  <ColorSelector
                    colors={product.colors || []}
                    selectedColor={product.colors?.[0] || ""}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={productData?.totalPages || 5}
            onPageChange={setPage}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  )
}
