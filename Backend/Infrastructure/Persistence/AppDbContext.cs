using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

        // DbSets opcionales, pero útiles para facilitar pruebas y consultas
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<FoodOrderItem> FoodOrderItems { get; set; }
        public DbSet<FoodOrder> FoodOrders { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Auditorium> Auditoriums { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Showtime> Showtimes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Purchase> Purchases { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
