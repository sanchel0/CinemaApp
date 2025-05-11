using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Ticket
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        // Clave foránea hacia Purchase (opcional)
        public int? PurchaseId { get; set; }  // Opcional, puede ser null si no hay compra de tickets

        public Purchase? Purchase { get; set; }

        public int ShowtimeId { get; set; }
        public Showtime Showtime { get; set; } = null!;

        public int SeatId { get; set; }
        public Seat Seat { get; set; } = null!;

        
    }
}
