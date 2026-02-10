import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

export default function Button({ children, className, ...props }: ComponentPropsWithoutRef<'button'>) {
    return (
        <button {...props}
            className={clsx(
                "rounded-lg px-4 py-1.5 cursor-pointer",
                className,
                { "bg-gray-900 text-white hover:bg-gray-800": className?.includes("primary") },
                { "bg-gray-50 border border-gray-200 hover:bg-gray-100": className?.includes("secondary") }
            )}>
            {children}
        </button>
    )
}
