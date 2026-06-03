import { z, string, email } from "zod"

const MIN_PASSWORD_LENGTH = 6

export const loginSchema = z.object({
	email: email(),
	password: string().min(MIN_PASSWORD_LENGTH),
})

export const signupSchema = z
	.object({
		username: string().min(1, { message: "Name is required" }),
		email: email(),
		password: string().min(MIN_PASSWORD_LENGTH),
		confirmPassword: string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	})

export type Login = z.infer<typeof loginSchema>
export type Signup = z.infer<typeof signupSchema>
