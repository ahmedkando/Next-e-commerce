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
import Footer from "@/components/layout/Footer"
import { useRouter } from "next/navigation"
import {  useActionState, useEffect } from "react"
import { toast } from "sonner"
import { handlePayment } from "@/services/order.service"
import { useCart } from "@/context/CartContext"
import { addressFormSchema, addressFormState, addressFormType } from "@/schema/address.schema"

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"


export default function CheckoutPage() {
    const { cartDetails, setCartDetails } = useCart()
    const [action, formAction] = useActionState(handlePayment, addressFormState);
    const router = useRouter();
    const form = useForm<addressFormType>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            details: "",
            city: "",
            phone: "",
            cartId: "",
            paymentMethod: "cash",
        },
    });
    useEffect(() => {
        if (cartDetails) {
            form.setValue("cartId", cartDetails.data._id);

        }
    }, [cartDetails,form]);
    console.log(action);


    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (action) {
            if (action.success && action.message) {
               if(form.getValues("paymentMethod")==="cash"){
                 toast.success(action.message, {
                    position: "top-center",
                });
                setCartDetails(null);
                timeout = setTimeout(() => {
                    router.push(action.callbackUrl||"/allorders");
                }, 2000);
               }else{
                window.location.href=action.callbackUrl as string;
               }

            }
            else if (!action.error && action.message) {
                toast.error(action.message, {
                    position: "top-center",
                });
            }
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            };
        }
    }, [action, router]);

    return (
        <section className="min-h-screen flex flex-col justify-between bg-gray-50">
            <div className="flex-1 flex items-center justify-center py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl bg-white rounded-lg shadow-lg p-12">
                    <div className="flex flex-col justify-center w-full">
                        <h1 className="text-4xl font-bold mb-4">Checkout</h1>

                        <Form {...form}>
                            <form action={formAction} className="space-y-8">
                                {/***********cartId field *********/}
                                <FormField

                                    control={form.control}
                                    name="cartId"
                                    render={({ field }) => (
                                        <FormItem hidden>
                                            <FormControl>
                                                <Input {...field} value={cartDetails?.cartId} hidden />
                                            </FormControl>
                                            <FormMessage>
                                                {action?.error?.cartId?.[0]}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/***********details field *********/}
                                <FormField
                                    control={form.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Details</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="******"
                                                    {...field}
                                                    className="h-12 text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {action?.error?.details?.[0]}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {/***********city field *********/}
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your city"
                                                    {...field}
                                                    className="h-12 text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {action?.error?.city?.[0]}
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
                                                <Input
                                                    type="tel"
                                                    placeholder="******"
                                                    {...field}
                                                    autoComplete="off"
                                                    className="h-12 text-lg"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {action?.error?.phone?.[0]}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Payment Method</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={"cash"}
                                                    name={field.name}
                                                    className="flex flex-col"
                                                >
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="cash" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                          Cash
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center gap-3">
                                                        <FormControl>
                                                            <RadioGroupItem value="card" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Card
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <div className="flex items-center justify-between mt-6">
                                    <Button
                                        type="submit"
                                        className="bg-red-500 hover:bg-red-600 px-10 py-3 rounded text-white text-lg font-semibold">
                                        Submit
                                    </Button>
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