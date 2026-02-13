'use client';

import { authenticate } from "@/app/lib/actions/authenticate";
import EmailInput from "@/app/ui/auth/email-input";
import FormLabel from "@/app/ui/auth/Formlabel";
import PasswordInput from "@/app/ui/auth/password-input";
import SubmitButton from "@/app/ui/auth/submit-button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function LoginForm() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <form className="flex flex-col gap-4" action={formAction}>
            <div className="flex flex-col gap-1">
                <FormLabel htmlFor="email" >Email</FormLabel>
                <EmailInput />
            </div>
            <div className="flex flex-col gap-1">
                <FormLabel htmlFor="password" >Password</FormLabel>
                <PasswordInput id="password" name="password" />
            </div>
            {errorMessage && (
                <span className="flex items-center gap-1">
                    <ExclamationCircleIcon className="text-red-500 w-5" />
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                </span>
            )}
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <div className="flex flex-col gap-3">
                <SubmitButton>Login</SubmitButton>
                <p className="text-sm">Don't have an account? <Link className="underline" href="/register">Sign up</Link></p>
            </div>

        </form>
    )
}
