public record OrderModel 
{
    public Guid OrderId { get; init; }
    public Guid? ProductId { get; init; }
    public int? CustomerId { get; init; }
    public int? SalesPersonId { get; init; }
    public int Quantity { get; init; }
}