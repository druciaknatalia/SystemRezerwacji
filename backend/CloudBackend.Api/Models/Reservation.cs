namespace CloudBackend.Api.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public string ServiceName { get; set; } = string.Empty;
        public DateTime ReservationDate { get; set; }
        public bool IsConfirmed { get; set; } = true;
    }
}
