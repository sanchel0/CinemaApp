using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class TicketConfiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Price)
                   .IsRequired()
                   .HasPrecision(18, 2);

            builder.HasOne(t => t.Seat)
                   .WithMany()
                   .HasForeignKey(t => t.SeatId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(t => t.Purchase)
                   .WithMany(p => p.Tickets)
                   .HasForeignKey(t => t.PurchaseId)
                   .IsRequired(false)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(t => t.Showtime)
                   .WithMany(s => s.Tickets)
                   .HasForeignKey(t => t.ShowtimeId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
