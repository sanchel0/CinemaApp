using Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Cinema
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CityId { get; set; }
        public City City { get; set; } = null!;
        public string Location { get; set; } = null!; 
        public string Address { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public TimeSpan OpeningTime { get; set; }
        public TimeSpan ClosingTime { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<Auditorium> Auditoriums { get; set; } = new List<Auditorium>();
    }
}
