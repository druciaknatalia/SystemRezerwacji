using CloudBackend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CloudBackend.Api.Data
{
   public class AppDbContext : DbContext
   {
       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
       {
       }

       public DbSet<Reservation> Reservations { get; set; }
   }
}
