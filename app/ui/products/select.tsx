import { ComponentPropsWithoutRef } from "react";

export default function Select({ children, ...props }: ComponentPropsWithoutRef<'select'>) {
    return (
        <select
            className="block w-full cursor-pointer rounded-md border border-slate-200 py-2 px-4 text-sm bg-slate-50"
            {...props}
        >
            {children}
        </select>
    )
}
