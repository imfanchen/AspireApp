import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/data-table";
import { getEmployees } from "@/api/employees";
import { type ColumnDef } from "@tanstack/react-table";
import { type Employee } from "@/models/employee";

export const Route = createFileRoute("/employees")({
  component: EmployeesComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(employeesQueryOptions),
});

const employeesQueryOptions = queryOptions({
  queryKey: ["employees"],
  queryFn: getEmployees,
});

function EmployeesComponent() {
  const employeesQuery = useQuery(employeesQueryOptions);
  const employees = employeesQuery.data ?? [];

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "employeeId",
      header: "ID",
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
  ];

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <DataTable data={employees} columns={columns} filter="firstName" />
      </div>
    </>
  );
}
