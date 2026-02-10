import clsx from "clsx";
import { ComponentPropsWithoutRef, HTMLProps } from "react";

export default function TextInput({ className, ...props }: ComponentPropsWithoutRef<'input'>) {
    return (
        <input {...props}
            className={clsx("block border border-slate-200 rounded-md text-sm py-2 px-2.5 w-full bg-slate-50", className)}
            type="text" />
    )
}
