using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SaveUserBioEventsDTO
    {
        public int RestaurantID { get; set; }
        public int TruflUserID { get; set; }
        public int BioID { get; set; }
        public int BioEventID {get;set;}
        public string BioDesc { get; set; }

    }
}
