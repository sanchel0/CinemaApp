using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class FoodOrderItem
    {
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public int FoodOrderId { get; set; }
        public FoodOrder FoodOrder { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }
}
