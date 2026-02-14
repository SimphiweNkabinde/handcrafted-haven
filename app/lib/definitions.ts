// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
export type Product = {
    id: string;
    name: string;
    short_description: string;
    long_description: string;
    price: number;
    image_url: string;
    category_id: string;
}

export type ProductData = {
    id: string;
    name: string;
    short_description: string;
    long_description: string;
    price: number;
    image_url: string;
    category_id: string;
    category_name: string;
}



export type ProductCategory = {
    id: string;
    name: string;
    description: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type ProductReview = {
    id: string;
    product_id: string;
    user_id: string;
    title: string;
    body: string;
    rating: number;
    created_at: string;
}


export type ProductReviewData = {
    id: string;
    product_id: string;
    username: string
    title: string;
    body: string;
    rating: number;
    created_at: string;
}