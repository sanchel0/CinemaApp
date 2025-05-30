using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Locations
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int StateId { get; set; }
        public State State { get; set; } = null!;
        public string TimeZone { get; set; } = null!;
        public ICollection<Cinema> Cinemas { get; set; } = new List<Cinema>();
    }
}
