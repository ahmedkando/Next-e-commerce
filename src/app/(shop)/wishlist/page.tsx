"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { HeartOff, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/context/WishContext";
import AddToCartBtn from "@/components/products/AddToProductBtn";





export default function WishPage() {
    const { wishlistDetails, removeProductFromWishlist, setWishlistDetails } = useWishlist();



    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto">
                {wishlistDetails?.data && wishlistDetails.data.length > 0 ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">
                                 Wishlist  

                              

                            </h2>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setWishlistDetails(null)}
                                className="flex items-center gap-2"
                            >
                                <HeartOff className="w-4 h-4" />
                                Clear All
                            </Button>
                        </div>

                        {/* Wishlist Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wishlistDetails.data.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden group relative"
                                >

                                    <button
                                        onClick={() => removeProductFromWishlist(product._id)}
                                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 
                               group-hover:opacity-100 transition duration-300 shadow-md"
                                    >
                                        <HeartOff className="h-4 w-4" />
                                    </button>

                                    <Link href={`/products/${product._id}/${product.category._id}`}>
                                        <Image
                                            src={product.imageCover}
                                            alt={product.title}
                                            width={400}
                                            height={300}
                                            className="w-full h-60 object-contain bg-gray-100"
                                        />
                                    </Link>

                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg line-clamp-1 mb-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-red-500 font-bold mb-4">{product.price} EGP</p>

                                        <div className="flex justify-between items-center">
                                            
                                            <AddToCartBtn
                                                productId={product._id}
                                                variant="destructive"
                                                size="sm"
                                                className="flex items-center gap-2"
                                            >
                                                Add to Cart
                                            </AddToCartBtn>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-2xl shadow">
                        <HeartOff className="w-16 h-16 text-gray-400 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your Wishlist is Empty</h2>
                        <p className="text-gray-500 mb-6">
                            Save your favorite items to find them later!
                        </p>
                        <Button asChild>
                            <Link href="/products">Browse Products</Link>
                        </Button>
                    </div>
                )}
            </div>

            <Footer />
        </section>
    );
}
