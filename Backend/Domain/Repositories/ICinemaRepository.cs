using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface ICinemaRepository
    {
        Task<IEnumerable<Cinema>> GetAllAsync();
        Task<Cinema?> GetByIdAsync(int id);
        Task<Cinema> AddAsync(Cinema cinema);
        Task<Cinema> UpdateAsync(Cinema cinema);
        Task<bool> DeleteAsync(int id);
    }
}
