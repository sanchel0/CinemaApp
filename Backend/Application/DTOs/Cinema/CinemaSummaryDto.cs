using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Cinema
{
    public class CinemaSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Country { get; set; } = null!; 
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public bool IsActive { get; set; }
    }

}
