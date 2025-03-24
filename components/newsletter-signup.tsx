import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NewsletterSignup() {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <Image
          src="/placeholder.svg?height=600&width=400"
          alt="Model in coat"
          width={400}
          height={600}
          className="object-cover"
        />
      </div>
      <div className="md:w-1/3 text-center px-8">
        <h2 className="text-2xl font-bold mb-4">Subscribe To Our Newsletter</h2>
        <p className="text-gray-500 mb-6">
          Sign up for our newsletter to receive updates on new arrivals, special offers and other discount information.
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
        <Image
          src="/placeholder.svg?height=600&width=400"
          alt="Model in coat"
          width={400}
          height={600}
          className="object-cover"
        />
      </div>
    </div>
  )
}

