import clsx from "clsx"
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  )
}
