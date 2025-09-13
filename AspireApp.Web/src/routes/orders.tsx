import { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { getOrders } from "@/api/orders";
import { getProducts } from "@/api/products";
import { getCustomers } from "@/api/customers";
import { getEmployees } from "@/api/employees";
import { SignalREvents } from "@/lib/constants";
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

function OrdersComponent() {
  const queryClient = useQueryClient();
  const ordersQuery = useQuery(ordersQueryOptions);
  const productsQuery = useQuery(productsQueryOptions);
  const customersQuery = useQuery(customersQueryOptions);
  const employeesQuery = useQuery(employeesQueryOptions);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("/hub/order")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("SignalR connection started"))
      .catch((err) => console.error("SignalR connection error: ", err));

    connection.on(SignalREvents.OrderCreated, () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    connection.on(SignalREvents.OrderUpdated, () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    connection.on(SignalREvents.OrderDeleted, () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });

    return () => {
      connection.stop();
    };
  }, [queryClient]);

  const orders = ordersQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const customers = customersQuery.data ?? [];
  const employees = employeesQuery.data ?? [];

  interface OrderRow {
    orderId: string;
    productName: string;
    customerName: string;
    salesPersonName: string;
    price: number;
    quantity: number;
    total: number;
  }

  const orderData: OrderRow[] = orders.map((order) => {
    const product = products.find((p) => p.productId === order.productId);
    const customer = customers.find((c) => c.customerId === order.customerId);
    const employee = employees.find(
      (e) => e.employeeId === order.salesPersonId
    );

    const price = product?.price ?? 0;
    const quantity = order.quantity;
    const total = price * quantity;

    return {
      orderId: order.orderId,
      productName: product?.name ?? "",
      customerName: customer
        ? `${customer.firstName} ${customer.lastName}`
        : "",
      salesPersonName: employee
        ? `${employee.firstName} ${employee.lastName}`
        : "",
      price: price,
      quantity: quantity,
      total: total,
    };
  });

  const orderColumns: ColumnDef<OrderRow>[] = [
    {
      accessorKey: "orderId",
      header: "Order ID",
    },
    {
      accessorKey: "productName",
      header: "Product",
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "salesPersonName",
      header: "Sales Person",
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ cell }) => {
        const amount = parseFloat(cell.getValue() as string);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right">{formatted}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-right">Quantity</div>,
      cell: ({ cell }) => <div className="text-right">{cell.getValue() as string}</div>,
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ cell }) => {
        const amount = parseFloat(cell.getValue() as string);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right">{formatted}</div>;
      },
    },
  ];

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <DataTable data={orderData} columns={orderColumns} filter="orderId" />
      </div>
    </>
  );
}
