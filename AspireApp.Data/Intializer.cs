public static class Initializer
{
    public static void SeedData(DefaultDataContext context)
    {
        if (!context.Products.Any())
        {
            var products = new List<ProductEntity>
            {
                new() { Name = "MacBook Pro 14-inch M4", Price = 1999.99M },
                new() { Name = "MacBook Pro 16-inch M4 Max", Price = 2499.99M },
                new() { Name = "MacBook Air 13-inch M4", Price = 1299.99M },
                new() { Name = "MacBook Air 15-inch M4", Price = 1499.99M },
                new() { Name = "iMac 24-inch M4", Price = 1599.99M },
                new() { Name = "Mac Mini M4", Price = 699.99M },
                new() { Name = "Mac Studio M4 Ultra", Price = 3999.99M },
                new() { Name = "iPad Pro 11-inch M4", Price = 999.99M },
                new() { Name = "iPad Pro 13-inch M4", Price = 1199.99M },
                new() { Name = "iPad Air 11-inch M3", Price = 599.99M },
                new() { Name = "iPad Air 13-inch M3", Price = 799.99M },
                new() { Name = "iPad Mini 7th generation", Price = 499.99M },
                new() { Name = "iPhone 17 Pro Max", Price = 1299.99M },
                new() { Name = "iPhone 17 Pro", Price = 1099.99M },
                new() { Name = "iPhone 17", Price = 799.99M },
                new() { Name = "iPhone Air", Price = 999.99M },
                new() { Name = "Apple Watch Series 11", Price = 449.99M },
                new() { Name = "Apple Watch Ultra 3", Price = 899.99M },
                new() { Name = "Apple Watch SE 3", Price = 279.99M },
                new() { Name = "AirPods Pro 3", Price = 279.99M },
                new() { Name = "AirPods Max 2", Price = 599.99M },
                new() { Name = "HomePod Mini", Price = 99.99M },
                new() { Name = "Vision Pro", Price = 3499.99M }
            };
            context.Products.AddRange(products);
            context.SaveChanges();
        }

        if (!context.Customers.Any())
        {
            var customers = new List<CustomerEntity>
            {
                new() { FirstName = "John", MiddleInitial = "A", LastName = "Doe" },
                new() { FirstName = "Jane", MiddleInitial = "B", LastName = "Smith" },
                new() { FirstName = "Michael", MiddleInitial = "C", LastName = "Johnson" },
                new() { FirstName = "Emily", MiddleInitial = "D", LastName = "Davis" },
                new() { FirstName = "William", MiddleInitial = "E", LastName = "Wilson" },
                new() { FirstName = "Sarah", MiddleInitial = "F", LastName = "Brown" },
                new() { FirstName = "James", MiddleInitial = "G", LastName = "Taylor" },
                new() { FirstName = "Emma", MiddleInitial = "H", LastName = "Anderson" },
                new() { FirstName = "Robert", MiddleInitial = "I", LastName = "Thomas" },
                new() { FirstName = "Olivia", MiddleInitial = "J", LastName = "Martinez" }
            };
            context.Customers.AddRange(customers);
            context.SaveChanges();
        }

        if (!context.Employees.Any())
        {
            var employees = new List<EmployeeEntity>
            {
                new() { FirstName = "Alice", MiddleInitial = "C", LastName = "Johnson" },
                new() { FirstName = "Bob", MiddleInitial = "D", LastName = "Brown" },
                new() { FirstName = "Christopher", MiddleInitial = "M", LastName = "Lee" },
                new() { FirstName = "David", MiddleInitial = "K", LastName = "Miller" },
                new() { FirstName = "Lisa", MiddleInitial = "L", LastName = "Garcia" },
                new() { FirstName = "Jennifer", MiddleInitial = "N", LastName = "Clark" },
                new() { FirstName = "Daniel", MiddleInitial = "O", LastName = "Rodriguez" },
                new() { FirstName = "Michelle", MiddleInitial = "P", LastName = "Lewis" }
            };
            context.Employees.AddRange(employees);
            context.SaveChanges();
        }
    }
}