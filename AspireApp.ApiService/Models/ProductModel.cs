public record ProductModel
{
    public Guid ProductId { get; init; }
    public required string Name { get; init; }
    public decimal Price { get; init; }
}