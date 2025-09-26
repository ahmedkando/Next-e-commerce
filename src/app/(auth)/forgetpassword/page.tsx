"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { forgotPasswordSchema, ForgotPasswordSchema } from "@/schema/forgotPassword.schema";
import { handleForgotPassword } from "@/services/forgotpassword.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Footer from "@/components/layout/Footer";

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordSchema) {
    const formData = new FormData();
    formData.append("email", values.email);

    const result = await handleForgotPassword(
      { success: false, error: {}, message: null },
      formData
    );

    if (result.success) {
      toast.success(result.message || "Password reset link sent!");
    } else {
      toast.error(result.message || "Error sending reset link.");
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                Send Reset Link
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </section>
  );
}
