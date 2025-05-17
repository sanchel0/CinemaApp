using Application.DTOs.Actor;
using Application.DTOs.Director;
using Application.DTOs.Genre;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Movie
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Classification { get; set; } = null!;
        public string PosterUrl { get; set; } = null!;
        public DateTime LastUpdate { get; set; }

        public List<ActorDto> Actors { get; set; } = new();
        public List<DirectorDto> Directors { get; set; } = new();
        public List<GenreDto> Genres { get; set; } = new();
    }
}
