using Application.DTOs.Actor;
using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ActorService
    {
        private readonly IActorRepository _repository;

        public ActorService(IActorRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ActorDto>> GetAllAsync()
        {
            var actors = await _repository.GetAllAsync();
            return actors.Select(a => new ActorDto { Id = a.Id, Name = a.Name });
        }

        public async Task<ActorDto?> GetByIdAsync(int id)
        {
            var actor = await _repository.GetByIdAsync(id);
            return actor == null ? null : new ActorDto { Id = actor.Id, Name = actor.Name };
        }

        public async Task<ActorDto> CreateAsync(CreateActorDto dto)
        {
            var actor = new Actor { Name = dto.Name };
            var result = await _repository.AddAsync(actor);
            return new ActorDto { Id = result.Id, Name = result.Name };
        }

        public async Task<ActorDto?> UpdateAsync(ActorDto dto)
        {
            var existing = await _repository.GetByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            var result = await _repository.UpdateAsync(existing);
            return new ActorDto { Id = result.Id, Name = result.Name };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var actor = await _repository.GetByIdAsync(id);
            if (actor == null) return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
