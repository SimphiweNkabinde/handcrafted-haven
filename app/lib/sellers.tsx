export type SellerProfile = {
    id: string
    displayName: string
    bio: string
    avatarUrl: string
    rating: number
    reviewsCount: number
    salesCount: number

}

export type ProductBySeller = {
    id: string
    title: string
    description: string
    price: number
    image: string
}