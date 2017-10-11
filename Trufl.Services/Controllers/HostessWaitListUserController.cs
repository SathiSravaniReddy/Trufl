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
    [RoutePrefix("api/WaitListUser")]
    public class HostessWaitListUserController : ApiController
    {

        AdminBL _adminBL = new AdminBL();
        HostessBL _hostessBL = new HostessBL();
        JsonResponseResult JsonResponseResult = new JsonResponseResult();



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

        [Route("AcceptedandRemovedWaitedUser/{BookingID}/{BookinStatus}")]
        [HttpPost]
        public object AcceptedWaitedUser(int BookingID, int BookinStatus)
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
        #endregion

        [Route("GetRestaurantOpenSections/{RestaurantID}")]
        [HttpGet]
        public object GetRestaurantOpenSections(int RestaurantID)
        {
            DataTable res = new DataTable();
            res = _hostessBL.GetRestaurantOpenSections(RestaurantID);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("UpdateRestaurantActiveSections")]
        [HttpPost]
        public object UpdateRestaurantActiveSections([FromBody]List<RestaurantActiveSectionsDTO> restaurantActiveSections)
        {
            bool res = _hostessBL.UpdateRestaurantActiveSections(restaurantActiveSections);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("SaveRestaurantOpenSectionStaff")]
        [HttpPost]
        public object SaveRestaurantOpenSectionStaff([FromBody]List<RestaurantSectionStaffDTO> restaurantSectionStaff)
        {
            bool res = _hostessBL.SaveRestaurantOpenSectionStaff(restaurantSectionStaff);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetRestaurantWaitTimeOpenSectionStaff/{RestaurantID}")]
        [HttpGet]
        public object GetRestaurantWaitTimeOpenSectionStaff(int RestaurantID)
        {
            DataSet res = new DataSet();
            res = _hostessBL.GetRestaurantWaitTimeOpenSectionStaff(RestaurantID);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("SaveRestaurantOpenTime/{RestaurantID}/{Time}")]
        [HttpPost]
        public object SaveRestaurantOpenTime(int RestaurantID, string Time)
        {
            bool res = _hostessBL.SaveRestaurantOpenTime(RestaurantID, Time);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetRestaurantHostessOpenSectionDetails/{RestaurantID}/{UserType}")]
        [HttpGet]
        public object GetRestaurantHostessOpenSectionDetails(int RestaurantID, string UserType)
        {
            DataTable res = new DataTable();
            res = _hostessBL.GetRestaurantHostessOpenSectionDetails(RestaurantID, UserType);
            try
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        //[Route("SaveRestaurantOpenSectionStaff")]
        //[HttpPost]
        //public object SaveRestaurantOpenSectionStaff(RestaurantSectionStaffDTO RestaurantSectionStaff)
        //{
        //    bool res = _hostessBL.SaveRestaurantOpenSectionStaff(RestaurantSectionStaff);
        //    try
        //    {
        //        return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
        //    }
        //}

    }
}