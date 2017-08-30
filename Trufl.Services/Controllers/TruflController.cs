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

namespace Trufl.Services.Controllers
{
    [RoutePrefix("api/Trufl")]
    public class TruflController : ApiController
    {
        AdminBL _adminBL = new AdminBL();
        AdminDL _adminDL = new AdminDL();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetTruflUserList")]
        [HttpGet]
        public List<UserProfile> GetTruflUserList()
        {
            return _adminBL.RetrieveUser();
        }

        [Route("SaveTruflUserInfromation")]
        [HttpPost]
        public bool SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            return _adminBL.SaveTruflUserInfromation(truflUserInputDTO);
        }

       
        
    }
}
