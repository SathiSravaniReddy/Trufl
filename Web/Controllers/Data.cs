using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace vs17demo2.Controllers
{
    [Route("api/[controller]")] // api/bank
    public class Data : Controller
    {
        [HttpGet("[action]")]
       public IActionResult GetAllCources()
        {
            List<course> courseList = new List<course>();
             
            course csr = new course();

            csr.startDate = "Jan-1-2017";
            csr.endDate = "Jan-10-2017";
            csr.courseTitle = "Angular JS";
            courseList.Add(csr);

            course csr1 = new course();

            csr.startDate = "Feb-1-2017";
            csr.endDate = "Feb-10-2017";
            csr.courseTitle = "Angular JS2";
            courseList.Add(csr);

            course csr2 = new course();

            csr.startDate = "Mar-1-2017";
            csr.endDate = "Mar-10-2017";
            csr.courseTitle = "Entiry Frame work";
            courseList.Add(csr);

            course csr3 = new course();

            csr.startDate = "Apr-1-2017";
            csr.endDate = "Apr-10-2017";
            csr.courseTitle = "SQL Server";
            courseList.Add(csr);

            course csr4 = new course();

            csr.startDate = "May-1-2017";
            csr.endDate = "May-10-2017";
            csr.courseTitle = "Azure DB";
            courseList.Add(csr);

            course csr5 = new course();

            csr.startDate = "Jun-1-2017";
            csr.endDate = "Jun-10-2017";
            csr.courseTitle = "Java Script";
            courseList.Add(csr);

            course csr6 = new course();

            csr.startDate = "July-1-2017";
            csr.endDate = "July-10-2017";
            csr.courseTitle = "Node.JS";
            courseList.Add(csr);
            return Json(new { courseList = courseList });
        }

        public IActionResult CreateCourse(course course)
        {
            return Json(new {  });
        }
    }
    public class course
    {
        public string courseTitle { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }

    }
}
