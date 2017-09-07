using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;

using Trufl.Business_Layer;
using System.Data;
using System.Web.Http.Results;
using System.Text;
//using System.Web.Mvc;

using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace Trufl.Services.Controllers
{
    [RoutePrefix("api/Trufl")]
    public class TruflController : ApiController
    {
        AdminBL _adminBL = new AdminBL();
        HostessBL _hostessBL = new HostessBL();
        JsonResponseResult JsonResponseResult = new JsonResponseResult();



        #region Trufl_Hostess
        #region WaitList
        [Route("GetWaitListUsers")]
        [HttpGet]
        public object GetTruflUserList()
        {
            DataTable res = new DataTable();
            try
            {
                res = _hostessBL.GetWaitListUsers();
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }


        [Route("SaveWaitListUserInfromation")]
        [HttpPost]
        public object SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            bool res = _hostessBL.SaveTruflUserInfromation(truflUserInputDTO);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }


        [Route("AcceptedandRemovedWaitedUser/{BookingID}/{BookinStatus}")]
        [HttpPost]
        public object AcceptedWaitedUser(int BookingID,int BookinStatus)
        {
            DataTable res = new DataTable(); 
            try
            {
                res = _hostessBL.AcceptedWaitedUser(BookingID, BookinStatus);
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetRestaurantTables/{RestaurantID}/{UserID}")]
        [HttpGet]
        public object GetRestaurantTables(int RestaurantID, int UserID)
        {
            DataTable res = new DataTable();
            try
            {
                res = _hostessBL.GetRestaurantTables(RestaurantID, UserID);
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("SaveWaitedlistBooking")]
        [HttpPost]
        public object SaveWaitedlistBooking(BookingTableInputDTO bookingTableInput)
        {
            bool res = _hostessBL.SaveWaitedlistBooking(bookingTableInput);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        #endregion

        #region Seated User
        [Route("GetSeatedUsersList/{RestaurantID}")]
        [HttpGet]
        public object GetRestaurantSeatedUsers(int RestaurantID)
        {
            DataTable res = new DataTable();
            try
            {
                res = _hostessBL.GetRestaurantSeatedUsers(RestaurantID);
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("SaveSeatBookingUsersList")]
        [HttpPost]
        public object SaveSeatBooking(List<RestaurantSeatedUsersInputDTO> restaurantSeatedUsersInputDTO)
        {
            bool res = _hostessBL.SaveSeatBooking(restaurantSeatedUsersInputDTO);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }
        #endregion

        #region LoginUser
        [Route("GetUserTypes/{UserType}")]
        [HttpGet]
        public object GetUserTypes(string UserType)
        {
            DataTable res = new DataTable();
            try
            {
                res = _hostessBL.GetUserTypes(UserType);
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
            
        }
        
        [Route("SaveSignUpUserInfo")]
        [HttpPost]
        public object SaveSignUpUserInfo(List<TruflUserInputDTO> registerUserInfo)
        {
            bool res = _hostessBL.SaveSignUpUserInfo(registerUserInfo);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
             
        }

        #endregion
 #endregion

        #region Trufl_Admin

        #endregion
    }
}
