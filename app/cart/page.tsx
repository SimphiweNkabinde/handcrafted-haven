import Link from "next/link";
import { fetchUserCartItem } from "../lib/data";
import PageHeader from "../ui/components/page-header";
import { ChevronLeftIcon, ChevronRightIcon, LockClosedIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { addToCart, clearUserCart, reduceCartItemQty, removeCartItem } from "../lib/actions/cart-actions";

export default async function Page() {
    const cartItems = await fetchUserCartItem()
    return (
        <div>
            <PageHeader heading="Cart" intro="Manage your cart items before checkout" />
            <div className="flex flex-col gap-5 max-w-xl">
                <div className="flex flex-col gap-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="relative bg-gray-50 border border-gray-200 rounded p-2 grid items-center grid-cols-[70px_auto_50px] gap-3">
                            <form className="absolute -top-1 -end-1 text-gray-600" action={async () => {
                                "use server";
                                await removeCartItem(item.product_id);
                            }}
                            >
                                <button className="cursor-pointer"><XCircleIcon className="w-6" /></button>
                            </form>

                            <img src={item.product_image_url} className="w-full object-cover rounded" alt="" />
                            <div className="flex flex-col gap-2 text-sm">
                                <Link className="underline" href={`/products/${item.product_id}`}>{item.product_name}</Link>
                                <p className="font-semibold">{'$'}{item.product_price}</p>
                            </div>
                            <div className="flex gap-1 items-center">
                                <form className="flex items-center" action={async () => {
                                    "use server";
                                    await reduceCartItemQty(item.product_id);
                                }}
                                >
                                    <button className="rounded-full bg-gray-200 cursor-pointer"><ChevronLeftIcon className="w-4 text-gray-500" /></button>
                                </form>

                                <span>{item.quantity}</span>

                                <form className="flex items-center" action={async () => {
                                    "use server";
                                    await addToCart(item.product_id);
                                }}
                                >
                                    <button className="rounded-full bg-gray-200 cursor-pointer"><ChevronRightIcon className="w-4 text-gray-500" /></button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-lg flex justify-between">
                    <p>Total Cost:{'$'}{cartItems.map(i => (i.product_price * i.quantity)).reduce((a, b) => a + b, 0)}</p>
                    <p>Total Items: {cartItems.map(i => i.quantity).reduce((a, b) => a + b, 0)}</p>
                </div>
                <div className="flex">
                    <form className="flex items-center" action={async () => {
                        "use server";
                        await clearUserCart();
                    }}
                    >
                        <button className="bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer flex gap-1 items-center">
                            <LockClosedIcon className="w-5" />
                            <span>Checkout</span>
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}
