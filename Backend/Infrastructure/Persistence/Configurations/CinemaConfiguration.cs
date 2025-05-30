using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class CinemaConfiguration : IEntityTypeConfiguration<Cinema>
    {
        public void Configure(EntityTypeBuilder<Cinema> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(c => c.Name)
               .IsRequired()
               .HasMaxLength(200);

            builder.Property(c => c.Location)
               .IsRequired()
               .HasMaxLength(100);

            builder.Property(c => c.Address)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(c => c.PostalCode)
              .IsRequired()
              .HasMaxLength(20);

            builder.Property(c => c.OpeningTime)
                   .IsRequired();

            builder.Property(c => c.ClosingTime)
                   .IsRequired();

            builder.Property(c => c.IsActive)
                   .IsRequired();

            builder.HasOne(c => c.City)
                .WithMany(city => city.Cinemas)
                .HasForeignKey(c => c.CityId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(c => c.Auditoriums)
                   .WithOne(a => a.Cinema)
                   .HasForeignKey(a => a.CinemaId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
