import { z, string, email } from "zod"

export const loginSchema = z.object({
	email: email(),
	password: string().min(6),
})

export const signupSchema = z
	.object({
		username: string().min(1, { message: "Name is required" }),
		email: email(),
		password: string().min(6),
		confirmPassword: string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	})

export type Login = z.infer<typeof loginSchema>
export type Signup = z.infer<typeof signupSchema>
