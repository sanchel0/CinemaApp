using Domain.Locations;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly AppDbContext _context;

        public LocationRepository(AppDbContext context)
        {
            _context = context;
        }

        #region Countries
        public async Task<IEnumerable<Country>> GetAllCountriesAsync()
        {
            return await _context.Countries.ToListAsync();
        }

        public async Task<Country?> GetCountryByIdAsync(int id)
        {
            return await _context.Countries.FindAsync(id);
        }

        public async Task<Country> AddCountryAsync(Country country)
        {
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();
            return country;
        }

        public async Task<Country> UpdateCountryAsync(Country country)
        {
            _context.Countries.Update(country);
            await _context.SaveChangesAsync();
            return country;
        }

        public async Task DeleteCountryAsync(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country != null)
            {
                _context.Countries.Remove(country);
                await _context.SaveChangesAsync();
            }
        }
        #endregion

        #region States
        public async Task<IEnumerable<State>> GetAllStatesAsync()
        {
            return await _context.States.ToListAsync();
        }

        public async Task<IEnumerable<State>> GetStatesByCountryIdAsync(int countryId)
        {
            return await _context.States
                .Where(s => s.CountryId == countryId)
                .ToListAsync();
        }

        public async Task<State?> GetStateByIdAsync(int id)
        {
            return await _context.States.FindAsync(id);
        }

        public async Task<State> AddStateAsync(State state)
        {
            _context.States.Add(state);
            await _context.SaveChangesAsync();
            return state;
        }

        public async Task<State> UpdateStateAsync(State state)
        {
            _context.States.Update(state);
            await _context.SaveChangesAsync();
            return state;
        }

        public async Task DeleteStateAsync(int id)
        {
            var state = await _context.States.FindAsync(id);
            if (state != null)
            {
                _context.States.Remove(state);
                await _context.SaveChangesAsync();
            }
        }
        #endregion

        #region Cities
        public async Task<IEnumerable<City>> GetAllCitiesAsync()
        {
            return await _context.Cities.ToListAsync();
        }

        public async Task<IEnumerable<City>> GetCitiesByStateIdAsync(int stateId)
        {
            return await _context.Cities
                .Where(c => c.StateId == stateId)
                .ToListAsync();
        }


        public async Task<City?> GetCityByIdAsync(int id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task<City> AddCityAsync(City city)
        {
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();
            return city;
        }

        public async Task<City> UpdateCityAsync(City city)
        {
            _context.Cities.Update(city);
            await _context.SaveChangesAsync();
            return city;
        }

        public async Task DeleteCityAsync(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city != null)
            {
                _context.Cities.Remove(city);
                await _context.SaveChangesAsync();
            }
        }
        #endregion
    }

}
