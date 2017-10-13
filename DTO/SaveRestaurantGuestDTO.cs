using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SaveRestaurantGuestDTO
    {
        public int RestaurantID { get; set; }
        public int? TruflUserID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        //public string Picture { get; set; }
        public string ContactNumber { get; set; }
        public string UserType { get; set; }
        public int BookingStatus { get; set; }
        public DateTime? WaitListTime { get; set; }
        public DateTime? SeatedTime { get; set; }
        public List<UserBioEventsDTO> UserBioEventsTY { get; set; }

    }
}
