using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configurations
{
    internal class FoodOrderConfiguration : IEntityTypeConfiguration<FoodOrder>
    {
        public void Configure(EntityTypeBuilder<FoodOrder> builder)
        {
            builder.HasKey(fo => fo.Id);
            builder.Property(fo => fo.CreatedAt).IsRequired();

            builder.HasOne(fo => fo.Purchase)
                   .WithOne(p => p.FoodOrder)
                   .HasForeignKey<FoodOrder>(fo => fo.PurchaseId)
                   .IsRequired(false)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
