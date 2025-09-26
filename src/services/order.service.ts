"use server";

import { getUserId, getUserToken } from "@/lib/server-utils";
import { addressFormSchema, addressFormStateType } from "@/schema/address.schema";
import { get } from "http";



export async function handlePayment(formState:addressFormStateType,formData:FormData):
Promise<addressFormStateType>
{
    const shippingAddress={
        details:formData.get("details"),
        city:formData.get("city"),
        phone:formData.get("phone"),
    };
    const cartId=formData.get("cartId");
    const paymentMethod=formData.get("paymentMethod");


    console.log("formData ",shippingAddress,cartId);

    const parsedData = addressFormSchema.safeParse({...shippingAddress,cartId,paymentMethod});
    if(!parsedData.success){
        return{
            success:false,
            error:parsedData.error?.flatten().fieldErrors,
            message:null,
            callbackUrl:"/cart",
        };
    }
      try {
        const token = 
        await getUserToken();

            const endpoint= paymentMethod ==="cash" 
            ? `api/v1/orders/${cartId}`
            :`api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
    const res = await fetch(
      `${process.env.API_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            token: token as string,
        },
        body: JSON.stringify(shippingAddress),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Filed to place order",
        callbackUrl: "/cart",
        
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Order placed successfully",
      
      callbackUrl: paymentMethod === "cash" ? "/allorders" : data.session.url,

    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "Failed to place order",
    };
  }


}


export async function getUseOrders() {
  try {
    const userId = await getUserId();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/orders/user/${userId}`, {
     
      headers:{
        "Content-Type":"application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      return{
        data: null,
        success: false,
        message: data.message||"Error in Fetching order",
     };
    }
    return {
      data: data,
        success: true,
        message: data.message||"Fetched order successfully"
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
