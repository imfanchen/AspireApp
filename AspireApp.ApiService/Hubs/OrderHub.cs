using Microsoft.AspNetCore.SignalR;

public class OrderHub : Hub {

    public async Task CreateOrder(Guid orderId) {
        await Clients.All.SendAsync("OrderCreated", orderId);
    }

    public async Task UpdateOrder(Guid orderId) {
        await Clients.All.SendAsync("OrderUpdated", orderId);
    }

    public async Task DeleteOrder(Guid orderId) {
        await Clients.All.SendAsync("OrderDeleted", orderId);
    }
}