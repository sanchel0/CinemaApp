using Application.DTOs.Location;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly LocationService _service;

        public LocationController(LocationService service)
        {
            _service = service;
        }

        #region Countries
        [HttpGet("countries")]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
            return Ok(await _service.GetAllCountriesAsync());
        }

        [HttpGet("countries/{id}")]
        public async Task<ActionResult<CountryDto>> GetCountry(int id)
        {
            var country = await _service.GetCountryByIdAsync(id);
            return country == null ? NotFound() : Ok(country);
        }

        [HttpPost("countries")]
        public async Task<ActionResult<CountryDto>> CreateCountry([FromBody] CountryDto dto)
        {
            var created = await _service.CreateCountryAsync(dto);
            return CreatedAtAction(nameof(GetCountry), new { id = created.Id }, created);
        }

        [HttpPut("countries/{id}")]
        public async Task<IActionResult> UpdateCountry(int id, [FromBody] CountryDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var updated = await _service.UpdateCountryAsync(dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("countries/{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var success = await _service.DeleteCountryAsync(id);
            return success ? NoContent() : NotFound();
        }
        #endregion

        #region States
        [HttpGet("states")]
        public async Task<ActionResult<IEnumerable<StateDto>>> GetStates()
        {
            return Ok(await _service.GetAllStatesAsync());
        }

        [HttpGet("countries/{countryId}/states")]
        public async Task<ActionResult<IEnumerable<StateDto>>> GetStatesByCountryId(int countryId)
        {
            var states = await _service.GetStatesByCountryIdAsync(countryId);
            return Ok(states);
        }

        [HttpGet("states/{id}")]
        public async Task<ActionResult<StateDto>> GetState(int id)
        {
            var state = await _service.GetStateByIdAsync(id);
            return state == null ? NotFound() : Ok(state);
        }

        [HttpPost("states")]
        public async Task<ActionResult<StateDto>> CreateState([FromBody] StateDto dto)
        {
            var created = await _service.CreateStateAsync(dto);
            return CreatedAtAction(nameof(GetState), new { id = created.Id }, created);
        }

        [HttpPut("states/{id}")]
        public async Task<IActionResult> UpdateState(int id, [FromBody] StateDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var updated = await _service.UpdateStateAsync(dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("states/{id}")]
        public async Task<IActionResult> DeleteState(int id)
        {
            var success = await _service.DeleteStateAsync(id);
            return success ? NoContent() : NotFound();
        }
        #endregion

        #region Cities
        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCities()
        {
            return Ok(await _service.GetAllCitiesAsync());
        }

        [HttpGet("states/{stateId}/cities")]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCitiesByStateId(int stateId)
        {
            var cities = await _service.GetCitiesByStateIdAsync(stateId);
            return Ok(cities);
        }

        [HttpGet("cities/{id}")]
        public async Task<ActionResult<CityDto>> GetCity(int id)
        {
            var city = await _service.GetCityByIdAsync(id);
            return city == null ? NotFound() : Ok(city);
        }

        [HttpPost("cities")]
        public async Task<ActionResult<CityDto>> CreateCity([FromBody] CityDto dto)
        {
            var created = await _service.CreateCityAsync(dto);
            return CreatedAtAction(nameof(GetCity), new { id = created.Id }, created);
        }

        [HttpPut("cities/{id}")]
        public async Task<IActionResult> UpdateCity(int id, [FromBody] CityDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var updated = await _service.UpdateCityAsync(dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("cities/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var success = await _service.DeleteCityAsync(id);
            return success ? NoContent() : NotFound();
        }
        #endregion
    }

}
