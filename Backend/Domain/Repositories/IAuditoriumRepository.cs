using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAuditoriumRepository
    {
        Task<IEnumerable<Auditorium>> GetAllAsync();
        Task<Auditorium?> GetByIdAsync(int id);
        Task<Auditorium> AddAsync(Auditorium auditorium);
        Task<Auditorium> UpdateAsync(Auditorium auditorium);
        Task<bool> DeleteAsync(int id);
    }
}
