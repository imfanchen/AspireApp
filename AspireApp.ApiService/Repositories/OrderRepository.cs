using Microsoft.EntityFrameworkCore;

public class OrderRepository
{
    private readonly DefaultDataContext _context;
    private readonly ILogger<OrderRepository> _logger;

    public OrderRepository(DefaultDataContext context, ILogger<OrderRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<OrderEntity>> GetOrdersAsync()
    {
        return await _context.Orders.AsNoTracking().ToListAsync();
    }

    public async Task<OrderEntity?> GetOrderAsync(Guid orderId)
    {
        return await _context.Orders.FindAsync(orderId);
    }

    public async Task CreateOrderAsync(OrderEntity order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Created new order with ID {OrderId}", order.OrderId);
    }

    public async Task UpdateOrderAsync(OrderEntity order)
    {
        try 
        { 
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Updated order with ID {OrderId}", order.OrderId);
        }
        catch (DbUpdateConcurrencyException ex)
        {
            _logger.LogError(ex, "Concurrency error updating order with ID {OrderId}", order.OrderId);
            throw;
        }
    }

    public async Task DeleteOrderAsync(Guid orderId)
    {
        OrderEntity? order = await _context.Orders.FindAsync(orderId);
        if (order != null)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Deleted order with ID {OrderId}", orderId);
        }
    }

    public async Task<List<OrderEntity>> GetOrdersByCustomerIdAsync(int customerId)
    {
        return await _context.Orders
            .AsNoTracking()
            .Where(o => o.CustomerId == customerId)
            .ToListAsync();
    }

    public async Task<List<OrderEntity>> GetOrdersByEmployeeIdAsync(int employeeId)
    {
        return await _context.Orders
            .AsNoTracking()
            .Where(o => o.SalesPersonId == employeeId)
            .ToListAsync();
    }

    public async Task<List<OrderEntity>> GetOrdersByProductIdAsync(Guid productId)
    {
        return await _context.Orders
            .AsNoTracking()
            .Where(o => o.ProductId == productId)
            .ToListAsync();
    }
}