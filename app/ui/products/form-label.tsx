import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export default function FormLabel({ className, children, ...props }: ComponentPropsWithoutRef<'label'>) {
    return (
        <label htmlFor="short-description" className={clsx("", className)} {...props}>{children}</label>
    )
}
