using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IDirectorRepository
    {
        Task<IEnumerable<Director>> GetAllAsync();
        Task<Director?> GetByIdAsync(int id);
        Task<List<Director>> GetByIdsAsync(List<int> ids);
        Task<IEnumerable<Director>> GetByNameAsync(string name);
        Task<Director> AddAsync(Director director);
        Task<Director> UpdateAsync(Director director);
        Task DeleteAsync(int id);
    }
}
