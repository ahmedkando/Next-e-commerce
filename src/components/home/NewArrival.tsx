import React from "react";
import { Truck, Headset, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

export default function NewArrivalSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <span className="text-red-500 font-semibold mb-2 block">Featured</span>
        <h2 className="text-3xl font-bold mb-10">New Arrival</h2>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Big Item */}
          <div className="bg-black rounded-2xl relative overflow-hidden flex items-end min-h-[320px] group">
            <img
              src="/assets/image.jpeg"
              alt="PlayStation 5"
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-2xl font-semibold mb-2">PlayStation 5</h3>
              <p className="mb-4 text-gray-200">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Button className="bg-white text-black px-5 py-2 rounded-lg font-medium transition hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
          </div>

          {/* Small Items Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Women */}
            <div className="bg-gray-900 rounded-2xl relative overflow-hidden flex items-end min-h-[150px] group">
              <img
                src="/assets/image(1).jpeg"
                alt="Women's Collections"
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">Women’s Collections</h3>
                <p className="mb-3 text-sm text-gray-200">
                  Featured woman collections that give you another vibe.
                </p>
                <Button className="bg-white text-black px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Speakers */}
            <div className="bg-gray-900 rounded-2xl relative overflow-hidden flex items-end min-h-[150px] group">
              <img
                src="/assets/download (2).jpeg"
                alt="Speakers"
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">Speakers</h3>
                <p className="mb-3 text-sm text-gray-200">Amazon wireless speakers</p>
                <Button className="bg-white text-black px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Perfume */}
            <div className="bg-gray-900 rounded-2xl relative overflow-hidden flex items-end min-h-[150px] col-span-2 group">
              <img
                src="/assets/download (1).jpeg.jpeg"
                alt="Perfume"
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">Perfume</h3>
                <p className="mb-3 text-sm text-gray-200">GUCCI INTENSE-OUD EDP</p>
                <Button className="bg-white text-black px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-1">FREE AND FAST DELIVERY</h4>
            <p className="text-sm text-gray-500">Free delivery for all orders over $140</p>
          </div>
          <div>
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500">
              <Headset className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-1">24/7 CUSTOMER SERVICE</h4>
            <p className="text-sm text-gray-500">Friendly 24/7 customer support</p>
          </div>
          <div>
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-1">MONEY BACK GUARANTEE</h4>
            <p className="text-sm text-gray-500">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </section>
  );
}
