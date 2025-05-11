using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class AuditoriumConfiguration : IEntityTypeConfiguration<Auditorium>
    {
        public void Configure(EntityTypeBuilder<Auditorium> builder)
        {
            builder.ToTable("Auditoriums");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(a => a.Capacity)
                   .IsRequired();

            builder.HasOne(a => a.Cinema)
                   .WithMany(c => c.Auditoriums)
                   .HasForeignKey(a => a.CinemaId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(a => a.Showtimes)
                   .WithOne(st => st.Auditorium)
                   .HasForeignKey(st => st.AuditoriumId);
        }
    }
}
