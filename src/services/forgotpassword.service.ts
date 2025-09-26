"use server";

import { forgotPasswordSchema, FormStateType } from "@/schema/forgotPassword.schema";

export async function handleForgotPassword(
  formState: FormStateType,
  formData: FormData
) {
  const formValues = {
    email: formData.get("email") || "",
  };

  // Validate
  const parsedData = forgotPasswordSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        success: false,
        error: data.errors || {},
        message: data.message || "Failed to send reset link",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Password reset link sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: "Something went wrong. Please try again later.",
    };
  }
}
