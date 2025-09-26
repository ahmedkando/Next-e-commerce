"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginFormPayload,loginFormSchema } from "@/schema/login.schema"
import Footer from "@/components/layout/Footer"
import {signIn} from "next-auth/react";
import { toast } from "sonner"
import { useRouter } from "next/navigation"



export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" }
  });

  
async function onSubmit(values: LoginFormPayload) {

  try{
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/"
    });
    console.log(res);

    if (res?.ok) {
    toast.success("Logged in successfully",{
      position: "top-center",
    });
    router.push("/");
  }
  else{
    toast.error(res?.error || "Login failed",{
      position: "top-center",
    });
    

  }
  

}  catch (error) {
    console.log(error);
  }
}

  return (
    <section className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl bg-white rounded-lg shadow-lg p-12">
          <div className="flex flex-col justify-center w-full">
            <h1 className="text-4xl font-bold mb-4">Log in to Exclusive</h1>
            <p className="mb-8 text-lg text-gray-600">Enter your details below</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email or phone" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*********" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between mt-6">
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 px-10 py-3 rounded text-white text-lg font-semibold">Log In</Button>
                  <a href="/forgetpassword" className="text-red-500 hover:underline text-lg">Forgot Password?</a>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );

}