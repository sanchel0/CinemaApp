using Application.DTOs.Showtime;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShowtimesController : ControllerBase
    {
        private readonly ShowtimeService _service;

        public ShowtimesController(ShowtimeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var showtimes = await _service.GetAllAsync();
            return Ok(showtimes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var showtime = await _service.GetByIdAsync(id);
            if (showtime == null) return NotFound();
            return Ok(showtime);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateShowtimeDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ShowtimeDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID in URL does not match ID in body"); 
            
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
