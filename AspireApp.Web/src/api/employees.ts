import axios from 'axios';
import { type Employee } from '@/models/employee';

const API_URL = import.meta.env.VITE_API_URL;

export async function getEmployees(): Promise<Employee[]> {
  try {
    const response = await axios.get<Employee[]>(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
}

export async function getEmployeeById(id: number): Promise<Employee> {
  try {
    const response = await axios.get<Employee>(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
}

export async function createEmployee(employee: Omit<Employee, 'employeeId'>): Promise<Employee> {
  try {
    const response = await axios.post<Employee>(`${API_URL}/employees`, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
}

export async function updateEmployee(id: number, employee: Employee): Promise<Employee> {
  try {
    const response = await axios.put<Employee>(`${API_URL}/employees/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteEmployee(id: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/employees/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
}