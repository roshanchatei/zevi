/**
 * @description interfaces for product-package
 */

export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  sellingPrice: number;
  rating: number;
  reviews: number;
  brand: string;
  img: string;
}