import RegisterForm from "@/app/ui/auth/register-form";

const images = ['/craft-image-1.webp', '/craft-image-2.webp', '/craft-image-3.webp', '/hero.webp']

export default function Page(props: PageProps<'/login'>) {
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
                <h1 className="text-5xl">Register</h1>
                <p className="text-sm text-gray-400">
                    <span className="font-semibold text-gray-800">Support the makers.</span>  Join a community that values the person behind the product. Create an account to start your collection of one-of-a-kind treasures.
                </p>
                <RegisterForm />
            </div>
        </div>
    )
}
