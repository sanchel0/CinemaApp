using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class FoodOrderItemConfiguration : IEntityTypeConfiguration<FoodOrderItem>
    {
        public void Configure(EntityTypeBuilder<FoodOrderItem> builder)
        {
            builder.HasKey(foi => new { foi.FoodOrderId, foi.ProductId });

            builder.Property(foi => foi.Quantity).IsRequired();
            builder.Property(foi => foi.UnitPrice)
                   .IsRequired()
                   .HasPrecision(18, 2);

            builder.HasOne(foi => foi.FoodOrder)
                   .WithMany(fo => fo.Items)
                   .HasForeignKey(foi => foi.FoodOrderId);

            builder.HasOne(foi => foi.Product)
                   .WithMany()
                   .HasForeignKey(foi => foi.ProductId);
        }
    }
}
