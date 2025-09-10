public static class Extensions
{
    public static EmployeeModel AsModel(this EmployeeEntity entity) => new()
    {
        EmployeeId = entity.EmployeeId,
        FirstName = entity.FirstName,
        LastName = entity.LastName,
        MiddleInitial = entity.MiddleInitial ?? "",
    };

    public static EmployeeEntity AsEntity(this EmployeeModel model) => new()
    {
        EmployeeId = model.EmployeeId,
        FirstName = model.FirstName,
        LastName = model.LastName,
        MiddleInitial = string.IsNullOrWhiteSpace(model.MiddleInitial) ? null : model.MiddleInitial
    };

    public static CustomerModel AsModel(this CustomerEntity entity) => new()
    {
        CustomerId = entity.CustomerId,
        FirstName = entity.FirstName,
        LastName = entity.LastName,
        MiddleInitial = entity.MiddleInitial ?? ""
    };

    public static CustomerEntity AsEntity(this CustomerModel model) => new()
    {
        CustomerId = model.CustomerId,
        FirstName = model.FirstName,
        LastName = model.LastName,
        MiddleInitial = string.IsNullOrWhiteSpace(model.MiddleInitial) ? null : model.MiddleInitial
    };

    public static ProductModel AsModel(this ProductEntity entity) => new()
    {
        ProductId = entity.ProductId,
        Name = entity.Name,
        Price = entity.Price
    };

    public static ProductEntity AsEntity(this ProductModel model) => new()
    {
        ProductId = model.ProductId,
        Name = model.Name,
        Price = model.Price
    };

    public static OrderModel AsModel(this OrderEntity entity) => new()
    {
        OrderId = entity.OrderId,
        ProductId = entity.ProductId,
        CustomerId = entity.CustomerId,
        SalesPersonId = entity.SalesPersonId,
        Quantity = entity.Quantity,
    };

    public static OrderEntity AsEntity(this OrderModel model) => new()
    {
        OrderId = model.OrderId,
        ProductId = model.ProductId,
        CustomerId = model.CustomerId,
        SalesPersonId = model.SalesPersonId,
        Quantity = model.Quantity
    };
}