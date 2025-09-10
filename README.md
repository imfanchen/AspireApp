# Aspire App

## Introduction

This is a sample full-stack application built with  .NET Aspire and React.

## Prerequisites

To work with .NET Aspire, you need the following installed locally:

.NET SDK 8.0 or above

An OCI compliant container runtime, such as:

- Docker Desktop or 
- Podman

An Integrated Developer Environment (IDE) or code editor, such as:

- Visual Studio 2022 or
- Visual Studio Code with C# Dev Kit extension or
- JetBrains Rider with .NET Aspire plugin

## Development

To start the solution locally, run the following command in the terminal

```powershell
dotnet tool install -g Aspire.Cli

aspire run
```

## Deployment

TBD, most likely through github actions

Plus some other Azure Cloud Services for security, scalability and fault-tolerance:

- Azure App Service
- Azure Container Service
- Azure SQL Server Database
- Azure Cache for Redis
- Azure SignalR Service
- Azure Service Bus
- Azure Key Vault
- Azure Blob Storage
- Azure OpenAI Service
- Microsoft Entra