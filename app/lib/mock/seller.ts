import type { SellerProfile, ProductBySeller } from "../sellers"

export const mockSeller: SellerProfile = {

  id: "seller_1",
  username: "john-doe",
  displayName: "John Doe",
  bio: `Hi, I’m the maker behind this small handmade shop. Every piece you see here is created with care, patience, and attention to detail. What started as a simple hobby slowly turned into a passion for creating meaningful, handcrafted products.

I believe handmade items carry a story. That’s why I focus on simple, timeless designs and quality materials, so each piece feels special and made to last. Whether it’s for your home, a thoughtful gift, or something just for you, I hope my creations bring a little warmth into your day.

Thank you for supporting handmade work and small creators.`,
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D",
  rating: 4.2,
  reviewsCount: 3,
  salesCount: 12

}

export const mockProducts: ProductBySeller[] = Array.from({ length: 6 }, (_, i) => ({
  id: `p_${i + 1}`,
  title: "Product",
  description: `Description of product ${i + 1}`,
  price: 10.99,
  image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
}))
