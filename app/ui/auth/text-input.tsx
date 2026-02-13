import { ComponentPropsWithoutRef } from "react";

export default function TextInput({ children, ...props }: ComponentPropsWithoutRef<'input'>) {
    return (
        <input type="text" {...props} className="block border border-slate-200 h-9 rounded-md text-sm py-2 px-2.5 w-full bg-slate-50" />
    )
}
