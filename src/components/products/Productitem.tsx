"use client";

import React from "react";
import { IProduct } from "@/interfaces/product.interface";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCartBtn from "./AddToProductBtn";
import { useWishlist } from "@/context/WishContext"; 
import { toast } from "sonner";
import WishAddHover from "./WishAddHover";


export default function Productitem({ product }: { product: IProduct }) {
  const { addProductToWishlist } = useWishlist();

  async function handleAddWishlist() {
    try {
      await addProductToWishlist(product._id);
      toast.success("Added to wishlist ❤️", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to add to wishlist", { position: "top-center" });
    }
  }

  return (
    <div>
      <picture className="relative group overflow-hidden">
        {/* Product Image */}
        <Link href={`/products/${product._id}/${product.category._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            loading="lazy"
            className="w-full h-[15.625rem] object-contain mb-4 bg-gray-100"
          />
        </Link>

        
        <AddToCartBtn
          productId={product._id}
          className="w-full absolute bottom-0 translate-y-full group-hover:translate-y-0 
                     invisible group-hover:visible transition duration-300"
        />

        
        <Button
          size="icon"
          variant="outline"
          onClick={handleAddWishlist}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                     transition duration-300 bg-white rounded-full shadow 
                     hover:bg-red-50"
        >
            <WishAddHover productId={product._id} />     
       </Button>
      </picture>

      {/* Title & Price */}
      <Link href={`/products/${product._id}/${product.category._id}`}>
        <h3 className="font-medium line-clamp-1">{product.title}</h3>
      </Link>

      <div className="flex items-center gap-x-2">
        <span className="font-medium text-red-500">{product.price} EGP</span>
        <div className="flex items-center gap-x-1">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-500">
            {product.ratingsAverage}
          </span>
        </div>
      </div>
    </div>
  );
}
