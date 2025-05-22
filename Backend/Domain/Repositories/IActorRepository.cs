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
        Task<List<Actor>> GetByIdsAsync(List<int> ids);
        Task<IEnumerable<Actor>> GetByNameAsync(string name);
        Task<Actor> AddAsync(Actor actor);
        Task<Actor> UpdateAsync(Actor actor);
        Task DeleteAsync(int id);
    }
}
