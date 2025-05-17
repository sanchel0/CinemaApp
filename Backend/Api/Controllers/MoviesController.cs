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
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }

        // GET: api/movies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        // POST: api/movies
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _movieService.CreateMovieAsync(movie);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Movie movie)
        {
            if (id != movie.Id)
                return BadRequest("El ID de la URL no coincide con el de la película.");

            var updated = await _movieService.UpdateMovieAsync(movie);
            return Ok(updated);
        }

        // DELETE: api/movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _movieService.GetMovieByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _movieService.DeleteMovieAsync(id);
            return NoContent();
        }
    }
}
