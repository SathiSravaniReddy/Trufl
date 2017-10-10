using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public  class UserBioEventsDTO
    {
        public int UserBioEventID { get; set; }
        public int RestaurantID { get; set; }
        public int TruflUserID { get; set; }
        public int BioID { get; set; }
        public string Description { get; set; }
    }
}
