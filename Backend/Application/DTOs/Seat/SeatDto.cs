using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Seat
{
    public class SeatDto
    {
        public int Id { get; set; }
        public string Row { get; set; } = null!;
        public int Number { get; set; }

        public int AuditoriumId { get; set; }
    }
}
