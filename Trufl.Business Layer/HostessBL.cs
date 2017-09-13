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
        #region Trufl_Hostess
        
        #region WaitList
        public List<UserProfile> RetrieveUser()
        {
            return _hostessDL.RetrieveUser();
        }

        public DataTable GetWaitListUsers()
        {
            return _hostessDL.GetWaitListUsers();
        }

        public DataTable AcceptedWaitedUser(int BookingID, int BookinStatus)
        {
            return _hostessDL.AcceptedWaitedUser(BookingID, BookinStatus);
        }

        public DataTable GetRestaurantTables(int RestaurantID, int UserID)
        {
            return _hostessDL.GetRestaurantTables(RestaurantID, UserID);
        }

        public bool SaveWaitedlistBooking(BookingTableInputDTO bookingTableInput)
        {
            return _hostessDL.SaveWaitedlistBooking(bookingTableInput);
        }

        public DataTable GetRestaurantTableAmount(int RestaurantID, int TableNumber)
        {
            return _hostessDL.GetRestaurantTableAmount(RestaurantID, TableNumber);
        }

        public bool UpdateBooking(UpdateBookingTableNumberInputDTO updateBookingTableNumber)
        {
            return _hostessDL.UpdateBooking(updateBookingTableNumber);
        }

        public bool UpdateRestaurantHostStatus(UpdateRestaurantHostStatusInputDTO UpdateRestaurantHost)
        {
            return _hostessDL.UpdateRestaurantHostStatus(UpdateRestaurantHost);
        }
            #endregion

            #region Seated User
            public DataTable GetRestaurantSeatedUsers(int RestaurantID)
        {
            return _hostessDL.GetRestaurantSeatedUsers(RestaurantID);
        }

         public bool SaveSeatBooking(List<RestaurantSeatedUsersInputDTO> restaurantSeatedUsersInputDTO)
        {
            return _hostessDL.SaveSeatBooking(restaurantSeatedUsersInputDTO);
        }
        #endregion

        #region LoginUser
        public DataTable GetUserTypes(string UserType,int RestaurantID)
        {
            return _hostessDL.GetUserTypes(UserType,RestaurantID);
        }

        public bool SaveSignUpUserInfo(TruflUserInputDTO registerUserInfo)
        {
            return _hostessDL.SaveSignUpUserInfo(registerUserInfo);
        }

        public DataTable LoginAuthentication(LoginInputDTO loginInput)
        {
            return _hostessDL.LoginAuthentication(loginInput);
        }

        public DataTable ForgetPassword(string LoginEmail)
        {
            return _hostessDL.ForgetPassword(LoginEmail);
        }

        public DataTable SaveRestPassword(RestPasswordInputDTO restPasswordInput)
        {
            return _hostessDL.SaveRestPassword(restPasswordInput);
        }

        public DataTable GetTruflUserDetails(int TruflUserID)
        {
            return _hostessDL.GetTruflUserDetails(TruflUserID);
        }
        public DataTable GetRestaurantDetails(int RestaurantID)
        {
            return _hostessDL.GetRestaurantDetails(RestaurantID);
        }
        #endregion
        public bool SaveUserBioEvents(SaveUserBioEventsInputDTO saveUserBioEvents)
        {
            return _hostessDL.SaveUserBioEvents(saveUserBioEvents);
        }

        public DataTable GetBioCategories()
        {
            return _hostessDL.GetBioCategories();
        }

        public DataTable GetBioEvents(int BioID)
        {
            return _hostessDL.GetBioEvents(BioID);
        }

        public DataTable GetEmployeConfiguration(string TruflUserType, int RestaurantID)
        {
            return _hostessDL.GetEmployeConfiguration(TruflUserType, RestaurantID);
        }
            #endregion
        }
}
