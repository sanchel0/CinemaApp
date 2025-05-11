using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder.ToTable("Movies");
            builder.HasKey(m => m.Id);
            builder.Property(m => m.Title).IsRequired().HasMaxLength(200);
            builder.Property(m => m.Description).IsRequired();
            builder.Property(m => m.Duration).IsRequired();
            builder.Property(m => m.ReleaseDate).IsRequired();
            builder.Property(m => m.Classification).IsRequired().HasMaxLength(10);
            builder.Property(m => m.PosterUrl).IsRequired();

            builder.HasMany(m => m.Actors).WithMany();
            builder.HasMany(m => m.Directors).WithMany();
            builder.HasMany(m => m.Genres).WithMany();
        }
    }
}
