import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table";
import { getOrders } from "@/api/orders";
import { getProducts } from "@/api/products";
import { getCustomers } from "@/api/customers";
import { getEmployees } from "@/api/employees";
import { type ColumnDef } from "@tanstack/react-table";

export const Route = createFileRoute("/orders")({
  component: OrdersComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(ordersQueryOptions),
});

const ordersQueryOptions = queryOptions({
  queryKey: ["orders"],
  queryFn: getOrders,
});

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: getProducts,
});

const customersQueryOptions = queryOptions({
  queryKey: ["customers"],
  queryFn: getCustomers,
});

const employeesQueryOptions = queryOptions({
  queryKey: ["employees"],
  queryFn: getEmployees,
});

interface OrderRow {
  orderId: string;
  productName: string;
  customerFullName: string;
  salesPersonFullName: string;
  productPrice: number;
  quantity: number;
  orderDollarAmount: number;
}

function OrdersComponent() {
  const ordersQuery = useQuery(ordersQueryOptions);
  const productsQuery = useQuery(productsQueryOptions);
  const customersQuery = useQuery(customersQueryOptions);
  const employeesQuery = useQuery(employeesQueryOptions);

  const orders = ordersQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const customers = customersQuery.data ?? [];
  const employees = employeesQuery.data ?? [];

  const orderData: OrderRow[] = orders.map((order) => {
    const product = products.find((p) => p.productId === order.productId);
    const customer = customers.find((c) => c.customerId === order.customerId);
    const employee = employees.find(
      (e) => e.employeeId === order.salesPersonId
    );

    const productPrice = product?.price ?? 0;
    const quantity = order.quantity;
    const orderDollarAmount = productPrice * quantity;

    return {
      orderId: order.orderId,
      productName: product?.name ?? "",
      customerFullName: customer
        ? `${customer.firstName} ${customer.lastName}`
        : "",
      salesPersonFullName: employee
        ? `${employee.firstName} ${employee.lastName}`
        : "",
      productPrice: productPrice,
      quantity: quantity,
      orderDollarAmount: orderDollarAmount,
    };
  });

  const columns: ColumnDef<OrderRow>[] = [
    {
      accessorKey: "orderId",
      header: "Order ID",
    },
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "customerFullName",
      header: "Customer",
    },
    {
      accessorKey: "salesPersonFullName",
      header: "Sales Person",
    },
    {
      accessorKey: "productPrice",
      header: "Price",
      cell: ({ cell }) => {
        const amount = parseFloat(cell.getValue() as string);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "orderDollarAmount",
      header: "Amount",
      cell: ({ cell }) => {
        const amount = parseFloat(cell.getValue() as string);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
  ];

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <DataTable data={orderData} columns={columns} filter="orderId" />
      </div>
    </>
  );
}
