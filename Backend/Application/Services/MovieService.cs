using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Movie;
using Application.DTOs.Actor;
using Application.DTOs.Director;
using Application.DTOs.Genre;

namespace Application.Services
{
    public class MovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IActorRepository _actorRepository;
        private readonly IDirectorRepository _directorRepository;
        private readonly IGenreRepository _genreRepository;

        public MovieService(
            IMovieRepository movieRepository,
            IActorRepository actorRepository,
            IDirectorRepository directorRepository,
            IGenreRepository genreRepository)
        {
            _movieRepository = movieRepository;
            _actorRepository = actorRepository;
            _directorRepository = directorRepository;
            _genreRepository = genreRepository;
        }

        public async Task<IEnumerable<MovieDto>> GetAllAsync()
        {
            var movies = await _movieRepository.GetAllAsync();
            return movies.Select(MapToDto);
        }

        public async Task<MovieDto?> GetByIdAsync(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            return movie == null ? null : MapToDto(movie);
        }

        public async Task CreateAsync(CreateMovieDto dto)
        {
            var movie = new Movie
            {
                Title = dto.Title,
                Description = dto.Description,
                Duration = dto.Duration,
                ReleaseDate = dto.ReleaseDate,
                EndDate = dto.EndDate,
                Classification = dto.Classification,
                PosterUrl = dto.PosterUrl,
                LastUpdate = DateTime.UtcNow,

                Actors = await _actorRepository.GetByIdsAsync(dto.ActorIds),
                Directors = await _directorRepository.GetByIdsAsync(dto.DirectorIds),
                Genres = await _genreRepository.GetByIdsAsync(dto.GenreIds)
            };

            var result = await _movieRepository.AddAsync(movie);
        }

        public async Task UpdateAsync(UpdateMovieDto dto)
        {
            var movie = await _movieRepository.GetByIdAsync(dto.Id);
            if (movie == null) return;

            movie.Title = dto.Title;
            movie.Description = dto.Description;
            movie.Duration = dto.Duration;
            movie.ReleaseDate = dto.ReleaseDate;
            movie.EndDate = dto.EndDate;
            movie.Classification = dto.Classification;
            movie.PosterUrl = dto.PosterUrl;
            movie.LastUpdate = DateTime.UtcNow;

            movie.Actors = await _actorRepository.GetByIdsAsync(dto.ActorIds);
            movie.Directors = await _directorRepository.GetByIdsAsync(dto.DirectorIds);
            movie.Genres = await _genreRepository.GetByIdsAsync(dto.GenreIds);

            await _movieRepository.UpdateAsync(movie);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            if (movie == null) return false;

            await _movieRepository.DeleteAsync(id);
            return true;
        }

        private MovieDto MapToDto(Movie movie)
        {
            return new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                Duration = movie.Duration,
                ReleaseDate = movie.ReleaseDate,
                EndDate = movie.EndDate,
                Classification = movie.Classification,
                PosterUrl = movie.PosterUrl,
                LastUpdate = movie.LastUpdate,
                Actors = movie.Actors.Select(a => new ActorDto { Id = a.Id, Name = a.Name }).ToList(),
                Directors = movie.Directors.Select(d => new DirectorDto { Id = d.Id, Name = d.Name }).ToList(),
                Genres = movie.Genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name }).ToList()
            };
        }
    }
}
