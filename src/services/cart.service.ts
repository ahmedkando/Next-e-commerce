"use server";

import { getUserToken } from "@/lib/server-utils";
import { error } from "console";
import { any, success } from "zod";


export async function getUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      headers:{
        token: token as string,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return{
        data: null,
        success: false,
        message: data.message || "Error in Fetching cart",

      };
    }
    return {
             
       data: data,
        success: true,
        message: data.message || "Fetched cart successfully",
  
    };
  } catch (error) {
    console.error(error);
    return {
       data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

export async function reomveUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method:"DELETE",
      headers:{
        token: token as string,
      },
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return{
        data: null,
        success: false,
        message: data.message || " Error in removing cart",
    
      };
    }
    return {
      data: data,
        success: true,
        message: data.message || "Removed cart successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
          
    };
  }
}


export async function addToCart(productId:string) {
  try {
    const token = await getUserToken();
    if(!token){
      return{
      data:null,
      success:false,
      message:"Plaese login to add to cart",
      };

    }

    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token: token as string,
      },
      body:JSON.stringify({productId}),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return{
        data: null,
        success: false,
        message: data.message || " Adding to cart failed",
     };
    }
    return {
      data: data,
        success: true,
        message: data.message || " Adding to cart successed"
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

export async function removeFromCart(productId:string) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${productId}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        token: token as string,
      },
      body:JSON.stringify({productId}),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return{
        data: null,
        success: false,
        message: data.message||"Removed from cart failed",
     };
    }
    return {
      data: data,
        success: true,
        message: data.message||"Removed from cart successed"
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

export async function updateQTYProductCart(productId:string, count:number) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${productId}`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        token: token as string,
      },
      body:JSON.stringify({ count }),
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return{
        data: null,
        success: false,
        message: data.message||"Updated from cart failed",
     };
    }
    return {
      data: data,
        success: true,
        message: data.message||"Updated from cart successed"
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

