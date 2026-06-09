import { Button } from "@/shared/components/ui/button"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "@/shared/components/ui/card"
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useAuth } from "./hooks/useAuth"
import { signupSchema, type Signup } from "./validation/schemas"
import type {
	UseFormRegister,
	FieldErrors,
	FieldError as RHFFieldError,
	UseFormRegisterReturn,
} from "react-hook-form"

type SignupFieldProps = {
	id: string
	label: string
	error?: RHFFieldError
	registration: UseFormRegisterReturn
	type?: string
	autoComplete?: string
	placeholder: string
}

function SignupField({ id, label, error, registration, type = "text", autoComplete, placeholder }: SignupFieldProps) {
	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<Input id={id} type={type} autoComplete={autoComplete} {...registration} placeholder={placeholder} />
			{error && <FieldError>{error.message}</FieldError>}
		</Field>
	)
}

type SignupFormFieldsProps = {
	register: UseFormRegister<Signup>
	errors: FieldErrors<Signup>
	isValid: boolean
	onSubmit: React.ComponentProps<"form">["onSubmit"]
}

function SignupFormFields({ register, errors, isValid, onSubmit }: SignupFormFieldsProps) {
	return (
		<CardContent>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<SignupField id="username" label="Username" autoComplete="username" registration={register("username")} error={errors.username} placeholder="Username" />
				<SignupField id="signup-email" label="Email" autoComplete="email" registration={register("email")} error={errors.email} placeholder="Email" />
				<SignupField id="signup-password" label="Password" type="password" autoComplete="new-password" registration={register("password")} error={errors.password} placeholder="Password" />
				<SignupField id="confirmPassword" label="Confirm Password" type="password" autoComplete="new-password" registration={register("confirmPassword")} error={errors.confirmPassword} placeholder="Confirm Password" />
				<Button type="submit" disabled={!isValid} className="w-full">
					Signup
				</Button>
			</form>
		</CardContent>
	)
}

function Signup() {
	const navigate = useNavigate()
	const { signup } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ resolver: zodResolver(signupSchema) })

	const onSubmit = async (data: Signup) => {
		signup(data)
		await navigate("/login")
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Signup your account</CardTitle>
				<CardDescription>Register new account</CardDescription>
			</CardHeader>
			<SignupFormFields
				register={register}
				errors={errors}
				isValid={isValid}
				onSubmit={handleSubmit(onSubmit)}
			/>
			<CardAction>
				<Button variant="link" onClick={() => navigate("/login")}>
					Have an account? Login
				</Button>
			</CardAction>
		</Card>
	)
}

export default Signup
