using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Locations
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string IsoCode { get; set; } = null!;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public ICollection<State> States { get; set; } = new List<State>();
    }
}
