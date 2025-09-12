import axios from "axios";
import { type Order } from "@/types/order";

const API_URL = import.meta.env.VITE_API_URL;

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await axios.get<Order[]>(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(id: string): Promise<Order> {
  try {
    const response = await axios.get<Order>(`${API_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
}

export async function createOrder(
  order: Omit<Order, "orderId">
): Promise<Order> {
  try {
    const response = await axios.post<Order>(`${API_URL}/orders`, order);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function updateOrder(id: string, order: Order): Promise<Order> {
  try {
    const response = await axios.put<Order>(`${API_URL}/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteOrder(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/orders/${id}`);
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    throw error;
  }
}

export async function getOrdersByCustomerId(
  customerId: number
): Promise<Order[]> {
  try {
    const response = await axios.get<Order[]>(`${API_URL}/orders/by-customer`, {
      params: { customerId },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching orders for customer ID ${customerId}:`,
      error
    );
    throw error;
  }
}

export async function getOrdersByEmployeeId(
  employeeId: number
): Promise<Order[]> {
  try {
    const response = await axios.get<Order[]>(`${API_URL}/orders/by-employee`, {
      params: { employeeId },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching orders for employee ID ${employeeId}:`,
      error
    );
    throw error;
  }
}

export async function getOrdersByProductId(
  productId: string
): Promise<Order[]> {
  try {
    const response = await axios.get<Order[]>(`${API_URL}/orders/by-product`, {
      params: { productId },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for product ID ${productId}:`, error);
    throw error;
  }
}
