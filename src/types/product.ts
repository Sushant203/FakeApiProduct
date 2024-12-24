import { Category } from "./category";

export interface IProduct {
    id: number,
    title: string,
    price: number,
    category: Category,
    description: string,
    image: string,
}