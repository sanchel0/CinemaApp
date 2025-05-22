using Application.DTOs.Genre;
using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class GenreService
    {
        private readonly IGenreRepository _repository;

        public GenreService(IGenreRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<GenreDto>> GetAllAsync()
        {
            var genres = await _repository.GetAllAsync();
            return genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name });
        }

        public async Task<GenreDto?> GetByIdAsync(int id)
        {
            var genre = await _repository.GetByIdAsync(id);
            return genre == null ? null : new GenreDto { Id = genre.Id, Name = genre.Name };
        }

        public async Task<IEnumerable<GenreDto>> GetByNameAsync(string name)
        {
            var genres = await _repository.GetByNameAsync(name);
            return genres.Select(g => new GenreDto { Id = g.Id, Name = g.Name });
        }

        public async Task<GenreDto> CreateAsync(CreateGenreDto dto)
        {
            var genre = new Genre { Name = dto.Name };
            var result = await _repository.AddAsync(genre);
            return new GenreDto { Id = result.Id, Name = result.Name };
        }

        public async Task<GenreDto?> UpdateAsync(GenreDto dto)
        {
            var existing = await _repository.GetByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            var result = await _repository.UpdateAsync(existing);
            return new GenreDto { Id = result.Id, Name = result.Name };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var genre = await _repository.GetByIdAsync(id);
            if (genre == null) return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
