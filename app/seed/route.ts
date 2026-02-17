import postgres from "postgres";
import { productCategories, ProductReviews, products, sellerProfiles, users } from "../lib/placeholder-data";
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProductCategories() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS product_categories (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `;

    const insertedProductCategories = await Promise.all(
        productCategories.map(async (category) => {
            return sql`
                INSERT INTO product_categories (id, name, description)
                VALUES (${category.id}, ${category.name}, ${category.description})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedProductCategories;
}

async function seedProducts() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            short_description TEXT NOT NULL,
            long_description TEXT NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            image_url TEXT NOT NULL,
            category_id UUID NOT NULL
        );
    `;

    const insertedProducts = await Promise.all(
        products.map(async (product) => {
            return sql`
                INSERT INTO products (id, name, short_description, long_description, price, category_id)
                VALUES (${product.id}, ${product.name}, ${product.short_description}, ${product.long_description}, ${product.price}, ${product.category_id})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedProducts;
}

export async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

async function seedProductReviews() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS product_reviews (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            product_id UUID NOT NULL,
            user_id UUID NOT NULL,
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    `;
    const insertedReviews = await Promise.all(
        ProductReviews.map(async (review) => {
            return sql`
                INSERT INTO product_reviews (product_id, user_id, title, body, rating)
                VALUES (${review.product_id}, ${review.user_id}, ${review.title}, ${review.body}, ${review.rating})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedReviews;
}

async function seedSellerProfiles() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS seller_profiles (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            display_name VARCHAR(255) NOT NULL,
            bio TEXT NOT NULL,
            avatar_url TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    `;
    const insertedProfiles = await Promise.all(
        sellerProfiles.map(async (profile) => {
            return sql`
                INSERT INTO seller_profiles (user_id, display_name, bio, avatar_url)
                VALUES (${profile.user_id}, ${profile.display_name}, ${profile.bio}, ${profile.avatar_url})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedProfiles;
}

async function seedCartItems() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS cart_items (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            product_id UUID NOT NULL,
            quantity SMALLINT NOT NULL DEFAULT 1
        );
    `;
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            // seedProductCategories(),
            // seedProducts(),
            // seedUsers(),
            // seedProductReviews(),
            // seedSellerProfiles(),
            // seedCartItems()
        ]);

        return Response.json({ message: 'Database seeded successfully' })
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}