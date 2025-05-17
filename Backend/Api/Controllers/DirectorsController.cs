using Application.DTOs.Director;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorsController : ControllerBase
    {
        private readonly DirectorService _service;

        public DirectorsController(DirectorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectorDto>>> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DirectorDto>> GetById(int id)
        {
            var director = await _service.GetByIdAsync(id);
            return director == null ? NotFound() : Ok(director);
        }

        [HttpPost]
        public async Task<ActionResult<DirectorDto>> Create([FromBody] CreateDirectorDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DirectorDto dto)
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
