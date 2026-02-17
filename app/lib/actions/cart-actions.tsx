import { auth } from "@/auth";
import postgres from "postgres";
import { CartItem, User } from "../definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function addToCart(productId: string) {
    const session = await auth()
    if (!session?.user?.email) return { error: 'missing auth session', }

    try {
        const user = await sql<User[]>`SELECT id FROM users WHERE email = ${session.user.email}`
        if (!user.length) {
            return { error: 'User does not exist' };
        }

        const cartItems = await sql<CartItem[]>`
            SELECT id, quantity 
            FROM cart_items
            WHERE user_id = ${user[0].id} AND product_id = ${productId}`

        if (cartItems.length) {
            await sql`UPDATE cart_items SET quantity = ${cartItems[0].quantity + 1} WHERE id = ${cartItems[0].id}`
        } else {
            await sql`
                INSERT INTO cart_items (user_id, product_id, quantity)
                VALUES ( ${user[0].id}, ${productId}, ${1})
            `;
        }

        revalidatePath(`/cart`)
    } catch (error) {
        return {
            message: 'Database Error: Failed to add Product to cart.',
        };
    }
}

export async function reduceCartItemQty(productId: string) {
    const session = await auth()
    if (!session?.user?.email) return { error: 'missing auth session', }

    try {
        const user = await sql<User[]>`SELECT id FROM users WHERE email = ${session.user.email}`
        if (!user.length) {
            return { error: 'User does not exist' };
        }

        const cartItems = await sql<CartItem[]>`
            SELECT id, quantity 
            FROM cart_items
            WHERE user_id = ${user[0].id} AND product_id = ${productId}`

        if (!cartItems.length) return;

        if (cartItems[0].quantity > 1) {
            await sql`UPDATE cart_items SET quantity = ${cartItems[0].quantity - 1} WHERE id = ${cartItems[0].id}`
        } else {
            await sql`
                DELETE FROM cart_items WHERE
                WHERE user_id = ${user[0].id} AND product_id = ${productId}
            `;
        }

        revalidatePath(`/cart`)
    } catch (error) {
        return {
            message: 'Database Error: Failed to Rreduce Product cart item quantity.',
        };
    }
}

export async function removeCartItem(productId: string) {
    const session = await auth()
    if (!session?.user?.email) return { error: 'missing auth session', }

    try {
        const user = await sql<User[]>`SELECT id FROM users WHERE email = ${session.user.email}`
        if (!user.length) {
            return { error: 'User does not exist' };
        }

        await sql`
            DELETE FROM cart_items
            WHERE user_id = ${user[0].id} AND product_id = ${productId}
        `;

        revalidatePath(`/cart`)
    } catch (error) {
        return {
            message: 'Database Error: Failed to add Product to cart.',
        };
    }
}

export async function clearUserCart() {
    const session = await auth()
    if (!session?.user?.email) return { error: 'missing auth session', }

    try {
        const user = await sql<User[]>`SELECT id FROM users WHERE email = ${session.user.email}`
        if (!user.length) {
            return { error: 'User does not exist' };
        }

        await sql`
            DELETE FROM cart_items
            WHERE user_id = ${user[0].id}
        `;

        revalidatePath(`/cart`)
    } catch (error) {
        return {
            message: 'Database Error: Failed to add Product to cart.',
        };
    }

    revalidatePath("/cart")
    revalidatePath("/checkout")
    redirect("/checkout")
}