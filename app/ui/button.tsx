import clsx from "clsx"

export default function Button({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <button
            className={clsx(
                "bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer",
                className
            )}>
            {children}
        </button>
    )
}
