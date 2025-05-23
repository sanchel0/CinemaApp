using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Auditorium
{
    public class CreateAuditoriumDto
    {
        public string Name { get; set; } = null!;
        public int Capacity { get; set; }
        public int CinemaId { get; set; }
    }
}
