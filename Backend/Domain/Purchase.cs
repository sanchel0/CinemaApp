using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string CustomerName { get; set; } = null!;
        public decimal Total { get; set; }

        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
        public FoodOrder? FoodOrder { get; set; }

        public void CalculateTotal()
        {
            // Calcular el total basado en todos los FoodOrderItems
            //Total = FoodOrder.Sum(order => order.Total);
        }
    }
}
