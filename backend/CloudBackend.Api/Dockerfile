FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["CloudBackend.Api.csproj", "./"]
RUN dotnet restore "CloudBackend.Api.csproj"
COPY . .
RUN dotnet publish "CloudBackend.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8081
EXPOSE 8081
ENTRYPOINT ["dotnet", "CloudBackend.Api.dll"]
