public record CustomerModel
{
    public int CustomerId { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public string? MiddleInitial { get; init; }
}