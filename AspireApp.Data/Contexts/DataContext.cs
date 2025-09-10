using Microsoft.EntityFrameworkCore;

public sealed class DefaultDataContext(DbContextOptions<DefaultDataContext> options) : DbContext(options)
{
    public DbSet<CustomerEntity> Customers { get; set; }
    public DbSet<EmployeeEntity> Employees { get; set; }
    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<OrderEntity> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Uncomment below if not using data annotations in entity classes
        //modelBuilder.HasDefaultSchema("App");  // "dbo" is the default schema for SQL Server
        //modelBuilder.Entity<CustomerEntity>().ToTable("Customer").HasKey(c => c.CustomerId);
        //modelBuilder.Entity<EmployeeEntity>().ToTable("Employee").HasKey(e => e.EmployeeId);
        //modelBuilder.Entity<ProductEntity>().ToTable("Product").HasKey(p => p.ProductId);
        //modelBuilder.Entity<OrderEntity>().ToTable("Order").HasKey(o => o.OrderId);

        // Configure RowVersion as a concurrency token
        modelBuilder.Entity<OrderEntity>()
            .Property(o => o.RowVersion)
            .IsRowVersion();

        // Foreign key is created expclitly by EF Core by convention from the entity.
        // However, it's a good practice to define relationships explicitly.
        modelBuilder.Entity<OrderEntity>()
            .HasOne(o => o.Product)
            .WithMany()
            .HasForeignKey(o => o.ProductId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<OrderEntity>()
            .HasOne(o => o.Customer)
            .WithMany()
            .HasForeignKey(o => o.CustomerId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<OrderEntity>()
            .HasOne(o => o.SalesPerson)
            .WithMany()
            .HasForeignKey(o => o.SalesPersonId)
            .OnDelete(DeleteBehavior.SetNull);

        // Example of creating a composite index on FirstName and LastName in CustomerEntity
        modelBuilder.Entity<CustomerEntity>()
            .HasIndex(c => new { c.FirstName, c.LastName });
    }
}