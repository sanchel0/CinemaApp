using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Seat
{
    public class CreateSeatDto
    {
        public string Row { get; set; } = null!;
        public int Number { get; set; }
    }
}
