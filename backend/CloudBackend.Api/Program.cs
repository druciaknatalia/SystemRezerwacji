using CloudBackend.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Połączenie z bazą danych Azure SQL / SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Kontrolery
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS dla frontendu
builder.Services.AddCors(options =>
{
   options.AddPolicy("frontend", policy =>
   {
       policy.AllowAnyOrigin()
             .AllowAnyHeader()
             .AllowAnyMethod();
   });
});

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// CORS
app.UseCors("frontend");

// Routing do kontrolerów
app.MapControllers();

app.Run();
