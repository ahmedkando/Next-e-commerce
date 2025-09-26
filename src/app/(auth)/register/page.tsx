"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { registerFormSchema } from "@/schema/register.schema"
import { Registerschema } from "@/schema/register.schema"
import Footer from "@/components/layout/Footer"
import { useRouter } from "next/navigation"
import { handleRegister } from "@/services/register.service"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"


const formState = {
  success:false,
  error:{},
  message:null,
};


type formStateTope={
  success:boolean;
  error:{
    name?:string[];
    email?:string[];
    password?:string[];
    rePassword?:string[];
    phone?:string[];
  };
  message:string|null;
}

export default function LoginPage(){
  const [action ,formAction]=useActionState(handleRegister,formState);
  const router = useRouter();
  const form = useForm<Registerschema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name:"",email: "", password: "", rePassword :"", phone:""}
  });


  useEffect(() => {
    if (action) {
      if (!action.success&& action.message) {
        toast.error(action.message,
          {
            position: "top-center"
          }
        );
      }
      if (action.success&&action.message) {
        toast.success(action.message,
          {
            position: "top-center"
          });
        router.push('/login');
      }
    } 
  }, [action,router]);



   return (
    <section className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl bg-white rounded-lg shadow-lg p-12">
          <div className="flex flex-col justify-center w-full">
            <h1 className="text-4xl font-bold mb-4">Sign up to Exclusive</h1>
            <p className="mb-8 text-lg text-gray-600">Enter your details below</p>

            <Form {...form}>
              <form  action={formAction}className="space-y-8">

                 {/***********name field *********/}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="******" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage >
                        {action?.error?.name?.[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

               {/***********email field *********/}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@domain" {...field} type ="email" className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage >
                        {action?.error?.email?.[0]}
                      </FormMessage>                    
                      </FormItem>
                  )}
                />
                {/***********password field *********/}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*********" {...field} autoComplete="off" className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage >
                        {action?.error?.password?.[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/***********rePassword field *********/}
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*********" {...field} autoComplete="off" className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage >
                        {action?.error?.rePassword?.[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {/***********phone field *********/}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="*********" {...field} autoComplete="off"className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage >
                        {action?.error?.phone?.[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between mt-6">
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 px-10 py-3 rounded text-white text-lg font-semibold">submit</Button>
                  
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