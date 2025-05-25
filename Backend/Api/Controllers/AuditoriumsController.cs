using Application.DTOs.Auditorium;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuditoriumsController : ControllerBase
    {
        private readonly AuditoriumService _auditoriumService;

        public AuditoriumsController(AuditoriumService auditoriumService)
        {
            _auditoriumService = auditoriumService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var auditoriums = await _auditoriumService.GetAllAsync();
            return Ok(auditoriums);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var auditorium = await _auditoriumService.GetByIdAsync(id);
            if (auditorium == null) return NotFound();
            return Ok(auditorium);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAuditoriumDto dto)
        {
            var created = await _auditoriumService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AuditoriumDto dto)
        {
            if (id != dto.Id) return BadRequest("ID mismatch");

            await _auditoriumService.UpdateAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _auditoriumService.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}
