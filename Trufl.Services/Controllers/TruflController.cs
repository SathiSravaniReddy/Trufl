using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using Trufl.Data_Access_Layer;
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
        AdminDL _adminDL = new AdminDL();
        JsonResponseResult JsonResponseResult = new JsonResponseResult();
         
        
       
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        //[Route("GetTruflUserList")]
        //[HttpGet]
        //public List<UserProfile> GetTruflUserList()
        //{
        //    return _adminBL.RetrieveUser();
        //}
        //[Route("GetTruflUserList")]
        //[HttpGet]
        //public  JsonResult GetTruflUserList()
        //{
        //    //return _adminBL.RetrieveUser();
        //    return Json(_adminBL.RetrieveUser(), JsonRequestBehavior.AllowGet);
        //}

        [Route("GetTruflUserList")]
        [HttpGet]
        public object GetTruflUserList()
        {
            List<UserProfile> res =new List<UserProfile>();
            try
            {               
                res = _adminBL.RetrieveUser();
                return Json(new JsonResponseResult{ _ErrorCode = "0",_Data = res,_StatusCode = "200",_StatusMessage = "Success" });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = "1", _Data = ex.ToString(), _StatusCode = "404", _StatusMessage = "Faild" });
            }
        }
 
        [Route("SaveTruflUserInfromation")]
        [HttpPost]
        public object SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            bool res= _adminBL.SaveTruflUserInfromation(truflUserInputDTO);
            try
            {
               return Json(new JsonResponseResult { _ErrorCode = "0", _Data = res, _StatusCode = "200", _StatusMessage = "Success" });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponseResult { _ErrorCode = "1", _Data = ex.ToString(), _StatusCode = "404", _StatusMessage = "Faild" });
            }
        }

       
        
    }
}
