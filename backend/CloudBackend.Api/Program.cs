using CloudBackend.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Database connection
builder.Services.AddDbContext<AppDbContext>(options =>
   options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for frontend
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

// Controllers
app.MapControllers();

// Wait for database and create tables
using (var scope = app.Services.CreateScope())
{
   var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

   var retries = 10;
   while (retries > 0)
   {
       try
       {
           db.Database.EnsureCreated();
           break;
       }
       catch (Exception ex)
       {
           retries--;
           Console.WriteLine("Waiting for database...");
           Console.WriteLine(ex.Message);
           Thread.Sleep(3000);
       }
   }
}

app.Run();

