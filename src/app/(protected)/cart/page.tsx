"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { removeFromCart, reomveUserCart, updateQTYProductCart } from "@/services/cart.service";
import { toast } from "sonner";
import { ShoppingCart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge"


export default function CartPage() {

  const { cartDetails, setCartDetails } = useCart();

  async function removeCartItems() {
    const res = await reomveUserCart();
    if (res?.message === "success") {
      toast.success("Cart removed sucessfully");
      setCartDetails(null);
    } else {
      toast.error(res?.message || "Something went wrong")

    }
  }

  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    console.log(res.data);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, { position: "top-center" });

    }
  }

  async function updateQuantityProductCart(productId: string, count: number) {
    const res = await updateQTYProductCart(productId, count);
    console.log(res.data);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, { position: "top-center" });

    }
  }



  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">


        {cartDetails && cartDetails.data.products.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails.data.products.map((product) => (
                    <TableRow
                      key={product.product._id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={product.product.imageCover}
                              alt={product.product.title}
                              width={64}
                              height={64}
                              className="rounded-md object-cover"
                            />

                            <Badge
                              onClick={() => removeProductFromCart(product.product._id)}
                              className="absolute -top-2 -right-2 flex items-center justify-center 
              w-6 h-6 rounded-full bg-red-500 text-white shadow-md 
              hover:bg-red-600 transition-colors cursor-pointer"
                            >
                              <X />
                            </Badge>
                          </div>

                          <span className="font-medium">{product.product.title}</span>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">{product.price}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantityProductCart(product.product._id, product.count - 1)
                            }
                        
                          >
                            -
                          </Button>

                          <span className="px-2 font-medium">{product.count}</span>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantityProductCart(product.product._id, product.count + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>

                      <TableCell className="text-right font-semibold">
                        {product.price * product.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>

              <div className="flex justify-between mt-6">
                <Button variant="outline" >
                  <Link href="/products"> Return To Shop</Link>
                </Button>
                <Button onClick={removeCartItems} variant="destructive">Remove All</Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

              <div className="flex items-center gap-4 w-full md:w-1/2">
                <Input placeholder="Coupon Code" className="flex-1" />
                <Button variant="destructive">Apply Coupon</Button>
              </div>


              <div className="w-full md:w-1/2 border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="font-bold mb-6 text-xl">Cart Total</h3>
                <ul className="divide-y divide-gray-200 mb-6 text-gray-700">
                  <li className="py-4 flex justify-between">
                    <span>Subtotal:</span> <span>{cartDetails.data.totalCartPrice}</span>
                  </li>
                  <li className="py-4 flex justify-between">
                    <span>Shipping:</span> <span className="text-green-600">Free</span>
                  </li>
                  <li className="py-4 flex justify-between font-bold bg-gray-50 rounded-md px-2">
                    <span>Total:</span> <span>{cartDetails.data.totalCartPrice}</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button variant="destructive" className="w-full max-w-xs hover:bg-red-700" asChild>
                    <Link href={"/checkout"}>
                    Proceed to Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-gray-50 rounded-2xl shadow-sm">
            <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t added anything yet.
            </p>
            <Button asChild>
              <Link href="/products">Return to Shop</Link>
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}
