"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/services/Wish.service";
import { IWishlistResponse } from "@/interfaces/wishlist.interface";

interface IWishlistContext {
  wishlistDetails: IWishlistResponse | null;
  setWishlistDetails: React.Dispatch<
    React.SetStateAction<IWishlistResponse | null>
  >;
  getWishlistDetails: () => Promise<void>;
  addProductToWishlist: (productId: string) => Promise<void>;
  removeProductFromWishlist: (productId: string) => Promise<void>;
    clearWishlist: () => void;
}

export const WishlistContext = createContext<IWishlistContext | null>(null);

export const WishlistContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [wishlistDetails, setWishlistDetails] =
    useState<IWishlistResponse | null>(null);

  // Fetch wishlist
  async function getWishlistDetails() {
    const res = await getUserWishlist();
    if (res.success) {
      setWishlistDetails(res.data);
    } else {
      setWishlistDetails(null);
    }
  }


  async function addProductToWishlist(productId: string) {
    const res = await addToWishlist(productId);
    if (res.success) {
      await getWishlistDetails(); 
    }
  }

  async function removeProductFromWishlist(productId: string) {
    const res = await removeFromWishlist(productId);
    if (res.success) {
      await getWishlistDetails(); 
    } 
  }
  
  async function clearWishlist() {
  setWishlistDetails(null);
}

  useEffect(() => {
    getWishlistDetails();
  }, []);

  return (
    <WishlistContext.Provider
  value={{
    wishlistDetails,
    setWishlistDetails,
    getWishlistDetails,
    addProductToWishlist,
    removeProductFromWishlist,
    clearWishlist, 
  }}
>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistContextProvider");
  }
  return context;
}
