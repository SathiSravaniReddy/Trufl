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
    public class AdminBL
    {
        AdminDL _adminDL = new AdminDL();
        #region Trufl_Admin
        public DashBoardDetailsOutputDTO GetDashBoardDetails(DashBoardInputDTO dashboardInput)
        {
            return _adminDL.GetDashBoardDetails(dashboardInput);
        }

        public DataTable GetNotifications()
        {
            return _adminDL.GetNotifications();
        }

        public bool SaveNotifications(NotificationsInputDTO notifications)
        {
            return _adminDL.SaveNotifications(notifications);
        }

        public bool SaveRestaurant(SaveRestaurantInputDTO restaurant)
        {
            return _adminDL.SaveRestaurant(restaurant);
        }

        public SettingsOutputDTO GetRestaurantUserDetails(int RestaurantID, int TruflUserID, string UserType)
        {
            return _adminDL.GetRestaurantUserDetails(RestaurantID,TruflUserID,UserType);
        }

            #endregion
        }
}