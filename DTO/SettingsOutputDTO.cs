using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SettingsOutputDTO
    {
        public DataTable UserLoginInformation { get; set; }
        public DataTable UsersInformation { get; set; }
        public DataTable RestaurantUserDetailswithHistory { get; set; }
        public DataTable BookingHistory   { get; set; }
    }
}
