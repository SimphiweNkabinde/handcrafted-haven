import clsx from "clsx";

export default function Tag({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={clsx("border border-gray-400 text-gray-400 text-xs rounded-3xl px-2 py-1", className)}>
            {children}
        </div>
    )
}
