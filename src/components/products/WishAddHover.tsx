"use client";

import React from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishContext";
import { Button } from "../ui/button";

interface Props {
  productId: string;
  className?: string;
}

export default function WishAddHover({ productId, className }: Props) {
  const { addProductToWishlist } = useWishlist();

  async function handleAddWishlist() {
    try {
      await addProductToWishlist(productId);
      toast.success("Added to wishlist", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to add to wishlist", { position: "top-center" });
    }
  }

  return (
    <Button
      onClick={handleAddWishlist}
      className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 
        transition duration-300 bg-white rounded-full shadow p-2 
        hover:bg-red-50 ${className}`}
    >
      <Heart className="h-5 w-5 text-gray-600 hover:fill-red-500 hover:text-red-500 transition-colors" />
    </Button>
  );
}
