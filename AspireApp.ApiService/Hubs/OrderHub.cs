using Microsoft.AspNetCore.SignalR;

public class OrderHub : Hub
{
    public const string OrderCreated = "OrderCreated";
    public const string OrderUpdated = "OrderUpdated";
    public const string OrderDeleted = "OrderDeleted";

    public async Task CreateOrder(Guid orderId)
    {
        await Clients.Others.SendAsync(OrderCreated, orderId);
    }

    public async Task UpdateOrder(Guid orderId)
    {
        await Clients.Others.SendAsync(OrderUpdated, orderId);
    }

    public async Task DeleteOrder(Guid orderId)
    {
        await Clients.Others.SendAsync(OrderDeleted, orderId);
    }
}