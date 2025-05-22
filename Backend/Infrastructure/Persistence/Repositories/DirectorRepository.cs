using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class DirectorRepository : IDirectorRepository
    {
        private readonly AppDbContext _context;

        public DirectorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Director>> GetAllAsync()
            => await _context.Directors.ToListAsync();

        public async Task<Director?> GetByIdAsync(int id)
            => await _context.Directors.FindAsync(id);

        public async Task<List<Director>> GetByIdsAsync(List<int> ids)
        {
            return await _context.Directors
                .Where(a => ids.Contains(a.Id))
                .ToListAsync();
        }

        public async Task<IEnumerable<Director>> GetByNameAsync(string name)
        {
            return await _context.Directors
                .Where(d => d.Name.Contains(name))
                .OrderBy(d => d.Name)
                .Take(4)
                .ToListAsync();
        }

        public async Task<Director> AddAsync(Director director)
        {
            _context.Directors.Add(director);
            await _context.SaveChangesAsync();
            return director;
        }

        public async Task<Director> UpdateAsync(Director director)
        {
            _context.Directors.Update(director);
            await _context.SaveChangesAsync();
            return director;
        }

        public async Task DeleteAsync(int id)
        {
            var director = await _context.Directors.FindAsync(id);
            if (director != null)
            {
                _context.Directors.Remove(director);
                await _context.SaveChangesAsync();
            }
        }
    }
}
