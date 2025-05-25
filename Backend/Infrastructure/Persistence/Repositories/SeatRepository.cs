using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class SeatRepository : ISeatRepository
    {
        private readonly AppDbContext _context;

        public SeatRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Seat>> GetByAuditoriumIdAsync(int auditoriumId)
        {
            return await _context.Seats
                .Where(s => s.AuditoriumId == auditoriumId)
                .ToListAsync();
        }

        public async Task<Seat> AddAsync(Seat seat)
        {
            _context.Seats.Add(seat);
            await _context.SaveChangesAsync();
            return seat;
        }
        
        public async Task UpdateAsync(Seat seat)
        {
            _context.Seats.Update(seat);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var seat = await _context.Seats.FindAsync(id);
            if (seat != null)
            {
                _context.Seats.Remove(seat);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        
        public async Task<bool> DeleteByAuditoriumIdAsync(int auditoriumId)
        {
            try
            {
                var seats = await _context.Seats
                    .Where(s => s.AuditoriumId == auditoriumId)
                    .ToListAsync();
                if (seats.Any())
                {
                    _context.Seats.RemoveRange(seats);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
