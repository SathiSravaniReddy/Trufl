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
        public List<UserProfile> RetrieveUser()
        {
           return _adminDL.RetrieveUser();
        }

        public bool SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            return _adminDL.SaveTruflUserInfromation(truflUserInputDTO);
        }
    }
}