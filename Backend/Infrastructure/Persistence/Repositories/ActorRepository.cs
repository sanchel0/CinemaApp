using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Repositories;

namespace Infrastructure.Persistence.Repositories
{
    public class ActorRepository : IActorRepository
    {
        private readonly AppDbContext _context;

        public ActorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Actor>> GetAllAsync()
            => await _context.Actors.ToListAsync();

        public async Task<Actor?> GetByIdAsync(int id)
            => await _context.Actors.FindAsync(id);

        public async Task<List<Actor>> GetByIdsAsync(List<int> ids)
        {
            return await _context.Actors
                .Where(a => ids.Contains(a.Id))
                .ToListAsync();
        }

        public async Task<IEnumerable<Actor>> GetByNameAsync(string name)
        {
            return await _context.Actors
                .Where(a => a.Name.Contains(name))
                .OrderBy(a => a.Name)
                .Take(4)
                .ToListAsync();
        }

        public async Task<Actor> AddAsync(Actor actor)
        {
            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();
            return actor;
        }

        public async Task<Actor> UpdateAsync(Actor actor)
        {
            _context.Actors.Update(actor);
            await _context.SaveChangesAsync();
            return actor;
        }

        public async Task DeleteAsync(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor != null)
            {
                _context.Actors.Remove(actor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
