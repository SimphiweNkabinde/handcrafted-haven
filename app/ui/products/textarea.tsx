import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export default function Textarea({ className, ...props }: ComponentPropsWithoutRef<'textarea'>) {
    return (
        <textarea {...props}
            className={clsx("block border border-slate-200 rounded-md text-sm py-2 px-2.5 w-full bg-slate-50", className)}
        />
    )
}
