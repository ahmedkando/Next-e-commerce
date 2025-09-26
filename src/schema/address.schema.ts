import * as z from "zod";

export const addressFormSchema = z.object({
  cartId: z
    .string()
    .nonempty({ message: "cartId is required" }),

  details: z
    .string()
    .nonempty({ message: "Address is required" })
    .min(3, { message: "Address must be at least 3 characters long" }),

  city: z
    .string()
    .nonempty({ message: "City is required" })
    .min(3, { message: "City must be at least 3 characters long" }),

  phone: z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^(?:\+20|0020)?01[0-2,5][0-9]{8}$/, {
      message: "Please enter a valid phone number",
    }),

  paymentMethod: z.enum(["cash", "card"], {
    message: "Payment method is required",
  }),
});

export type addressFormType = z.infer<typeof addressFormSchema>;

export const addressFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: null,
    callbackUrl: "",

};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: string | null;
  callbackUrl?: string;
};
