using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IGenreRepository
    {
        Task<IEnumerable<Genre>> GetAllAsync();
        Task<Genre?> GetByIdAsync(int id);
        Task<List<Genre>> GetByIdsAsync(List<int> ids);
        Task<IEnumerable<Genre>> GetByNameAsync(string name);
        Task<Genre> AddAsync(Genre genre);
        Task<Genre> UpdateAsync(Genre genre);
        Task DeleteAsync(int id);
    }
}
