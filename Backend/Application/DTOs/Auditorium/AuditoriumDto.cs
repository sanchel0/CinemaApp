using Application.DTOs.Seat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Auditorium
{
    public class AuditoriumDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Capacity { get; set; }

        public int CinemaId { get; set; }
        public string? CinemaName { get; set; }
        public List<SeatDto> Seats { get; set; } = new();
    }
}
