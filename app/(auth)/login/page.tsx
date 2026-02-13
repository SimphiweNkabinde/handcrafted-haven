import LoginForm from "@/app/ui/auth/login-form";
import { Suspense } from "react";

const images = ['/craft-image-1.webp', '/craft-image-2.webp', '/craft-image-3.webp', '/hero.webp']

export default function Page() {

    return (
        <div className="h-full flex flex-col justify-center md:grid md:grid-cols-2 gap-20 items-center">
            <div className="hidden md:block">
                <div className="grid grid-cols-2 gap-2">
                    {images.map((path, index) => (
                        <img key={index} className="rounded-lg shadow-xl w-full h-50 object-cover" src={path} alt="display image" />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-5xl">Login</h1>
                <p className="text-sm text-gray-400">
                    <span className="font-semibold text-gray-800">Welcome back.</span>  Pick up where you left off and support the hands that make the things you love.
                </p>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}
