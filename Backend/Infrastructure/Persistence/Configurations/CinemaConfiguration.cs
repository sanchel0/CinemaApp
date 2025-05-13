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
            builder.Property(c => c.Name).IsRequired();
            builder.Property(c => c.Address).IsRequired();

            builder.HasMany(c => c.Auditoriums)
                   .WithOne(a => a.Cinema)
                   .HasForeignKey(a => a.CinemaId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
