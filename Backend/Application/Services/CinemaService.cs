using Application.DTOs.Cinema;
using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Auditorium;
using Application.DTOs.Location;

namespace Application.Services
{
    public class CinemaService
    {
        private readonly ICinemaRepository _repository;

        public CinemaService(ICinemaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CinemaSummaryDto>> GetAllAsync()
        {
            var cinemas = await _repository.GetAllAsync();
            return cinemas.Select(c => new CinemaSummaryDto
            {
                Id = c.Id,
                Name = c.Name,
                City = new CityDto { Id = c.City.Id, Name = c.City.Name, StateId = c.City.StateId },
                IsActive = c.IsActive
            });
        }

        public async Task<CinemaDto?> GetByIdAsync(int id)
        {
            var cinema = await _repository.GetByIdAsync(id);
            return cinema == null ? null : MapToDto(cinema);
        }

        public async Task<CinemaDto> CreateAsync(CreateCinemaDto dto)
        {
            var cinema = new Cinema
            {
                Name = dto.Name,
                CityId = dto.City.Id,
                Location = dto.Location,
                Address = dto.Address,
                PostalCode = dto.PostalCode,
                OpeningTime = dto.OpeningTime,
                ClosingTime = dto.ClosingTime,
                IsActive = dto.IsActive
            };

            var created = await _repository.AddAsync(cinema);
            return MapToDto(created);
        }

        public async Task<CinemaDto?> UpdateAsync(int id, CinemaDto dto)
        {
            var cinema = await _repository.GetByIdAsync(id);
            if (cinema == null) return null;

            cinema.Name = dto.Name;
            cinema.CityId = dto.City.Id;
            cinema.Location = dto.Location;
            cinema.Address = dto.Address;
            cinema.PostalCode = dto.PostalCode;
            cinema.OpeningTime = dto.OpeningTime;
            cinema.ClosingTime = dto.ClosingTime;
            cinema.IsActive = dto.IsActive;

            var updated = await _repository.UpdateAsync(cinema);
            return MapToDto(updated);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        private CinemaDto MapToDto(Cinema cinema)
        {
            return new CinemaDto
            {
                Id = cinema.Id,
                Name = cinema.Name,
                City = new CityDto { Id = cinema.City.Id, Name = cinema.City.Name, StateId = cinema.City.StateId },
                Location = cinema.Location,
                Address = cinema.Address,
                PostalCode = cinema.PostalCode,
                OpeningTime = cinema.OpeningTime,
                ClosingTime = cinema.ClosingTime,
                IsActive = cinema.IsActive,
                Auditoriums = cinema.Auditoriums != null && cinema.Auditoriums.Any()
                    ? cinema.Auditoriums.Select(a => new AuditoriumDto
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Capacity = a.Capacity
                    }).ToList()
                    : new List<AuditoriumDto>()
            };
        }
    }
}
