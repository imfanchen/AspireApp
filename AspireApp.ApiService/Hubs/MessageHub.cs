using Microsoft.AspNetCore.SignalR;

public class MessageHub : Hub
{
    public async Task SendMessage(UserMessageRequest message)
    {
        await Clients.All.SendAsync("MessageReceived", message);
    }
}

public class UserMessageRequest
{
    public string User { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}