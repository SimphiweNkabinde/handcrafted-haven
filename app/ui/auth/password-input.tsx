import { ComponentPropsWithoutRef } from "react";

export default function PasswordInput({ children, ...props }: ComponentPropsWithoutRef<'input'>) {
    return (
        <input type="password" {...props} className="block h-9 border border-slate-200 rounded-md text-sm py-2 px-2.5 w-full bg-slate-50" />
    )
}
