var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var database = builder.AddSqlServer("sql-server")
    .WithDataVolume()
    .WithLifetime(ContainerLifetime.Persistent)
    .AddDatabase("database");

var backend = builder.AddProject<Projects.AspireApp_ApiService>("backend")
    .WithReplicas(1)
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/health")
    .WithReference(cache).WaitFor(cache)
    .WithReference(database).WaitFor(database);

builder.AddNpmApp("frontend", "../AspireApp.Web", "dev")
    .WithReference(backend)
    .WaitFor(backend)
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
