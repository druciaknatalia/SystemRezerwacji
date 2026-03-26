using CloudBackend.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Połączenie z bazą
builder.Services.AddDbContext<AppDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Kontrolery i Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS dla frontendu z Azure
builder.Services.AddCors(options =>
{
   options.AddPolicy("AllowFrontend", policy =>
   {
       policy
           .WithOrigins(
               "https://systemrezerwacji-frontend-dag2d5bygbd3hsgd.spaincentral-01.azurewebsites.net",
               "http://localhost:3000",
               "http://localhost:5173"
           )
           .AllowAnyHeader()
           .AllowAnyMethod();
   });
});

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// HTTPS
app.UseHttpsRedirection();

// CORS
app.UseCors("AllowFrontend");

// Autoryzacja
app.UseAuthorization();

// Mapowanie kontrolerów
app.MapControllers();

app.Run();
