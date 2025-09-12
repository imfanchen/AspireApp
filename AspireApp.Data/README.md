This project contains entities and contexts for entity framework.

To install the prerequisites, run the following steps

```powershell
cd .\AspireApp.ApiService
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
```


To create the database manually, run the following steps

```powershell
dotnet ef migrations add InitialCreate --project ..\AspireApp.Data\AspireApp.Data.csproj --verbose
dotnet ef database update
```

To delete the database manually, run the following steps

```powershell
dotnet ef database drop
dotnet ef migration remove --project ..\AspireApp.Data\AspireApp.Data.csproj --verbose
```