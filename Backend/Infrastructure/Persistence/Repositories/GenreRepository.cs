using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly AppDbContext _context;

        public GenreRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Genre>> GetAllAsync()
            => await _context.Genres.ToListAsync();

        public async Task<Genre?> GetByIdAsync(int id)
            => await _context.Genres.FindAsync(id);

        public async Task<List<Genre>> GetByIdsAsync(List<int> ids)
        {
            return await _context.Genres
                .Where(a => ids.Contains(a.Id))
                .ToListAsync();
        }

        public async Task<IEnumerable<Genre>> GetByNameAsync(string name)
        {
            return await _context.Genres
                .Where(g => g.Name.Contains(name))
                .OrderBy(g => g.Name)
                .Take(4)
                .ToListAsync();
        }

        public async Task<Genre> AddAsync(Genre genre)
        {
            _context.Genres.Add(genre);
            await _context.SaveChangesAsync();
            return genre;
        }

        public async Task<Genre> UpdateAsync(Genre genre)
        {
            _context.Genres.Update(genre);
            await _context.SaveChangesAsync();
            return genre;
        }

        public async Task DeleteAsync(int id)
        {
            var genre = await _context.Genres.FindAsync(id);
            if (genre != null)
            {
                _context.Genres.Remove(genre);
                await _context.SaveChangesAsync();
            }
        }
    }
}
