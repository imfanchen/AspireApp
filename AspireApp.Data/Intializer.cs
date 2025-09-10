public static class Initializer
{
    public static void SeedData(DefaultDataContext context)
    {
        if (!context.Products.Any())
        {
            var products = new List<ProductEntity>
            {
                new() { Name = "Laptop", Price = 999.99M },
                new() { Name = "Tablet", Price = 799.99M },
                new() { Name = "Smartphone", Price = 599.99M },
            };
            context.Products.AddRange(products);
            context.SaveChanges();
        }

        if (!context.Customers.Any())
        {
            var customers = new List<CustomerEntity>
            {
                new() { FirstName = "John", MiddleInitial = "A", LastName = "Doe" },
                new() { FirstName = "Jane", MiddleInitial = "B", LastName = "Smith" }
            };
            context.Customers.AddRange(customers);
            context.SaveChanges();
        }

        if (!context.Employees.Any())
        {
            var employees = new List<EmployeeEntity>
            {
                new() { FirstName = "Alice", MiddleInitial = "C", LastName = "Johnson" },
                new() { FirstName = "Bob", MiddleInitial = "D", LastName = "Brown" }
            };
            context.Employees.AddRange(employees);
            context.SaveChanges();
        }
    }
}