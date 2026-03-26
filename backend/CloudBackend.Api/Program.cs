using CloudBackend.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Baza danych
builder.Services.AddDbContext<AppDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// API / kontrolery / swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
   options.AddPolicy("AllowFrontend", policy =>
   {
       policy
           .WithOrigins(
               "https://systemrezerwacji-frontend-dag2d5bygbd3hsgd.spaincentral-01.azurewebsites.net",
               "http://localhost:5173",
               "http://localhost:3000"
           )
           .AllowAnyHeader()
           .AllowAnyMethod();
   });
});

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// CORS
app.UseCors("AllowFrontend");

// Authorization
app.UseAuthorization();

// Kontrolery
app.MapControllers();

app.Run();
