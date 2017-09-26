﻿using System;
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
    }
}
