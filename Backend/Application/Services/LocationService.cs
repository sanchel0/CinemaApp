using Application.DTOs.Location;
using Application.DTOs.Seat;
using Domain.Locations;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class LocationService
    {
        private readonly ILocationRepository _repository;

        public LocationService(ILocationRepository repository)
        {
            _repository = repository;
        }

        #region Countries
        public async Task<IEnumerable<CountryDto>> GetAllCountriesAsync()
        {
            var countries = await _repository.GetAllCountriesAsync();
            return countries.Select(c => new CountryDto { Id = c.Id, Name = c.Name, IsoCode = c.IsoCode, Email = c.Email, PhoneNumber = c.PhoneNumber });
        }

        public async Task<CountryDto?> GetCountryByIdAsync(int id)
        {
            var c = await _repository.GetCountryByIdAsync(id);
            return c == null ? null : new CountryDto { Id = c.Id, Name = c.Name, IsoCode = c.IsoCode, Email = c.Email, PhoneNumber = c.PhoneNumber };
        }

        public async Task<CountryDto> CreateCountryAsync(CountryDto dto)
        {
            var country = new Country { Name = dto.Name, IsoCode = dto.IsoCode, Email = dto.Email, PhoneNumber = dto.PhoneNumber };
            var result = await _repository.AddCountryAsync(country);
            return new CountryDto { Id = result.Id, Name = result.Name, IsoCode = result.IsoCode, Email = result.Email, PhoneNumber = result.PhoneNumber };
        }

        public async Task<CountryDto?> UpdateCountryAsync(CountryDto dto)
        {
            var existing = await _repository.GetCountryByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            existing.IsoCode = dto.IsoCode;
            existing.Email = dto.Email;
            existing.PhoneNumber = dto.PhoneNumber;
            var result = await _repository.UpdateCountryAsync(existing);
            return new CountryDto { Id = result.Id, Name = result.Name, IsoCode = result.IsoCode, Email = result.Email, PhoneNumber = result.PhoneNumber };
        }

        public async Task<bool> DeleteCountryAsync(int id)
        {
            var existing = await _repository.GetCountryByIdAsync(id);
            if (existing == null) return false;

            await _repository.DeleteCountryAsync(id);
            return true;
        }
        #endregion

        #region States
        public async Task<IEnumerable<StateDto>> GetAllStatesAsync()
        {
            var states = await _repository.GetAllStatesAsync();
            return states.Select(s => new StateDto { Id = s.Id, Name = s.Name, CountryId = s.CountryId });
        }

        public async Task<IEnumerable<StateDto>> GetStatesByCountryIdAsync(int countryId)
        {
            var states = await _repository.GetStatesByCountryIdAsync(countryId);
            return states.Select(s => new StateDto
            {
                Id = s.Id,
                Name = s.Name,
                CountryId = s.CountryId
            });
        }

        public async Task<StateDto?> GetStateByIdAsync(int id)
        {
            var state = await _repository.GetStateByIdAsync(id);
            return state == null ? null : new StateDto { Id = state.Id, Name = state.Name, CountryId = state.CountryId };
        }

        public async Task<StateDto> CreateStateAsync(StateDto dto)
        {
            var state = new State { Name = dto.Name, CountryId = dto.CountryId };
            var result = await _repository.AddStateAsync(state);
            return new StateDto { Id = result.Id, Name = result.Name, CountryId = result.CountryId };
        }

        public async Task<StateDto?> UpdateStateAsync(StateDto dto)
        {
            var existing = await _repository.GetStateByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            existing.CountryId = dto.CountryId;
            var result = await _repository.UpdateStateAsync(existing);
            return new StateDto { Id = result.Id, Name = result.Name, CountryId = result.CountryId };
        }

        public async Task<bool> DeleteStateAsync(int id)
        {
            var existing = await _repository.GetStateByIdAsync(id);
            if (existing == null) return false;

            await _repository.DeleteStateAsync(id);
            return true;
        }
        #endregion

        #region Cities
        public async Task<IEnumerable<CityDto>> GetAllCitiesAsync()
        {
            var cities = await _repository.GetAllCitiesAsync();
            return cities.Select(c => new CityDto { Id = c.Id, Name = c.Name, StateId = c.StateId });
        }

        public async Task<CityDto?> GetCityByIdAsync(int id)
        {
            var city = await _repository.GetCityByIdAsync(id);
            return city == null ? null : new CityDto { Id = city.Id, Name = city.Name, StateId = city.StateId };
        }

        public async Task<CityDto> CreateCityAsync(CityDto dto)
        {
            var city = new City { Name = dto.Name, StateId = dto.StateId };
            var result = await _repository.AddCityAsync(city);
            return new CityDto { Id = result.Id, Name = result.Name, StateId = result.StateId };
        }

        public async Task<CityDto?> UpdateCityAsync(CityDto dto)
        {
            var existing = await _repository.GetCityByIdAsync(dto.Id);
            if (existing == null) return null;

            existing.Name = dto.Name;
            existing.StateId = dto.StateId;
            var result = await _repository.UpdateCityAsync(existing);
            return new CityDto { Id = result.Id, Name = result.Name, StateId = result.StateId };
        }

        public async Task<bool> DeleteCityAsync(int id)
        {
            var existing = await _repository.GetCityByIdAsync(id);
            if (existing == null) return false;

            await _repository.DeleteCityAsync(id);
            return true;
        }
        #endregion
    }

}
