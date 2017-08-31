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


        [Route("GetTruflUserList")]
        [HttpGet]
        public object GetTruflUserList()
        {
            List<UserProfile> res =new List<UserProfile>();
            try
            {               
                res = _hostessBL.RetrieveUser();
                return Json(new JsonResponseResult{ _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res,_StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }
 
        [Route("SaveTruflUserInfromation")]
        [HttpPost]
        public object SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            bool res= _hostessBL.SaveTruflUserInfromation(truflUserInputDTO);
            try
            {
               return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeSuccess, _Data = res, _StatusCode = TruflConstants._StatusCodeOK, _StatusMessage = TruflConstants._StatusMessageSuccess });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = TruflConstants._ErrorCodeFailed, _Data = ex.ToString(), _StatusCode = TruflConstants._StatusCodeFailed, _StatusMessage = TruflConstants._StatusMessageFailed });
            }
        }

        [Route("GetRestaurantSeatedUsers")]
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
        [Route("SaveSeatBooking")]
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


    }
}
