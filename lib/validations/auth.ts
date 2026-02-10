import { z } from 'zod';

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(1, 'Username is required')
            .min(2, 'Username must be at least 2 characters'),
        email: z.email(),
        password: z.string().min(5),
        confirmPassword: z.string().min(5),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type SignupFormData = z.infer<typeof signupSchema>;
