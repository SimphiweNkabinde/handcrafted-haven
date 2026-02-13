import postgres from "postgres"
import { ProductData, ProductCategory } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProducts() {
    try {
        const data = await sql<ProductData[]>`
            SELECT
                products.id,
                products.name,
                products.short_description,
                products.long_description,
                products.price,
                products.image_url,
                product_categories.id AS category_id,
                product_categories.name AS category_name
            FROM products
            JOIN product_categories ON products.category_id = product_categories.id
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchProductById(id: string) {
    try {
        const data = await sql<ProductData[]>`
            SELECT
                products.id,
                products.name,
                products.short_description,
                products.long_description,
                products.price,
                products.image_url,
                product_categories.id AS category_id,
                product_categories.name AS category_name
            FROM products
            JOIN product_categories ON products.category_id = product_categories.id
            WHERE products.id = ${id}
            `;
        return data[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchProductCategories() {
    try {
        const data = await sql<ProductCategory[]>`
            SELECT * FROM product_categories`;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}