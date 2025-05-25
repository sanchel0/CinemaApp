using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Showtime
{
    public class ShowtimeDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public int MovieId { get; set; }
        public string? MovieTitle { get; set; }
        public int AuditoriumId { get; set; }
        public string? AuditoriumName { get; set; }
    }
}
