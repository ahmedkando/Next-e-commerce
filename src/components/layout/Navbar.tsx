"use client";

import Link from "next/link";
import { Heart, LogOut, MenuIcon, ShoppingBag, ShoppingCartIcon, Star, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWishlist } from "@/context/WishContext";




const links = [
  {
    path: "/",
    label: "Home",
  },

  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/brands",
    label: "Brands",
  },

];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cartDetails } = useCart();
  const { wishlistDetails: wishlist } = useWishlist();


  return (
    <section className="py-4">
      <div className="w-full flex justify-center">
        <nav className="flex items-center justify-between w-full max-w-4xl px-4 rounded-xl bg-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === link.path && "underline"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth / Icons */}
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading" ? (
              <span>Loading...</span>
            ) : status === "unauthenticated" ? (
              <>
                <Button variant="outline" asChild>
                  <Link href={"/login"}>Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href={"/register"}>Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Wishlist */}
                <Link href="/wishlist" className="relative">
                  {wishlist && wishlist.count > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 rounded-full min-w-[20px] text-xs font-mono tabular-nums"
                      variant="destructive"
                    >
                      {wishlist.count}
                    </Badge>
                  )}
                  <Heart className="size-7" />
                </Link>


                <Link href="/cart" className="relative">
                  {cartDetails && (
                    <Badge
                      className="absolute -top-2 -right-2 rounded-full min-w-5px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      {cartDetails?.numOfCartItems}
                    </Badge>
                  )}
                  <ShoppingCartIcon className="size-7" />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <User className="h-6 w-6 size-7" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-56 rounded-xl border border-purple-500/30 
               bg-gradient-to-b from-gray-700/80 to-black/80 
               backdrop-blur-lg shadow-xl text-white p-2 space-y-1"
                  >
                    {/* Manage My Account */}
                    <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2">
                      <User className="w-5 h-5" />
                      <span>Manage Account</span>
                    </DropdownMenuItem>


                    <DropdownMenuItem asChild>
                      <Link
                        href="/allorders"
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>All Orders</span>
                      </Link>
                    </DropdownMenuItem>


                    <DropdownMenuItem asChild>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Favourites</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/20 my-1" />

                    {/* Logout */}
                    <DropdownMenuItem
                      className="flex items-center gap-3 cursor-pointer hover:bg-red-600/70 rounded-lg px-3 py-2 text-red-400"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" >
                <MenuIcon className="h-4 w size-7-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">
                {/* Nav Links */}
                <div className="flex flex-col gap-6">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      className={cn(
                        "font-medium",
                        pathname === link.path && "underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Auth + Icons */}
                <div className="mt-6 flex flex-col gap-6">
                  {status === "loading" ? (
                    <span>Loading...</span>
                  ) : status === "unauthenticated" ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href={"/login"}>Sign in</Link>
                      </Button>
                      <Button asChild>
                        <Link href={"/register"}>Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-6">
                      {/* Wishlist */}
                      <Link href="/wishlist" className="relative">
                        {wishlist && wishlist.count > 0 && (
                          <Badge
                            className="absolute -top-2 -right-2 rounded-full min-w-[20px] text-xs font-mono tabular-nums"
                            variant="destructive"
                          >
                            {wishlist.count}
                          </Badge>
                        )}
                        <Heart className="size-7" />
                      </Link>

                      {/* Cart */}
                      <Link href="/cart" className="relative">
                        {cartDetails && (
                          <Badge
                            className="absolute -top-2 -right-2 rounded-full min-w-5px-1 font-mono tabular-nums"
                            variant="destructive"
                          >
                            {cartDetails?.numOfCartItems}
                          </Badge>
                        )}
                        <ShoppingCartIcon className="size-7" />
                      </Link>

                      {/* Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <User className="h-6 w-6 size-7" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          className="w-56 rounded-xl border border-purple-500/30 
               bg-gradient-to-b from-gray-700/80 to-black/80 
               backdrop-blur-lg shadow-xl text-white p-2 space-y-1"
                        >
                          {/* Manage My Account */}
                          <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2">
                            <User className="w-5 h-5" />
                            <span>Manage Account</span>
                          </DropdownMenuItem>


                          <DropdownMenuItem asChild>
                            <Link
                              href="/allorders"
                              className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2"
                            >
                              <ShoppingBag className="w-5 h-5" />
                              <span>All Orders</span>
                            </Link>
                          </DropdownMenuItem>


                          <DropdownMenuItem asChild>
                            <Link
                              href="/wishlist"
                              className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-2"
                            >
                              <Heart className="w-5 h-5" />
                              <span>Favourites</span>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-white/20 my-1" />

                          {/* Logout */}
                          <DropdownMenuItem
                            className="flex items-center gap-3 cursor-pointer hover:bg-red-600/70 rounded-lg px-3 py-2 text-red-400"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );

};

export default Navbar;
