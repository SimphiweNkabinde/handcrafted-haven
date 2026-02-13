'use client';

import Link from "next/link";
import EmailInput from "./email-input";
import FormLabel from "./Formlabel";
import PasswordInput from "./password-input";
import SubmitButton from "./submit-button";
import TextInput from "./text-input";
import { useActionState } from "react";
import { RegisterState, registerUser } from "@/app/lib/actions/authenticate";

export default function RegisterForm() {
    const initialState: RegisterState = {
        message: null,
        errors: {},
        values: {}
    };
    const [state, formAction] = useActionState(registerUser, initialState)

    return (
        <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex flex-col gap-1">
                <FormLabel htmlFor="name" >Name</FormLabel>
                <div>
                    <TextInput defaultValue={state.values?.name} id="name" name="name" placeholder="Tim Davidson" />
                    <p className="text-red-500 text-xs">{state.errors?.name}</p>
                </div>

            </div>
            <div className="flex flex-col gap-1">
                <FormLabel htmlFor="email" >Email</FormLabel>
                <div>
                    <EmailInput defaultValue={state.values?.email} />
                    <p className="text-red-500 text-xs">{state.errors?.email}</p>
                </div>

            </div>
            <div className="flex flex-col gap-1">
                <FormLabel htmlFor="password" >Password</FormLabel>
                <div>
                    <PasswordInput id="password" name="password" />
                    <p className="text-red-500 text-xs">{state.errors?.password}</p>
                </div>

            </div>
            <div className="flex flex-col gap-1">
                <FormLabel htmlFor="confirmPassword" >Confirm Password</FormLabel>
                <div>
                    <PasswordInput id="confirmPassword" name="confirmPassword" />
                    <p className="text-red-500 text-xs">{state.errors?.confirmPassword}</p>
                </div>
            </div>

            <p className="text-red-500 text-xs">{state.message}</p>
            <div className="flex flex-col gap-3">
                <SubmitButton>Register</SubmitButton>
                <p className="text-sm">Already have an account? <Link className="underline" href="/login">Sign In</Link></p>
            </div>
        </form>
    )
}
