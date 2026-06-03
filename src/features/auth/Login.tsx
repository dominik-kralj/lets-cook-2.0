import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, type Login } from "./validation/schemas"
import { useAuth } from "./hooks/useAuth"

import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card"
import { useNavigate } from "react-router"
import type { UseFormRegister, FieldErrors } from "react-hook-form"

type LoginFormFieldsProps = {
	register: UseFormRegister<Login>
	errors: FieldErrors<Login>
	isValid: boolean
	onSubmit: React.FormEventHandler
}

function LoginFormFields({ register, errors, isValid, onSubmit }: LoginFormFieldsProps) {
	return (
		<CardContent>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<Field data-invalid={!!errors.email}>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input id="email" autoComplete="email" {...register("email")} placeholder="Email" />
					{errors.email && <FieldError>{errors.email.message}</FieldError>}
				</Field>
				<Field data-invalid={!!errors.password}>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<Input id="password" type="password" autoComplete="current-password" {...register("password")} placeholder="Password" />
					{errors.password && <FieldError>{errors.password.message}</FieldError>}
				</Field>
				<Button type="submit" disabled={!isValid} className="w-full">
					Login
				</Button>
			</form>
		</CardContent>
	)
}

function Login() {
	const navigate = useNavigate()
	const { login } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ resolver: zodResolver(loginSchema) })

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>Enter your Email and Password</CardDescription>
				<CardAction>
					<Button variant="link" onClick={() => navigate("/signup")}>Sign Up</Button>
				</CardAction>
			</CardHeader>
			<LoginFormFields
				register={register}
				errors={errors}
				isValid={isValid}
				onSubmit={handleSubmit((data: Login) => login(data))}
			/>
		</Card>
	)
}

export default Login
