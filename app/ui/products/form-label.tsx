import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export default function FormLabel({ className, children, ...props }: ComponentPropsWithoutRef<'label'>) {
    return (
        <label className={clsx("", className)} {...props}>{children}</label>
    )
}
