import { email } from 'zod';
import postgres from "postgres"
import { ProductData, Product, ProductCategory, ProductReviewData, SellerProfile, User } from "./definitions";
import { auth } from "@/auth";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

type Filters = {
    categoryId?: string,
    query?: string,
    page?: string
}
const ITEMS_PER_PAGE = 8;
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
                product_categories.name AS category_name,
                seller_profiles.id AS seller_id,
                seller_profiles.display_name AS seller_name
            FROM products
            JOIN product_categories ON products.category_id = product_categories.id
            LEFT JOIN seller_profiles ON products.seller_id = seller_profiles.id
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
        product_categories.name AS category_name,
        products.seller_id AS seller_id,
        seller_profiles.display_name AS seller_name
      FROM products
      JOIN product_categories ON products.category_id = product_categories.id
      LEFT JOIN seller_profiles ON products.seller_id = seller_profiles.id
      WHERE products.id = ${id}
    `;
    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product data.");
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
                product_reviews.created_at,
                product_reviews.product_id,
                products.name AS product_name
            FROM product_reviews
            JOIN users ON product_reviews.user_id = users.id
            JOIN products ON product_reviews.product_id = products.id
            WHERE product_reviews.product_id = ${id}
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product reviews.');
    }
}

export async function fetchCurrentSellerProfile() {
    const session = await auth();
    if (!session?.user?.email) return null;

    try {
        const user = await sql<SellerProfile[]>`SELECT id FROM users WHERE email = ${session.user.email}`
        if (!user.length) {
            return null;
        }

        const userId = user[0].id
        const sellerProfile = await sql<SellerProfile[]>`SELECT * from seller_profiles WHERE user_id = ${userId}`

        if (!sellerProfile[0]) return null
        return sellerProfile[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error("Failed to fetch current user's seller profile.");
    }
}

type SellerProfileOverview = {
    id: string;
    user_id: string;
    display_name: string;
    bio: string;
    avatar_url: string;
    created_at: string;
    total_products: number;
    average_rating: number;
    total_reviews: number;
}
export async function fetchSellerProfiles(id?: string) {

    try {
        const profiles = await sql<SellerProfileOverview[]>`
            SELECT 
                id ,
                display_name,
                bio,
                avatar_url,
                created_at,
                (SELECT COUNT(*) FROM products WHERE products.seller_id = seller_profiles.id) AS total_products,
                (
                    SELECT ROUND(AVG(rating), 1) 
                    FROM product_reviews JOIN products ON product_reviews.product_id = products.id 
                    WHERE products.seller_id = seller_profiles.id
                ) AS average_rating,
                (
                    SELECT COUNT(*) 
                    FROM product_reviews JOIN products ON product_reviews.product_id = products.id 
                    WHERE products.seller_id = seller_profiles.id
                ) AS total_reviews
            FROM seller_profiles
            WHERE 1=1
                ${id ? sql`AND seller_profiles.id = ${id}` : sql``}
            `;

        return profiles;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error("Failed to fetch seller profiles.");
    }
}

export async function fetchSellerProducts(sellerProfileId: string) {
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
            WHERE products.seller_id = ${sellerProfileId}
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        const data = await sql<User[]>`
            SELECT 
                users.id,
                users.name,
                users.email
            FROM users
            WHERE users.email = ${email}
        `
        if (!data.length) return null
        return data[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function isCurrentUserTheProductOwner(productId: string) {
    const session = await auth();
    if (!session?.user?.email) return false;

    try {
        const user = await sql<SellerProfile[]>`SELECT id FROM users WHERE email = ${session.user.email}`
        if (!user.length) {
            return null;
        }

        const sellerProfile = await sql<SellerProfile[]>`SELECT * from seller_profiles WHERE user_id = ${user[0].id}`

        if (!sellerProfile[0]) return false

        const data = await sql`
            SELECT COUNT(*) 
            from products 
            WHERE 
                id = ${productId} AND
                seller_id = ${sellerProfile[0].id}
            `
        return !!Number(data[0].count)

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error("Failed to fetch current user's seller profile.");
    }
}

export async function fetchTopReviews() {
    try {
        const data = await sql<ProductReviewData[]>`
            SELECT
                product_reviews.id,
                product_reviews.title,
                product_reviews.body,
                users.name AS username,
                product_reviews.rating,
                product_reviews.created_at,
                product_reviews.product_id,
                products.name AS product_name

            FROM product_reviews
            JOIN users ON product_reviews.user_id = users.id
            JOIN products ON product_reviews.product_id = products.id
            ORDER BY product_reviews.rating DESC
            `;
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product reviews.');
    }
}
