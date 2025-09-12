import axios from "axios";
import { type Product } from "@/types/product";

const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

export async function createProduct(
  product: Omit<Product, "productId">
): Promise<Product> {
  try {
    const response = await axios.post<Product>(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  product: Product
): Promise<Product> {
  try {
    const response = await axios.put<Product>(
      `${API_URL}/products/${id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
}
