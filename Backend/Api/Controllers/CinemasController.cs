using Application.DTOs.Cinema;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CinemasController : ControllerBase
    {
        private readonly CinemaService _service;

        public CinemasController(CinemaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CinemaSummaryDto>>> GetAll()
        {
            var cinemas = await _service.GetAllAsync();
            return Ok(cinemas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CinemaDto>> GetById(int id)
        {
            var cinema = await _service.GetByIdAsync(id);
            return cinema == null ? NotFound() : Ok(cinema);
        }

        [HttpPost]
        public async Task<ActionResult<CinemaDto>> Create([FromBody] CreateCinemaDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CinemaDto dto)
        {
            if (id != dto.Id) return BadRequest("ID mismatch"); 
            
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}
