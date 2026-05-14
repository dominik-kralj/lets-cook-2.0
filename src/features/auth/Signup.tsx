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

export function Signup() {
	const navigate = useNavigate()
	const { signup } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: zodResolver(signupSchema),
	})

	const onSubmit = async (data: Signup) => {
		signup(data)
		await navigate("/login")
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Signup your account</CardTitle>
				<CardDescription>Register new account</CardDescription>
				<CardAction>
					<Button variant="link" onClick={() => navigate("/login")}>
						Have an account? Login
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<Field data-invalid={!!errors.username}>
						<FieldLabel>Username</FieldLabel>
						<Input
							{...register("username")}
							placeholder="Username"
						/>
						{errors.username && (
							<FieldError>{errors.username.message}</FieldError>
						)}
					</Field>

					<Field data-invalid={!!errors.email}>
						<FieldLabel>Email</FieldLabel>
						<Input {...register("email")} placeholder="Email" />
						{errors.email && (
							<FieldError>{errors.email.message}</FieldError>
						)}
					</Field>

					<Field data-invalid={!!errors.password}>
						<FieldLabel>Password</FieldLabel>
						<Input
							type="password"
							{...register("password")}
							placeholder="Password"
						/>
						{errors.password && (
							<FieldError>{errors.password.message}</FieldError>
						)}
					</Field>

					<Field data-invalid={!!errors.confirmPassword}>
						<FieldLabel>Confirm Password</FieldLabel>
						<Input
							type="password"
							{...register("confirmPassword")}
							placeholder="Confirm Password"
						/>
						{errors.confirmPassword && (
							<FieldError>
								{errors.confirmPassword.message}
							</FieldError>
						)}
					</Field>

					<Button
						type="submit"
						disabled={!isValid}
						className="w-full"
					>
						Signup
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
