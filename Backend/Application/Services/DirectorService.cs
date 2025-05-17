using Application.DTOs.Director;
using Domain;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DirectorService
    {
        private readonly IDirectorRepository _repository;

        public DirectorService(IDirectorRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<DirectorDto>> GetAllAsync()
        {
            var directors = await _repository.GetAllAsync();
            return directors.Select(d => new DirectorDto { Id = d.Id, Name = d.Name });
        }

        public async Task<DirectorDto?> GetByIdAsync(int id)
        {
            var director = await _repository.GetByIdAsync(id);
            return director == null ? null : new DirectorDto { Id = director.Id, Name = director.Name };
        }

        public async Task<DirectorDto> CreateAsync(CreateDirectorDto dto)
        {
            var director = new Director { Name = dto.Name };
            var result = await _repository.AddAsync(director);
            return new DirectorDto { Id = result.Id, Name = result.Name };
        }

        public async Task<DirectorDto?> UpdateAsync(DirectorDto dto)
        {
            var existing = await _repository.GetByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            var result = await _repository.UpdateAsync(existing);
            return new DirectorDto { Id = result.Id, Name = result.Name };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var director = await _repository.GetByIdAsync(id);
            if (director == null) return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
