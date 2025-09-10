This project contains entities and contexts for entity framework.

To create the database manually, run the following steps

```powershell

dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
cd .\AspireApp.ApiService
dotnet ef migrations add InitialCreate --project ..\AspireApp.Data\AspireApp.Data.csproj --verbose
dotnet ef database update

```