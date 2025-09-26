"use client";

import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartBtn from "@/components/products/AddToProductBtn";
import ProductSlider from "@/components/products/ProductSlider";
import SectionTitle from "@/components/shared/SectionTitle";
import Productitem from "@/components/products/Productitem";
import { useWishlist } from "@/context/WishContext";
import { IProduct } from "@/interfaces/product.interface";

export default function ProductDetailsClient({
  product,
  products,
}: {
  product: IProduct;
  products: IProduct[];
}) {
  const { addProductToWishlist } = useWishlist();

  return (
    <>
      <section>
        <div className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ProductSlider images={product.images} />
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6">
              <h1 className="text-3xl font-extrabold mb-3 text-gray-900">
                {product.title}
              </h1>

              <div className="flex items-center gap-x-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-600">
                  {product.ratingsAverage}
                </span>
              </div>

              <p className="text-2xl font-bold text-red-600">{product.price} EGP</p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Add to Cart */}
              <AddToCartBtn productId={product._id} className="grow-1" variant="destructive" />

              {/* Add to Wishlist */}
              <Button
                variant="outline"
                onClick={() => addProductToWishlist(product._id)}
                className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>Add to Wishlist</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionTitle title="Related Products" subtitle="Everything you want" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {products?.map((product) => (
              <Productitem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
