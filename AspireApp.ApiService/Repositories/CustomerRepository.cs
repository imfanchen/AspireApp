using Microsoft.EntityFrameworkCore;

public class CustomerRepository
{
    private readonly DefaultDataContext _context;
    private readonly ILogger<CustomerRepository> _logger;

    public CustomerRepository(DefaultDataContext context, ILogger<CustomerRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<CustomerEntity>> GetCustomersAsync()
    {
        return await _context.Customers.AsNoTracking().ToListAsync();
    }

    public async Task<CustomerEntity?> GetCustomerAsync(int customerId)
    {
        return await _context.Customers.FindAsync(customerId);
    }

    public async Task CreateCustomerAsync(CustomerEntity customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Created new customer with ID {CustomerId}", customer.CustomerId);
    }

    public async Task UpdateCustomerAsync(CustomerEntity customer)
    {
        _context.Customers.Update(customer);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Updated customer with ID {CustomerId}", customer.CustomerId);
    }

    public async Task DeleteCustomerAsync(int customerId)
    {
        CustomerEntity? customer = await _context.Customers.FindAsync(customerId);
        if (customer != null)
        {
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Deleted customer with ID {CustomerId}", customerId);
        }
    }
}