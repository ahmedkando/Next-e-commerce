import *as  z  from "zod"
export const registerFormSchema = z.object({
    name:z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),

  email: z.email({
    message: "Please enter a valid email address"
  }),

  password: z
    .string()
    .nonempty({ message: "Password is requierd " })
    .min(6, {
      message: "Password must be at least 6 characters long"
    }),
    rePassword:z
    .string()
    .nonempty({ message: "Please re-enter your password" })
    .min(6, {
      message: "Password must be at least 6 characters long"
    }),
    phone:z
    .string()
    .nonempty({ message: "Phone number is required" })
    .regex(/^(?:\+20|0020)?01[0-2,5][0-9]{8}$/, { 
  message: "Please enter a valid phone number" 
}),
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"], 
});
export type Registerschema = z.infer<typeof registerFormSchema>;



export const formState = {
  success:false,
  error:{},
  message:null,
};


export type formStateTope={
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