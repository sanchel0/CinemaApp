using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IShowtimeRepository
    {
        Task<IEnumerable<Showtime>> GetAllAsync();
        Task<Showtime?> GetByIdAsync(int id);
        Task<Showtime> AddAsync(Showtime showtime);
        Task<Showtime> UpdateAsync(Showtime showtime);
        Task<bool> DeleteAsync(int id);
    }
}
