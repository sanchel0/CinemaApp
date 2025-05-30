using Application.DTOs.Auditorium;
using Application.DTOs.Location;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Cinema
{
    public class CinemaDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public CityDto City { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }
        public bool IsActive { get; set; }
        public List<AuditoriumDto> Auditoriums { get; set; } = new();
    }
}
