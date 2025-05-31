using Domain.Locations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface ILocationRepository
    {
        #region Countries
        Task<IEnumerable<Country>> GetAllCountriesAsync();
        Task<Country?> GetCountryByIdAsync(int id);
        Task<Country> AddCountryAsync(Country country);
        Task<Country> UpdateCountryAsync(Country country);
        Task DeleteCountryAsync(int id);
        #endregion

        #region States
        Task<IEnumerable<State>> GetAllStatesAsync();
        Task<IEnumerable<State>> GetStatesByCountryIdAsync(int countryId);
        Task<State?> GetStateByIdAsync(int id);
        Task<State> AddStateAsync(State state);
        Task<State> UpdateStateAsync(State state);
        Task DeleteStateAsync(int id);
        #endregion

        #region Cities
        Task<IEnumerable<City>> GetAllCitiesAsync();
        Task<City?> GetCityByIdAsync(int id);
        Task<City> AddCityAsync(City city);
        Task<City> UpdateCityAsync(City city);
        Task DeleteCityAsync(int id);
        #endregion
    }
}
