import postgres from "postgres"
import { ProductData, ProductCategory, ProductReviewData } from "./definitions";
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
        throw new Error('Failed to fetch products.');
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
        throw new Error('Failed to fetch product data.');
    }
}

export async function fetchProductCategories() {
    try {
        const data = await sql<ProductCategory[]>`
            SELECT * FROM product_categories`;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product categories');
    }
}

export async function fetchReviewsByProductId(id: string) {
    try {
        const data = await sql<ProductReviewData[]>`
            SELECT
                product_reviews.id,
                product_reviews.title,
                product_reviews.body,
                users.name AS username,
                product_reviews.rating,
                product_reviews.created_at
            FROM product_reviews
            JOIN users ON product_reviews.user_id = users.id
            WHERE product_reviews.product_id = ${id}
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product reviews.');
    }
}