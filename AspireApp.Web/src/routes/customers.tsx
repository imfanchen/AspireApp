import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowUpDown, Plus, Pencil, Trash } from "lucide-react";
import { createCustomer, getCustomers, updateCustomer, deleteCustomer } from "@/api/customers";
import { getOrdersByCustomerId, createOrder } from "@/api/orders";
import { getProducts } from "@/api/products";
import { getEmployees } from "@/api/employees";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ColumnDef } from "@tanstack/react-table";
import { type Customer } from "@/models/customer";
import { type Order } from "@/models/order";
import { useState, useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/customers")({
  component: CustomersComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(customersQueryOptions),
});

const customersQueryOptions = queryOptions({
  queryKey: ["customers"],
  queryFn: getCustomers,
});

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: getProducts,
});

const employeesQueryOptions = queryOptions({
  queryKey: ["employees"],
  queryFn: getEmployees,
});

function CustomersComponent() {
  const queryClient = useQueryClient();

  const [loadingProgress, setLoadingProgress] = useState(0);

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  const [isCreateCustomerDialogOpen, setIsCreateCustomerDialogOpen] =
    useState(false);

  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    middleInitial: "",
  });

  const [isEditCustomerDialogOpen, setIsEditCustomerDialogOpen] =
    useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [isDeleteCustomerDialogOpen, setIsDeleteCustomerDialogOpen] =
    useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const [isCreateOrderDialogOpen, setIsCreateOrderDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<{productId: string, salesPersonId: number | null, quantity: number}>({productId: "", salesPersonId: null, quantity: 0});

  const customersQuery = useQuery(customersQueryOptions);
  const productsQuery = useQuery(productsQueryOptions);
  const employeesQuery = useQuery(employeesQueryOptions);

  const customers = customersQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const employees = employeesQuery.data ?? [];

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setIsCreateCustomerDialogOpen(false);
      setNewCustomer({
        firstName: "",
        lastName: "",
        middleInitial: "",
      });
      toast.success("Customer created successfully");
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: (updatedCustomer: Customer) =>
      updateCustomer(updatedCustomer.customerId, updatedCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setIsEditCustomerDialogOpen(false);
      setEditingCustomer(null);
      toast.success("Customer updated successfully");
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setIsDeleteCustomerDialogOpen(false);
      setDeletingCustomer(null);
      toast.success("Customer deleted successfully");
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", selectedCustomerId] });
      setIsCreateOrderDialogOpen(false);
      setNewOrder({productId: "", salesPersonId: null, quantity: 0});
      toast.success("Order created successfully");
    },
  });

  const ordersQuery = useQuery({
    queryKey: ["orders", selectedCustomerId],
    queryFn: () => {
      if (!selectedCustomerId) return Promise.resolve([]);
      return getOrdersByCustomerId(selectedCustomerId);
    },
    enabled: !!selectedCustomerId,
  });

  const orders = ordersQuery.data ?? [];

  const customerColumns: ColumnDef<Customer>[] = [
    {
      id: "select",
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedCustomerId(value ? row.original.customerId : null);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "customerId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "middleInitial",
      header: "Middle Initial",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Pencil
                  className="h-4 w-4"
                  onClick={() => {
                    setEditingCustomer(customer);
                    setIsEditCustomerDialogOpen(true);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Update</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash
                  className="h-4 w-4"
                  onClick={() => {
                    setDeletingCustomer(customer);
                    setIsDeleteCustomerDialogOpen(true);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const orderColumns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderId",
      header: "Order ID",
    },
    {
      accessorKey: "productId",
      header: "Product ID",
    },
    {
      accessorKey: "customerId",
      header: "Customer ID",
    },
    {
      accessorKey: "salesPersonId",
      header: "Sales Person ID",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
  ];

  useEffect(() => {
    if (ordersQuery.isFetching) {
      let cancelled = false;

      const animateProgress = async () => {
        const steps = Array.from({ length: 19 }, (_, i) => (i + 1) * 5);
        for (const progress of steps) {
          if (cancelled) break;
          setLoadingProgress(progress);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      };

      animateProgress();

      return () => {
        cancelled = true;
        setLoadingProgress(0);
      };
    } else if (ordersQuery.isSuccess) {
      setLoadingProgress(100);
    }
  }, [ordersQuery.isFetching, ordersQuery.isSuccess]);

  const handleCreateCustomer = () => {
    createCustomerMutation.mutate(newCustomer);
  };

  const handleUpdateCustomer = () => {
    if (editingCustomer) {
      updateCustomerMutation.mutate(editingCustomer);
    }
  };

  const handleDeleteCustomer = () => {
    if (deletingCustomer) {
      deleteCustomerMutation.mutate(deletingCustomer.customerId);
    }
  };

  const handleCreateOrder = () => {
    if (selectedCustomerId && newOrder.productId && newOrder.salesPersonId) {
      const orderToCreate = {
        productId: newOrder.productId,
        customerId: selectedCustomerId,
        salesPersonId: newOrder.salesPersonId,
        quantity: newOrder.quantity,
      };
      createOrderMutation.mutate(orderToCreate);
    }
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={selectedCustomerId ? 50 : 100}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Customers</h1>
              <Button onClick={() => setIsCreateCustomerDialogOpen(true)}>
                <span>Create</span> <Plus size={18} />
              </Button>
            </div>
            <DataTable
              data={customers}
              columns={customerColumns}
              filter="firstName"
              singleSelection={true}
            />
          </div>
        </ResizablePanel>
        {selectedCustomerId && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">Customer Orders</h1>
                  <Button onClick={() => setIsCreateOrderDialogOpen(true)}>
                    <span>Create Order</span> <Plus size={18} />
                  </Button>
                </div>
                {ordersQuery.isLoading || ordersQuery.isFetching ? (
                  <div className="space-y-4">
                    <Progress value={loadingProgress} />
                    <p className="text-sm text-muted-foreground text-center">
                      Loading orders... {loadingProgress}%
                    </p>
                  </div>
                ) : (
                  <DataTable
                    data={orders}
                    columns={orderColumns}
                    filter="orderId"
                  />
                )}
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <Dialog
        open={isCreateCustomerDialogOpen}
        onOpenChange={setIsCreateCustomerDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Customer</DialogTitle>
            <DialogDescription>
              Enter the details of the new customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={newCustomer.firstName}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, firstName: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={newCustomer.lastName}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, lastName: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="middleInitial" className="text-right">
                Middle Initial
              </Label>
              <Input
                id="middleInitial"
                value={newCustomer.middleInitial}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    middleInitial: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateCustomerDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCustomer}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editingCustomer && (
        <Dialog
          open={isEditCustomerDialogOpen}
          onOpenChange={setIsEditCustomerDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Edit the details of the customer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={editingCustomer.firstName}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      firstName: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={editingCustomer.lastName}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      lastName: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="middleInitial" className="text-right">
                  Middle Initial
                </Label>
                <Input
                  id="middleInitial"
                  value={editingCustomer.middleInitial}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      middleInitial: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditCustomerDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateCustomer}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {deletingCustomer && (
        <Dialog
          open={isDeleteCustomerDialogOpen}
          onOpenChange={setIsDeleteCustomerDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Customer</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this customer?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteCustomerDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleDeleteCustomer} variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={isCreateOrderDialogOpen}
        onOpenChange={setIsCreateOrderDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Order</DialogTitle>
            <DialogDescription>
              Enter the details of the new order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Product
              </Label>
              <Select
                onValueChange={(value) => setNewOrder({ ...newOrder, productId: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.productId} value={product.productId}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employee" className="text-right">
                Sales Person
              </Label>
              <Select
                onValueChange={(value) => setNewOrder({ ...newOrder, salesPersonId: parseInt(value) })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a sales person" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.employeeId} value={employee.employeeId.toString()}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newOrder.quantity}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOrderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateOrder}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}