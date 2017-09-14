using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BookingTableDTO
    {
        public int BookingID { get; set; }
        public int TruflUserID { get; set; }
        public int RestaurantID { get; set; }
        public int PartySize { get; set; }
        public int OfferType { get; set; }
        public int OfferAmount { get; set; }
        public int BookingStatus { get; set; }
        public int Points { get; set; }
        public int TruflUserCardDataID { get; set; }
        public int TruflTCID { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime Quoted { get; set; }
        public string PaymentStatus { get; set; }
        public string TableNumbers { get; set; }
        public int LoggedInUser { get; set; }
    }
}
