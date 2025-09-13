using Microsoft.AspNetCore.SignalR;

public class CustomerHub : Hub
{
    public const string CustomerCreated = "CustomerCreated";
    public const string CustomerUpdated = "CustomerUpdated";
    public const string CustomerDeleted = "CustomerDeleted";

    public async Task CreateCustomer(int customerId)
    {
        await Clients.Others.SendAsync(CustomerCreated, customerId);
    }

    public async Task UpdateCustomer(int customerId)
    {
        await Clients.Others.SendAsync(CustomerUpdated, customerId);
    }

    public async Task DeleteCustomer(int customerId)
    {
        await Clients.Others.SendAsync(CustomerDeleted, customerId);
    }
}