﻿using System;
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

        public bool SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            return _hostessDL.SaveTruflUserInfromation(truflUserInputDTO);
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
        public DataTable GetUserTypes(string UserType)
        {
            return _hostessDL.GetUserTypes(UserType);
        }

        public bool SaveSignUpUserInfo(List<TruflUserInputDTO> registerUserInfo)
        {
            return _hostessDL.SaveSignUpUserInfo(registerUserInfo);
        }
        #endregion

        #region Trufl_Admin

            #endregion

#endregion
        }
}
