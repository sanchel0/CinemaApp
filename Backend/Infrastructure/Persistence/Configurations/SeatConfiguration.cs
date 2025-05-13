using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class SeatConfiguration : IEntityTypeConfiguration<Seat>
    {
        public void Configure(EntityTypeBuilder<Seat> builder)
        {
            builder.ToTable("Seats");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Row)
                   .IsRequired()
                   .HasMaxLength(5);

            builder.Property(s => s.Number)
                   .IsRequired();

            builder.HasOne(s => s.Auditorium)
                   .WithMany(a => a.Seats)
                   .HasForeignKey(s => s.AuditoriumId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
