import axios from 'axios';
import { type Customer } from '@/models/customer';

const API_URL = import.meta.env.VITE_API_URL;

export async function getCustomers(): Promise<Customer[]> {
  try {
    const response = await axios.get<Customer[]>(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

export async function getCustomerById(id: number): Promise<Customer> {
  try {
    const response = await axios.get<Customer>(`${API_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
}

export async function createCustomer(customer: Omit<Customer, 'customerId'>): Promise<Customer> {
  try {
    const response = await axios.post<Customer>(`${API_URL}/customers`, customer);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function updateCustomer(id: number, customer: Customer): Promise<Customer> {
  try {
    const response = await axios.put<Customer>(`${API_URL}/customers/${id}`, customer);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteCustomer(id: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/customers/${id}`);
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
}