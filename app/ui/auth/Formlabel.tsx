import { ComponentPropsWithoutRef } from "react";

export default function FormLabel({ children, ...props }: ComponentPropsWithoutRef<'label'>) {
    return (
        <label {...props} className="text-sm" >{children}</label>
    )
}
