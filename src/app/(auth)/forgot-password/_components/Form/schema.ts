import * as z from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default ForgotPasswordSchema;
