using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class AuditoriumRepository : IAuditoriumRepository
    {
        private readonly AppDbContext _context;

        public AuditoriumRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Auditorium>> GetAllAsync()
        {
            return await _context.Auditoriums
                .Include(a => a.Seats)
                .Include(a => a.Cinema)
                .ToListAsync();
        }

        public async Task<Auditorium?> GetByIdAsync(int id)
        {
            return await _context.Auditoriums
                .Include(a => a.Seats)
                .Include(a => a.Cinema)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Auditorium> AddAsync(Auditorium auditorium)
        {
            _context.Auditoriums.Add(auditorium);
            await _context.SaveChangesAsync();
            return auditorium;
        }

        public async Task<Auditorium> UpdateAsync(Auditorium auditorium)
        {
            _context.Auditoriums.Update(auditorium);
            await _context.SaveChangesAsync();
            return auditorium;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var auditorium = await _context.Auditoriums.FindAsync(id);
            if (auditorium != null)
            {
                _context.Auditoriums.Remove(auditorium);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
