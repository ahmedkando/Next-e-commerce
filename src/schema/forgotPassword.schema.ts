import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type FormStateType = {
  success: boolean;
  error: {
    email?: string[];
  };
  message: string | null;
};
