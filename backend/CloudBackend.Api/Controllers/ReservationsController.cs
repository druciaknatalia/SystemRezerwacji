using CloudBackend.Api.Data;
using CloudBackend.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CloudBackend.Api.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class ReservationsController : ControllerBase
   {
       private readonly AppDbContext _context;

       public ReservationsController(AppDbContext context)
       {
           _context = context;
       }

       [HttpGet]
       public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
       {
           var reservations = await _context.Reservations
               .OrderBy(r => r.ReservationDate)
               .ToListAsync();

           return Ok(reservations);
       }

       [HttpGet("check")]
       public async Task<ActionResult<object>> CheckAvailability([FromQuery] DateTime reservationDate)
       {
           var exists = await _context.Reservations
               .AnyAsync(r => r.ReservationDate == reservationDate);

           return Ok(new
           {
               reservationDate,
               isAvailable = !exists
           });
       }

       [HttpPost]
       public async Task<ActionResult> CreateReservation([FromBody] Reservation reservation)
       {
           if (string.IsNullOrWhiteSpace(reservation.ClientName))
               return BadRequest("ClientName is required.");

           if (string.IsNullOrWhiteSpace(reservation.ServiceName))
               return BadRequest("ServiceName is required.");

           if (reservation.ReservationDate == default)
               return BadRequest("ReservationDate is required.");

           var exists = await _context.Reservations
               .AnyAsync(r => r.ReservationDate == reservation.ReservationDate);

           if (exists)
           {
               return Conflict("Ten termin jest już zajęty.");
           }

           _context.Reservations.Add(reservation);
           await _context.SaveChangesAsync();

           return Ok(reservation);
       }

       [HttpDelete("{id}")]
       public async Task<ActionResult> DeleteReservation(int id)
       {
           var reservation = await _context.Reservations.FindAsync(id);

           if (reservation == null)
               return NotFound();

           _context.Reservations.Remove(reservation);
           await _context.SaveChangesAsync();

           return NoContent();
       }
   }
}
