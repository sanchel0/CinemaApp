using Application.DTOs.Actor;
using Application.DTOs.Director;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorsController : ControllerBase
    {
        private readonly ActorService _service;

        public ActorsController(ActorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActorDto>>> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorDto>> GetById(int id)
        {
            var actor = await _service.GetByIdAsync(id);
            return actor == null ? NotFound() : Ok(actor);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ActorDto>>> GetByName([FromQuery] string name)
        {
            var actors = await _service.GetByNameAsync(name);
            return Ok(actors);
        }

        [HttpPost]
        public async Task<ActionResult<ActorDto>> Create([FromBody] CreateActorDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActorDto dto)
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
