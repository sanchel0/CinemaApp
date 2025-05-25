using Domain.Repositories;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.Showtime;

namespace Application.Services
{
    public class ShowtimeService
    {
        private readonly IShowtimeRepository _repository;

        public ShowtimeService(IShowtimeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ShowtimeDto>> GetAllAsync()
        {
            var showtimes = await _repository.GetAllAsync();
            return showtimes.Select(MapToDto);
        }

        public async Task<ShowtimeDto?> GetByIdAsync(int id)
        {
            var showtime = await _repository.GetByIdAsync(id);
            return showtime == null ? null : MapToDto(showtime);
        }

        public async Task<ShowtimeDto> CreateAsync(CreateShowtimeDto dto)
        {
            var showtime = new Showtime
            {
                StartTime = dto.StartTime,
                MovieId = dto.MovieId,
                AuditoriumId = dto.AuditoriumId
            };

            showtime = await _repository.AddAsync(showtime);
            return MapToDto(showtime);
        }

        public async Task UpdateAsync(int id, ShowtimeDto dto)
        {
            var showtime = await _repository.GetByIdAsync(id);
            if (showtime == null) return;

            showtime.StartTime = dto.StartTime;
            showtime.MovieId = dto.MovieId;
            showtime.AuditoriumId = dto.AuditoriumId;

            await _repository.UpdateAsync(showtime);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        private ShowtimeDto MapToDto(Showtime showtime)
        {
            return new ShowtimeDto
            {
                Id = showtime.Id,
                StartTime = showtime.StartTime,
                MovieId = showtime.MovieId,
                MovieTitle = showtime.Movie?.Title,
                AuditoriumId = showtime.AuditoriumId,
                AuditoriumName = showtime.Auditorium?.Name
            };
        }
    }
}
