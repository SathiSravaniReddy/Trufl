using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trufl.Data_Access_Layer;
using DTO;

namespace Trufl.Business_Layer
{
    public class HostessBL
    {

        HostessDL _hostessDL = new HostessDL();
        public List<UserProfile> RetrieveUser()
        {
            return _hostessDL.RetrieveUser();
        }

        public bool SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            return _hostessDL.SaveTruflUserInfromation(truflUserInputDTO);
        }
      
        public DataTable GetRestaurantSeatedUsers(int RestaurantID)
        {
            return _hostessDL.GetRestaurantSeatedUsers(RestaurantID);
        }

        public bool SaveSeatBooking(List<RestaurantSeatedUsersInputDTO> restaurantSeatedUsersInputDTO)
        {
            return _hostessDL.SaveSeatBooking(restaurantSeatedUsersInputDTO);
        }
    }
}
