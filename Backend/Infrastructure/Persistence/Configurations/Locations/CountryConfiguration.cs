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
    internal class CountryConfiguration : IEntityTypeConfiguration<Country>
    {
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.ToTable("Countries");
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.IsoCode)
                .HasMaxLength(3);

            builder.Property(c => c.Email)
               .HasMaxLength(150)
               .IsUnicode(false)
               .IsRequired(false);

            builder.Property(c => c.PhoneNumber)
                   .HasMaxLength(20)
                   .IsUnicode(false)
                   .IsRequired(false);

            builder.HasMany(c => c.States)
                   .WithOne(s => s.Country)
                   .HasForeignKey(s => s.CountryId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
