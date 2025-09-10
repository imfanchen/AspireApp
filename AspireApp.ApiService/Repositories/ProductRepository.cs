using Microsoft.EntityFrameworkCore;

public class ProductRepository
{
    private readonly DefaultDataContext _context;
    private readonly ILogger<ProductRepository> _logger;

    public ProductRepository(DefaultDataContext context, ILogger<ProductRepository> logger)
    {
        _context = context;
        _logger = logger;
    }
    public async Task<List<ProductEntity>> GetProductsAsync()
    {
        return await _context.Products.AsNoTracking().ToListAsync();
    }
    public async Task<ProductEntity?> GetProductAsync(Guid productId)
    {
        return await _context.Products.FindAsync(productId);
    }
    public async Task CreateProductAsync(ProductEntity product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Created new product with ID {ProductId}", product.ProductId);
    }
    public async Task UpdateProductAsync(ProductEntity product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        _logger.LogInformation("Updated product with ID {ProductId}", product.ProductId);
    }
    public async Task DeleteProductAsync(Guid productId)
    {
        ProductEntity? product = await _context.Products.FindAsync(productId);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Deleted product with ID {ProductId}", productId);
        }
    }
}