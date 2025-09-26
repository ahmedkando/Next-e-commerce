"use server"

import { FormStateType } from "@/schema/forgotPassword.schema";
import { registerFormSchema } from "@/schema/register.schema";
import { formStateTope } from "@/schema/register.schema";

export async function handleRegister(formState: formStateTope, formData: FormData): Promise<formStateTope> {
  const formValues = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    rePassword: formData.get("rePassword") || "",
    phone: formData.get("phone") || "",
  };

  const parsedData = registerFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();
    console.log("Signup response:", data);

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message, 
      };
    }

    return {
      success: true,
      error: {},
      message: data.message, 
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "Unexpected error",
    };
  }
}
