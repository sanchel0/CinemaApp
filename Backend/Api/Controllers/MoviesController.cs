using Application.DTOs.Movie;
using Application.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _movieService;

        public MoviesController(MovieService movieService)
        {
            _movieService = movieService;
        }

        // GET: api/movies
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var movies = await _movieService.GetAllAsync();
            return Ok(movies);
        }

        // GET: api/movies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _movieService.GetByIdAsync(id);
            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        // POST: api/movies
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieDto movie)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _movieService.CreateAsync(movie);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error al crear la película", details = ex.Message });
            }
        }

        // PUT: api/movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateMovieDto movie)
        {
            if (id != movie.Id)
                return BadRequest("El ID de la URL no coincide con el de la película.");

            try
            {
                await _movieService.UpdateAsync(movie);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Error al actualizar la película", details = ex.Message });
            }
        }

        // DELETE: api/movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _movieService.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _movieService.DeleteAsync(id);
            return NoContent();
        }
    }
}
