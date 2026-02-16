import postgres from "postgres"
import { ProductData, ProductCategory } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type Filters = {
    categoryId?: string,
    query?: string,
    page?: string
}
const ITEMS_PER_PAGE = 6;
export async function fetchProducts(filters: Filters = {}) {
    try {
        const { categoryId, query, page } = filters;
        const pageNumber = page ? Number.parseInt(page) : 1
        const offset = (pageNumber - 1) * ITEMS_PER_PAGE;

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
            WHERE 1 = 1
                ${categoryId ? sql`AND products.category_id = ${categoryId}` : sql``}
                ${query ? sql`AND products.name ILIKE ${`%${query}%`}` : sql``}
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

export async function fetchProductsPages(filters: Filters = {}) {
    const { categoryId, query, page } = filters;

    try {
        const data = await sql`SELECT COUNT(*)
        FROM products
        JOIN product_categories ON products.category_id = product_categories.id
        WHERE 1=1
            ${categoryId ? sql`AND products.category_id = ${categoryId}` : sql``}
            ${query ? sql`AND products.name ILIKE ${`%${query}%`}` : sql``}
    `;
        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of products.');
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
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchProductSearchResults(searchTerm: string) {
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
            WHERE 
                products.name ILIKE ${`%${searchTerm}%`} OR
                products.short_description ILIKE ${`%${searchTerm}%`} OR
                products.long_description ILIKE ${`%${searchTerm}%`} OR
                product_categories.name ILIKE ${`%${searchTerm}%`} OR
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch products search results.');
    }
}