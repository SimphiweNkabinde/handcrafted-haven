'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import z from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const ProductFormSchema = z.object({
    id: z.string(),
    name: z.string().nonempty('Missing name'),
    shortDescription: z.string().nonempty('Missing short description'),
    longDescription: z.string().nonempty('Missing long description'),
    price: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0' }),
    imageUrl: z.url('invalid image url').nonempty('Missing image url'),
    categoryId: z.string('Select a category').nonempty('Select a category'),
})

const createProductSchema = ProductFormSchema.omit({ id: true })
const updateProductSchema = ProductFormSchema.omit({ id: true })


export type ProductState = {
    errors?: {
        name?: string[];
        shortDescription?: string[];
        longDescription?: string[];
        price?: string[];
        imageUrl?: string[];
        categoryId?: string[];
    },
    message?: string | null;
    values?: {
        name?: string;
        shortDescription?: string;
        longDescription?: string;
        price?: string;
        imageUrl?: string;
        categoryId?: string;
    };
}


export async function createProduct(prevState: ProductState, formData: FormData) {
    const validatedFields = createProductSchema.safeParse({
        name: formData.get('name'),
        shortDescription: formData.get('shortDescription'),
        longDescription: formData.get('longDescription'),
        price: formData.get('price'),
        imageUrl: formData.get('imageUrl'),
        categoryId: formData.get('categoryId')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
            values: {
                name: formData.get('name')?.toString(),
                shortDescription: formData.get('shortDescription')?.toString(),
                longDescription: formData.get('longDescription')?.toString(),
                price: formData.get('price')?.toString(),
                imageUrl: formData.get('imageUrl')?.toString(),
                categoryId: formData.get('categoryId')?.toString()
            }
        }
    }

    const { name, shortDescription, longDescription, price, imageUrl, categoryId } = validatedFields.data;

    try {
        await sql`
            INSERT INTO products (name, short_description, long_description, price, image_url, category_id)
            VALUES (${name}, ${shortDescription}, ${longDescription}, ${price}, ${imageUrl}, ${categoryId})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Product.',
        };
    }

    revalidatePath('/products');
    redirect('/products');
}

export async function updateProduct(id: string, prevState: ProductState, formData: FormData) {
    const validatedFields = updateProductSchema.safeParse({
        name: formData.get('name'),
        shortDescription: formData.get('shortDescription'),
        longDescription: formData.get('longDescription'),
        price: formData.get('price'),
        imageUrl: formData.get('imageUrl'),
        categoryId: formData.get('categoryId')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
            values: {
                name: formData.get('name')?.toString(),
                shortDescription: formData.get('shortDescription')?.toString(),
                longDescription: formData.get('longDescription')?.toString(),
                price: formData.get('price')?.toString(),
                imageUrl: formData.get('imageUrl')?.toString(),
                categoryId: formData.get('categoryId')?.toString()
            }
        }
    }

    const { name, shortDescription, longDescription, price, imageUrl, categoryId } = validatedFields.data;

    try {
        await sql`
            UPDATE products 
            SET name = ${name},
                short_description = ${shortDescription},
                long_description =  ${longDescription},
                price = ${price},
                image_url = ${imageUrl},
                category_id = ${categoryId}
            WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Product.',
        };
    }

    revalidatePath(`/products/${id}`);
    redirect(`/products/${id}`);
}