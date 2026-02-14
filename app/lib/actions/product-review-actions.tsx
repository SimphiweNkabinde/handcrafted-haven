'use server';
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import z from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const ReviewFormSchema = z.object({
    productId: z.string(),
    userEmail: z.string().nonempty(),
    title: z.string().nonempty('Missing title'),
    body: z.string().nonempty('Missing body'),
    rating: z.coerce.number()
        .min(0, 'Please enter an amount greater from 1 - 5')
        .max(5, 'Please enter an amount greater from 1 - 5'),
})


export type ReviewState = {
    errors?: {
        productId?: string[];
        userEmail?: string[];
        title?: string[];
        body?: string[];
        rating?: string[];
    },
    message?: string | null;
    values?: {
        title?: string;
        body?: string;
    };
}

export async function createReview(prevState: ReviewState | undefined, formData: FormData) {
    const validatedFields = ReviewFormSchema.safeParse({
        productId: formData.get('productId'),
        userEmail: formData.get('userEmail'),
        title: formData.get('title'),
        body: formData.get('body'),
        rating: formData.get('rating')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields.',
            values: {
                title: formData.get('title')?.toString(),
                body: formData.get('body')?.toString()
            }
        }
    }

    const { productId, userEmail, title, body, rating } = validatedFields.data;

    try {
        const user = await sql`SELECT id FROM users WHERE email = ${userEmail}`
        if (!user.length) {
            return { message: 'User does not exist' };
        }

        await sql`
            INSERT INTO product_reviews (product_id, user_id, title, body, rating)
            VALUES (${productId}, ${user[0].id}, ${title}, ${body}, ${rating})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Product Review.',
        };
    }

    revalidatePath(`/products/${productId}`);
}