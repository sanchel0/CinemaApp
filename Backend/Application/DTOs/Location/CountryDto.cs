using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Location
{
    public class CountryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string IsoCode { get; set; } = null!;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
