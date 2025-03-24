import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Providers from "./providers"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FASCO - Fashion E-commerce",
  description: "Modern fashion e-commerce store",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full bg-white border-b">
              <div className="container px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4 mt-8">
                          <Link href="/" className="text-lg font-semibold">
                            Home
                          </Link>
                          <Link href="/products" className="text-lg font-semibold">
                            Products
                          </Link>
                         
                          <Link href="/cart" className="text-lg font-semibold">
                            Cart
                          </Link>
                        </nav>
                      </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="text-xl font-bold tracking-wider">FASCO</span>
                    </Link>
                  </div>
                  <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium">
                      Home
                    </Link>
                    <Link href="/products" className="text-sm font-medium">
                      Shop
                    </Link>
                  
                  </nav>
                  <div className="flex items-center gap-4">
                    <SearchBar/>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Wishlist</span>
                    </Button>
                    <Link href="/cart">
                      <Button variant="ghost" size="icon" className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                          0
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-8">
              <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Shop</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="/products?category=Women's Clothing">Women</Link>
                      </li>
                      <li>
                        <Link href="/products?category=Men's Clothing">Men</Link>
                      </li>
                      <li>
                        <Link href="/products?category=Accessories">Accessories</Link>
                      </li>
                      <li>
                        <Link href="/products?category=Shoes">Shoes</Link>
                      </li>
                      <li>
                        <Link href="/products">New Arrivals</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Help</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#">Customer Service</Link>
                      </li>
                      <li>
                        <Link href="#">My Account</Link>
                      </li>
                      <li>
                        <Link href="#">Store Locator</Link>
                      </li>
                      <li>
                        <Link href="#">Shipping & Returns</Link>
                      </li>
                      <li>
                        <Link href="#">FAQs</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">About</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#">About Us</Link>
                      </li>
                      <li>
                        <Link href="#">Careers</Link>
                      </li>
                      <li>
                        <Link href="#">Corporate Responsibility</Link>
                      </li>
                      <li>
                        <Link href="#">Investors</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                      <li>Email: appuchethan@fasco.com</li>
                      <li>Phone: 8431136689</li>
                      <li>kanakapura,karnataka,india</li>
                    </ul>
                    <div className="flex space-x-4 mt-4">
                      <Link href="#" className="text-gray-500 hover:text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Link>
                      <Link href="#" className="text-gray-500 hover:text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </Link>
                      <Link href="#" className="text-gray-500 hover:text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                      </Link>
                      <Link href="#" className="text-gray-500 hover:text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                  <p>© {new Date().getFullYear()} FASCO. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'
import SearchBar from "@/components/search-bar"
