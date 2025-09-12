using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddSqlServerDbContext<DefaultDataContext>("database");
//builder.Services.AddDbContextPool<DefaultDataContext>(o=> o.UseSqlServer("database"));
builder.Services.AddScoped<CustomerRepository>();
builder.Services.AddScoped<EmployeeRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<OrderRepository>();

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Add controllers support (API).
builder.Services.AddControllers();

// Add SignalR for real-time web functionality
builder.Services.AddSignalR();

// Normalize API routes
builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true; // optional
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Make the app require authenticated Windows credentials by default (unless an endpoint has [AllowAnonymous]),
// builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme).AddNegotiate();
// builder.Services.AddAuthorization(options =>
// {
//     options.FallbackPolicy = options.DefaultPolicy;
// });

// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(policy =>
//     {
//         // For production, specify the allowed origins with .WithOrigins("https://example.com")
//         policy.WithOrigins("http://localhost:3000") // Adjust this to your client app url
//         .AllowAnyHeader()
//         .AllowAnyMethod()
//         .AllowCredentials();
//     });
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<DefaultDataContext>();
        context.Database.Migrate();
        Initializer.SeedData(context);
    }

    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days.
    // You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Redirect HTTP requests to HTTPS.
app.UseHttpsRedirection();

// Enable CORS
// app.UseCors();

// Uncomment the following lines to enable windows authentication and authorization
// app.UseAuthentication();
// app.UseAuthorization();

// Enable SingalR hubs for real-time communication
app.MapHub<MessageHub>("/hub/message");
app.MapHub<OrderHub>("/hub/order", options =>
{
    options.AllowStatefulReconnects = true;
});

// Map default health, liveness, and readiness endpoints
app.MapDefaultEndpoints();

// Map controllers for API
app.MapControllers();

app.Run();


