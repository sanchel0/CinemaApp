using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IActorRepository
    {
        Task<IEnumerable<Actor>> GetAllAsync();
        Task<Actor?> GetByIdAsync(int id);
        Task<Actor> AddAsync(Actor actor);
        Task<Actor> UpdateAsync(Actor actor);
        Task DeleteAsync(int id);
    }
}
