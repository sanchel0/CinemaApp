using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Seat
    {
        public int Id { get; set; }
        public string Row { get; set; } = null!; // A, B, C, etc.
        public int Number { get; set; }          // 1, 2, 3, etc.

        public int AuditoriumId { get; set; }
        public Auditorium Auditorium { get; set; } = null!;
    }
}
