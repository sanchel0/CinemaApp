using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class ShowtimeConfiguration : IEntityTypeConfiguration<Showtime>
    {
        public void Configure(EntityTypeBuilder<Showtime> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.StartTime).IsRequired();

            builder.HasOne(s => s.Movie)
                   .WithMany()
                   .HasForeignKey(s => s.MovieId);

            builder.HasMany(s => s.Tickets)
                   .WithOne(t => t.Showtime)
                   .HasForeignKey(t => t.ShowtimeId);
        }
    }
}
