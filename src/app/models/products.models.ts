export interface ProductsI {
    id: number,
    title: string,
    brand: string,
    category: string,
    description: string,
    discountPercentage: number,
    images: Array<String>,
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
}