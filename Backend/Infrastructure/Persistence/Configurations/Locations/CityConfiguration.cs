using Domain.Locations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations.Locations
{
    internal class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.ToTable("Cities");
            builder.HasKey(ci => ci.Id);

            builder.Property(ci => ci.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(ci => ci.TimeZone)
               .IsRequired()
               .HasMaxLength(10);

            builder.HasOne(ci => ci.State)
                   .WithMany(s => s.Cities)
                   .HasForeignKey(ci => ci.StateId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
