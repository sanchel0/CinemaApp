using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FoodOrder
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int? PurchaseId { get; set; }  // Opcional, puede ser null si no hay compra de comida
        public Purchase? Purchase { get; set; }

        public ICollection<FoodOrderItem> Items { get; set; } = new List<FoodOrderItem>();
    }
}
