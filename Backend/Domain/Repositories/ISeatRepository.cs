using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface ISeatRepository
    {
        Task<IEnumerable<Seat>> GetByAuditoriumIdAsync(int auditoriumId);
        Task<Seat> AddAsync(Seat seat);
        Task UpdateAsync(Seat seat);
        Task<bool> DeleteAsync(int id);
        Task<bool> DeleteByAuditoriumIdAsync(int auditoriumId);

    }
}
