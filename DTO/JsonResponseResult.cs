using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class JsonResponseResult
    {
        public string _ErrorCode { get; set; }
        public object _Data { get; set; }
        public string _StatusCode { get; set; }
        public string _StatusMessage { get; set; }
    }
}
