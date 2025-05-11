using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Duration { get; set; } // en minutos
        public DateTime ReleaseDate { get; set; }
        public string Classification { get; set; } = null!; // ATP, +13, etc.
        public string PosterUrl { get; set; } = null!;

        public ICollection<Actor> Actors { get; set; } = new List<Actor>();
        public ICollection<Director> Directors { get; set; } = new List<Director>();
        public ICollection<Genre> Genres { get; set; } = new List<Genre>();
    }
}
