"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchBar({ defaultValue = "" }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(defaultValue)

  const handleSearch = (e) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)

    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    router.push(`/products?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="search"
        placeholder="Search for products..."
        className="w-full pl-10 pr-16"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Button
        type="submit"
        size="sm"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-emerald-600 hover:bg-emerald-700"
      >
        Search
      </Button>
    </form>
  )
}

