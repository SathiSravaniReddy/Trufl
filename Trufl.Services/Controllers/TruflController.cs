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
        
        [Route("UpdateBooking")]
        [HttpPost]
        public object UpdateBooking(UpdateBookingTableNumberDTO updateBookingTableNumber)
        {
            bool res = _hostessBL.UpdateBooking(updateBookingTableNumber);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("UpdateRestaurantHostStatus")]
        [HttpPost]
        public object UpdateRestaurantHostStatus(UpdateRestaurantHostStatusDTO UpdateRestaurantHost)
        {
            bool res = _hostessBL.UpdateRestaurantHostStatus(UpdateRestaurantHost);
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
        public object SaveWaitedlistBooking(BookingTableDTO bookingTableInput)
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


        [Route("GetRestaurantTableAmount/{RestaurantID}/{TableNumber}")]
        [HttpGet]
        public object GetRestaurantTableAmount(int RestaurantID, int TableNumber)
        {
            DataTable res = new DataTable();
            try
            {
                res = _hostessBL.GetRestaurantTableAmount(RestaurantID, TableNumber);
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageFailed });
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
        public object SaveSeatBooking(List<RestaurantSeatedUsersDTO> restaurantSeatedUsersInputDTO)
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



        #region Settings
        [Route("SaveUserBioEvents")]
        [HttpPost]
        public object SaveUserBioEvents(SaveUserBioEventsDTO saveUserBioEvents)
        {
            bool res = _hostessBL.SaveUserBioEvents(saveUserBioEvents);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetEmployeConfiguration/{TruflUserType}/{RestaurantID}")]
        [HttpGet]
        public object spGetEmployeConfigration(string TruflUserType, int RestaurantID)
        {
            DataTable res = new DataTable();
            res = _hostessBL.GetEmployeConfiguration(TruflUserType, RestaurantID);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetBioCategories")]
        [HttpGet]
        public object GetBioCategories()
        {
            DataTable res = new DataTable();
            res = _hostessBL.GetBioCategories();
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetBioEvents/{BioID}")]
        [HttpGet]
        public object GetBioEvents(int BioID)
        {
            DataTable res = new DataTable();
            res = _hostessBL.GetBioEvents(BioID);
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

        [Route("GetRestaurantUserDetails/{RestaurantID}/{TruflUserID}/{UserType}")]
        [HttpGet]
        public object GetRestaurantUserDetails(int RestaurantID, int TruflUserID, string UserType)
        {
            SettingsDTO res = new SettingsDTO();
            res = _adminBL.GetRestaurantUserDetails(RestaurantID, TruflUserID, UserType);
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
    }
}
