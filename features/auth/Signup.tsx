'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SignupFormData, signupSchema } from '@/lib/validations/auth';

export function Signup() {
    const { handleSubmit, control, formState } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { isSubmitting } = formState;

    function onSubmit(data: SignupFormData) {
        toast('You submitted the following values:', {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: 'bottom-right',
            classNames: {
                content: 'flex flex-col gap-2',
            },
            style: {
                '--border-radius': 'calc(var(--radius)  + 4px)',
            } as React.CSSProperties,
        });
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Signup</CardTitle>

                <CardDescription>Enter your information to create an account!</CardDescription>
            </CardHeader>

            <CardContent>
                <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="username">Username</FieldLabel>
                                    <Input
                                        {...field}
                                        id="username"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Username"
                                        autoComplete="username"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Email"
                                        autoComplete="email"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        type="password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="confirmPassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Confirm Password"
                                        autoComplete="new-password"
                                        type="password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex justify-end">
                <Button type="submit" form="signup-form" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account...' : 'Submit'}
                </Button>
            </CardFooter>
        </Card>
    );
}
