using Application.DTOs.Genre;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly GenreService _service;

        public GenresController(GenreService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDto>> GetById(int id)
        {
            var genre = await _service.GetByIdAsync(id);
            return genre == null ? NotFound() : Ok(genre);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetByName([FromQuery] string name)
        {
            var genres = await _service.GetByNameAsync(name);
            return Ok(genres);
        }

        [HttpPost]
        public async Task<ActionResult<GenreDto>> Create([FromBody] CreateGenreDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GenreDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var updated = await _service.UpdateAsync(dto);
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
