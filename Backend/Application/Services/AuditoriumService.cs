using Application.DTOs.Auditorium;
using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Seat;

namespace Application.Services
{
    public class AuditoriumService
    {
        private readonly IAuditoriumRepository _auditoriumRepository;
        private readonly ISeatRepository _seatRepository;

        public AuditoriumService(
            IAuditoriumRepository auditoriumRepository,
            ISeatRepository seatRepository)
        {
            _auditoriumRepository = auditoriumRepository;
            _seatRepository = seatRepository;
        }

        public async Task<IEnumerable<AuditoriumDto>> GetAllAsync()
        {
            var auditoriums = await _auditoriumRepository.GetAllAsync();
            return auditoriums.Select(MapToDto);
        }

        public async Task<AuditoriumDto?> GetByIdAsync(int id)
        {
            var auditorium = await _auditoriumRepository.GetByIdAsync(id);
            return auditorium == null ? null : MapToDto(auditorium);
        }
        
        public async Task<AuditoriumDto> CreateAsync(CreateAuditoriumDto dto)
        {
            var auditorium = new Auditorium
            {
                Name = dto.Name,
                Capacity = dto.Capacity,
                CinemaId = dto.CinemaId
            };

            auditorium = await _auditoriumRepository.AddAsync(auditorium);

            var seats = dto.Seats.Select(s => new Seat
            {
                Row = s.Row,
                Number = s.Number,
                AuditoriumId = auditorium.Id
            }).ToList();

            // Guardar seats (en batch o uno por uno)
            foreach (var seat in seats)
            {
                await _seatRepository.AddAsync(seat);
            }

            auditorium.Seats = seats;

            return MapToDto(auditorium);
        }

        public async Task UpdateAsync(AuditoriumDto dto)
        {
            var auditorium = await _auditoriumRepository.GetByIdAsync(dto.Id);
            if (auditorium == null) return;

            auditorium.Name = dto.Name;
            auditorium.Capacity = dto.Capacity;
            auditorium.CinemaId = dto.CinemaId;

            await _auditoriumRepository.UpdateAsync(auditorium);

            var currentSeats = await _seatRepository.GetByAuditoriumIdAsync(dto.Id);

            // Comparar y sincronizar asientos
            var seatsToUpdate = dto.Seats.Where(s => s.Id != 0).ToList();
            var seatsToAdd = dto.Seats.Where(s => s.Id == 0).ToList();
            var seatsToDelete = currentSeats.Where(cs => !dto.Seats.Any(s => s.Id == cs.Id)).ToList();

            // Actualizar asientos existentes
            foreach (var seatDto in seatsToUpdate)
            {
                var seat = currentSeats.FirstOrDefault(cs => cs.Id == seatDto.Id);
                if (seat != null)
                {
                    seat.Row = seatDto.Row;
                    seat.Number = seatDto.Number;
                    await _seatRepository.UpdateAsync(seat);
                }
            }

            // Agregar nuevos asientos
            foreach (var seatDto in seatsToAdd)
            {
                var newSeat = new Seat
                {
                    AuditoriumId = dto.Id,
                    Row = seatDto.Row,
                    Number = seatDto.Number
                };
                await _seatRepository.AddAsync(newSeat);
            }

            // Eliminar asientos removidos
            foreach (var seat in seatsToDelete)
            {
                await _seatRepository.DeleteAsync(seat.Id);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            // Primero borrar seats para evitar problemas con FK
            var result = await _seatRepository.DeleteByAuditoriumIdAsync(id);
            if (result)
            {
                // Luego borrar el auditorio
                return await _auditoriumRepository.DeleteAsync(id);
            }
            return false;
        }

        private AuditoriumDto MapToDto(Auditorium auditorium)
        {
            return new AuditoriumDto
            {
                Id = auditorium.Id,
                Name = auditorium.Name,
                Capacity = auditorium.Capacity,
                CinemaId = auditorium.CinemaId,
                CinemaName = auditorium.Cinema?.Name,
                Seats = auditorium.Seats.Select(s => new SeatDto
                {
                    Id = s.Id,
                    Row = s.Row,
                    Number = s.Number,
                }).ToList()
            };
        }
    }

}
