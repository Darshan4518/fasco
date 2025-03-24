"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import CountdownTimer from "@/components/countdown-timer"
import BrandSlider from "@/components/brand-slider"
import ProductCard from "@/components/product-card"
import { useQueries } from "@tanstack/react-query"
import Link from "next/link"

export default function Home() {
  // Fetch Data with Queries
  const [{ data: deals, isLoading: isDealsLoading, error: dealsError }, { data: newProducts, isLoading: isNewProductsLoading, error: newProductsError }] = useQueries({
    queries: [
      {
        queryKey: ["deals"],
        queryFn: async () => {
          const response = await fetch("https://dummyjson.com/products?limit=3&skip=10&select=title,price,thumbnail,discountPercentage")
          if (!response.ok) throw new Error("Failed to fetch deals")
          return await response.json()
        },
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["newProducts"],
        queryFn: async () => {
          const response = await fetch("https://dummyjson.com/products/category/laptops")
          if (!response.ok) throw new Error("Failed to fetch new products")
          return await response.json()
        },
        staleTime: 1000 * 60 * 5,
      },
    ],
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 aspect-square relative overflow-hidden">
              <Image
                src="/image2.png"
                alt="Model in casual wear"
                width={600}
                height={600}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="bg-white flex flex-col items-center justify-center p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                ULTIMATE
                <span className="block text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                  SALE
                </span>
              </h1>
              <p className="text-gray-500 mb-6">Limited time offer</p>
              <Button className="rounded-none bg-black hover:bg-gray-800 text-white px-8">SHOP NOW</Button>
            </div>
            <div className="bg-gray-100 aspect-square relative overflow-hidden">
              <Image
                src="/image1.png"
                alt="Model in stylish outfit"
                width={600}
                height={600}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8E7E7] aspect-[2/1] relative overflow-hidden">
              <Image
                src="/image3.png"
                alt="Models in casual wear"
                width={800}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-gray-100 aspect-[2/1] relative overflow-hidden">
              <Image
                src="/image4.png"
                alt="Models in stylish outfits"
                width={600}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Brand Slider */}
      <section className="w-full py-8 border-t border-b">
        <div className="container px-4 md:px-6">
          <BrandSlider />
        </div>
      </section>

      {/* Deals of the Month */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Deals Of The Month</h2>
          {isDealsLoading ? (
            <p>Loading deals...</p>
          ) : dealsError ? (
            <p className="text-red-500">Error fetching deals!</p>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <p className="text-sm text-gray-500 mb-2">Hurry, Before It's Too Late!</p>
                <CountdownTimer targetDate={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deals?.products?.map((deal: any) => (
                  <Link href={`/products/${deal.id}`} key={deal.id} className="group relative overflow-hidden">
                    <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                      <Image
                        src={deal?.thumbnail || "/placeholder.svg"}
                        alt={deal?.title || "Deal"}
                        width={450}
                        height={600}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1">
                        {deal?.discountPercentage ? `${deal.discountPercentage}% OFF` : "25% OFF"}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-medium">{deal?.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="font-semibold">${deal?.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <div className="flex space-x-4">
              <button className="text-sm text-gray-500 hover:text-black">Women</button>
              <button className="text-sm font-medium">All</button>
              <button className="text-sm text-gray-500 hover:text-black">Men</button>
              <button className="text-sm text-gray-500 hover:text-black">Accessories</button>
            </div>
          </div>

          {isNewProductsLoading ? (
            <p>Loading new arrivals...</p>
          ) : newProductsError ? (
            <p className="text-red-500">Error fetching new arrivals!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newProducts?.products.map((product: any) => (
               <Link href={`/products/${product?.id}`} key={product?.id}  >
                <ProductCard
                  key={product?.id}
                  image={product?.thumbnail || "/placeholder.svg"}
                  title={product?.title}
                  price={product?.price}
                  rating={product?.rating || 4}
                  reviewCount={product?.reviews?.length || 0}
                />
               </Link>
              ))}
            </div>
          )}
          <Link href={"/products"} className="flex justify-center mt-8">
            <Button className="rounded-none bg-black hover:bg-gray-800 text-white px-8">VIEW ALL</Button>
          </Link>
        </div>
      </section>


      <section className=" space-y-5">
        <Image
          src="/slider.png"
          alt="Models in casual wear"
          width={800}
          height={300}
          className="object-cover w-full h-full"
        />
           <Image
          src="/gallery.png"
          alt="Models in casual wear"
          width={800}
          height={300}
          className="object-cover w-full h-full"
        />
        <Image
          src="/testimonials.png"
          alt="Models in casual wear"
          width={800}
          height={300}
          className="object-cover w-full h-full"
        />
      </section>

      {/* Newsletter */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <Image src="/image5.png" alt="Model in coat" width={400} height={500} className="object-cover" />
            </div>
            <div className="md:w-1/3 text-center px-8">
              <h2 className="text-2xl font-bold mb-4">Subscribe To Our Newsletter</h2>
              <p className="text-gray-500 mb-6">
                Sign up for our newsletter to receive updates on new arrivals, special offers, and other discount
                information.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-r-0 focus:outline-none"
                />
                <Button className="rounded-none bg-black hover:bg-gray-800 text-white">SUBSCRIBE</Button>
              </div>
            </div>
            <div className="md:w-1/3 hidden md:block">
              <Image src="/image6.png" alt="Model in coat" width={400} height={500} className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
