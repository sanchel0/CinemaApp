using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Movie
{
    public class UpdateMovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Classification { get; set; } = null!;
        public string PosterUrl { get; set; } = null!;

        public List<int> ActorIds { get; set; } = new();
        public List<int> DirectorIds { get; set; } = new();
        public List<int> GenreIds { get; set; } = new();
    }
}
