using Application.DTOs.Cinema;
using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Auditorium;

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
                Country = c.Country,
                City = c.City,
                State = c.State,
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
                Country = dto.Country,
                City = dto.City,
                State = dto.State,
                Location = dto.Location,
                Address = dto.Address,
                PostalCode = dto.PostalCode,
                TimeZone = dto.TimeZone,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
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
            cinema.Country = dto.Country;
            cinema.City = dto.City;
            cinema.State = dto.State;
            cinema.Location = dto.Location;
            cinema.Address = dto.Address;
            cinema.PostalCode = dto.PostalCode;
            cinema.TimeZone = dto.TimeZone;
            cinema.PhoneNumber = dto.PhoneNumber;
            cinema.Email = dto.Email;
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
                Country = cinema.Country,
                City = cinema.City,
                State = cinema.State,
                Location = cinema.Location,
                Address = cinema.Address,
                PostalCode = cinema.PostalCode,
                TimeZone = cinema.TimeZone,
                PhoneNumber = cinema.PhoneNumber,
                Email = cinema.Email,
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
