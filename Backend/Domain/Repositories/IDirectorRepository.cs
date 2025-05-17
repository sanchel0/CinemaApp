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
        Task<Director> AddAsync(Director director);
        Task<Director> UpdateAsync(Director director);
        Task DeleteAsync(int id);
    }
}
