import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import PageHeader from "../ui/components/page-header";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await auth()
    if (!session) redirect("/login")

    return (
        <div className="text-center">
            <PageHeader
                heading="✅ Order Porcessed Successfully"
                intro="We've received your order & payment! You will be contacted by our delivery team to schedule the delivery of your handcrafted Products" />
            <ShoppingBagIcon className="w-15 text-yellow-500 mx-auto" />
            <p>Thank you for Shopping with Us</p>
            <Link href="/products" className="text-blue-500 underline">Continue Shopping</Link>
        </div>

    )
}
