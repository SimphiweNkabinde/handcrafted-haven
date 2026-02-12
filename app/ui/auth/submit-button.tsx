import { ComponentPropsWithoutRef } from "react";

export default function SubmitButton({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
    return (
        <button type="submit" className="w-full bg-gray-900 text-white text-lg rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer">{children}</button>
    )
}
