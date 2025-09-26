import { IPagination } from "./pagination.interface"
import { ICategory } from "./category.interface"
import { IBrand } from "./brand.iterface"
import { ISubcategory } from "./subcategory.interface"

export interface IWishlistResponse {
  status: string
  count: number
  data: IWishlist[]
}

export interface IWishlist {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

