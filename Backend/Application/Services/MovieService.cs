using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MovieService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<IEnumerable<Movie>> GetAllMoviesAsync()
        {
            return await _movieRepository.GetAllAsync();
        }

        public async Task<Movie?> GetMovieByIdAsync(int id)
        {
            return await _movieRepository.GetByIdAsync(id);
        }

        public async Task<Movie> CreateMovieAsync(Movie movie)
        {
            await _movieRepository.AddAsync(movie);
            return movie;
        }

        public async Task<Movie> UpdateMovieAsync(Movie movie)
        {
            await _movieRepository.UpdateAsync(movie);
            return movie;
        }

        public async Task DeleteMovieAsync(int id)
        {
            await _movieRepository.DeleteAsync(id);
        }
    }
}
