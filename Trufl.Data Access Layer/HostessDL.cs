using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using DTO;
using Trufl.Logging;

namespace Trufl.Data_Access_Layer
{
   public class HostessDL
    {
        #region Db Connection 
        SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["TraflConnection"]);
        string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
        #endregion

        #region Trufl_Hostess
        #region WaitList
        /// <summary>
        /// This method 'RetrieveUser ' returns User details
        /// </summary>
        /// <returns>User List</returns>
        public List<UserProfile> RetrieveUser()
        {
            List<UserProfile> sourceapilist = new List<UserProfile>();
            try
            {

                con.Open();
                using (SqlCommand command1 = new SqlCommand("spGetTruflUser", con))
                {
                    command1.CommandTimeout = TruflConstants.DBResponseTime;

                    SqlDataAdapter da = new SqlDataAdapter();
                    // command1.Parameters.AddWithValue("@SourceAPIName", "clever");
                    // command1.Parameters.AddWithValue("@IsWinService", false);

                    da.SelectCommand = command1;
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        UserProfile userprofile = new UserProfile();
                        userprofile.RestaurantID = ds.Tables[0].Rows[i]["RestaurantID"].ToString();
                        userprofile.UserName = ds.Tables[0].Rows[i]["UserName"].ToString();
                        userprofile.PartySize = ds.Tables[0].Rows[i]["PartySize"].ToString();
                        userprofile.Quoted = ds.Tables[0].Rows[i]["Quoted"].ToString();
                        userprofile.Waited = ds.Tables[0].Rows[i]["Waited"].ToString();
                        userprofile.OfferAmount = ds.Tables[0].Rows[i]["OfferAmount"].ToString();
                        userprofile.Email = ds.Tables[0].Rows[i]["Email"].ToString();
                        userprofile.pic = ds.Tables[0].Rows[i]["pic"].ToString();
                        userprofile.Contact1 = ds.Tables[0].Rows[i]["Contact1"].ToString();
                        userprofile.Password = ds.Tables[0].Rows[i]["Password"].ToString();
                        userprofile.DOB = ds.Tables[0].Rows[i]["DOB"].ToString();
                        userprofile.ActiveInd = ds.Tables[0].Rows[i]["ActiveInd"].ToString();
                        userprofile.ResauranEmpInd = Convert.ToInt32(ds.Tables[0].Rows[i]["RestaurantEmpInd"].ToString());
                        userprofile.TruffMemberType = Convert.ToInt32(ds.Tables[0].Rows[i]["TruflMemberType"].ToString());
                        userprofile.TruflRelationship = Convert.ToInt32(ds.Tables[0].Rows[i]["TruflRelationship"].ToString());
                        userprofile.TruflshareCode = ds.Tables[0].Rows[i]["TruflshareCode"].ToString();
                        userprofile.ReferTruflUserID = Convert.ToInt32(ds.Tables[0].Rows[i]["ReferTruflUserID"].ToString());
                        userprofile.ModifiedDate = ds.Tables[0].Rows[i]["ModifiedDate"].ToString();
                        userprofile.ModifiedBy = Convert.ToInt32(ds.Tables[0].Rows[i]["ModifiedBy"].ToString());
                        

                        sourceapilist.Add(userprofile);
                    }
                }

            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            finally
            {
                con.Close();
            }
            return sourceapilist;
        }

        public DataTable GetWaitListUsers()
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spGetTruflUser", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                       
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
                // }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'AcceptedWaitedUser' will update the waited user info
        /// </summary>
        /// <param name="AcceptedWaitedUser"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public DataTable AcceptedWaitedUser(int BookingID,int BookinStatus)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spUpdateBookingStatus", con))
                    {
                         cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@BookingID", BookingID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@BookingStatus", BookinStatus);
                        tvparam1.SqlDbType = SqlDbType.Int;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'GetRestaurantTables' will Get Restaurant Tables info
        /// </summary>
        /// <param name="spGetRestaurantTables"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public DataTable GetRestaurantTables(int RestaurantID, int UserID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantTables", con))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@UserID", UserID);
                        tvparam1.SqlDbType = SqlDbType.Int;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'SaveWaitedlistBooking' will save all the waited list users
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveWaitedlistBooking(BookingTableInputDTO bookingTableInput)
        {
            try
            {
                var dtClient = new DataTable();

                dtClient.Columns.Add("BookingID", typeof(Int32));
                dtClient.Columns.Add("TruflUserID", typeof(Int32));
                dtClient.Columns.Add("RestaurantID", typeof(Int32));
                dtClient.Columns.Add("PartySize", typeof(Int32));
                dtClient.Columns.Add("OfferType", typeof(Int32));
                dtClient.Columns.Add("OfferAmount", typeof(Int32));
                dtClient.Columns.Add("BookingStatus", typeof(Int32));
                dtClient.Columns.Add("Points", typeof(Int32));
                dtClient.Columns.Add("TruflUserCardDataID", typeof(Int32));
                dtClient.Columns.Add("TruflTCID", typeof(Int32));
                dtClient.Columns.Add("ModifiedDate", typeof(DateTime));
                dtClient.Columns.Add("ModifiedBy", typeof(Int32));
                dtClient.Columns.Add("Quoted", typeof(DateTime));
                dtClient.Columns.Add("PaymentStatus", typeof(string));
                dtClient.Columns.Add("TableNumbers", typeof(string));
                
                
                dtClient.Rows.Add(bookingTableInput.BookingID,
                                   bookingTableInput.TruflUserID,
                                   bookingTableInput.RestaurantID,
                                   bookingTableInput.PartySize,
                                   bookingTableInput.OfferType,
                                   bookingTableInput.OfferAmount,
                                   bookingTableInput.BookingStatus,
                                   bookingTableInput.Points,
                                   bookingTableInput.TruflUserCardDataID,
                                   bookingTableInput.TruflTCID,
                                   bookingTableInput.ModifiedDate,
                                   bookingTableInput.ModifiedBy,
                                   bookingTableInput.Quoted,
                                   bookingTableInput.PaymentStatus,
                                   bookingTableInput.TableNumbers                                   
                                   );

                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveBooking", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@BookingTY", dtClient);
                        tvpParam.SqlDbType = SqlDbType.Structured;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@LoggedInUser", bookingTableInput.LoggedInUser);
                        tvparam1.SqlDbType = SqlDbType.Int;

                        SqlParameter pvNewId = new SqlParameter();
                        pvNewId.ParameterName = "@RetVal";
                        pvNewId.DbType = DbType.Int32;
                        pvNewId.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvNewId);

                        int status = cmd.ExecuteNonQuery();
                        if (status == 0)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
                return false;
            }
        }

        /// <summary>
        /// This method 'GetRestaurantTableAmount' will Get Restaurant Tables amount info
        /// </summary>
        /// <param name="spGetRestaurantTables"></param>
        /// <returns>Returns amount</returns>
        public DataTable GetRestaurantTableAmount(int RestaurantID, int TableNumber)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantTableAmount", con))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@TableNumber", TableNumber);
                        tvparam1.SqlDbType = SqlDbType.Int;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }
        
        #endregion

        #region Seated User
        /// <summary>
        /// This method 'RetrieveUser ' returns User details
        /// </summary>
        /// <returns>User List</returns>
        public DataTable GetRestaurantSeatedUsers(int RestaurantID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantUserAmenities", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam5 = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
                // }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'SaveSeatBooking' will save Seat data
        /// </summary>
        /// <param name="passParkingLots"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveSeatBooking(List<RestaurantSeatedUsersInputDTO> restaurantSeatedUsersInputDTO)
        {
            try
            {
                var dtClient = new DataTable();

                dtClient.Columns.Add("RestaurantID", typeof(Int32));
                dtClient.Columns.Add("TruflUserID", typeof(Int32));
                dtClient.Columns.Add("AmenitiName", typeof(string));
                dtClient.Columns.Add("AmenitiChecked", typeof(bool));

                for (int i = 0; restaurantSeatedUsersInputDTO.Count > i; i++)
                {
                    dtClient.Rows.Add(restaurantSeatedUsersInputDTO[i].RestaurantID,
                                   restaurantSeatedUsersInputDTO[i].TruflUserID,
                                   restaurantSeatedUsersInputDTO[i].AmenitiName,
                                   restaurantSeatedUsersInputDTO[i].AmenitiChecked
                                   );

                }

                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveRestaurantUserAmenities", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantUserAmenitiesTY", dtClient);
                        tvpParam.SqlDbType = SqlDbType.Structured;


                        SqlParameter pvNewId = new SqlParameter();
                        pvNewId.ParameterName = "@RetVal";
                        pvNewId.DbType = DbType.Int32;
                        pvNewId.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvNewId);

                        int status = cmd.ExecuteNonQuery();

                        if (status == -1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string s = ex.ToString();
                ExceptionLogger.WriteToErrorLogFile(ex);
                return false;
            }
        }
        #endregion

        #region LoginUser
        /// <summary>
        /// This method 'GetUserTypes ' returns User type details
        /// </summary>
        /// <returns>user type list</returns>
        public DataTable GetUserTypes(string UserType)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spGetUserTypes", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam5 = cmd.Parameters.AddWithValue("@TruflUserType", UserType);
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
                // }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'Save Register User' will save Register user data
        /// </summary>
        /// <param name="SaveSignUpUserInfo"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveSignUpUserInfo(TruflUserInputDTO registerUserInfo)
        {
            try
            {
                var dtClient = new DataTable();

                dtClient.Columns.Add("TruflUserID", typeof(Int32));
                dtClient.Columns.Add("RestaurantID", typeof(Int32));
                dtClient.Columns.Add("FullName", typeof(string));
                dtClient.Columns.Add("Email", typeof(string));
                dtClient.Columns.Add("pic", typeof(Byte[]));
                dtClient.Columns.Add("PhoneNumber", typeof(string));
                dtClient.Columns.Add("Password", typeof(string));
                //dtClient.Columns.Add("Salt", typeof(string));
                dtClient.Columns.Add("DOB", typeof(DateTime));
                dtClient.Columns.Add("ActiveInd", typeof(char));
                dtClient.Columns.Add("RestaurantEmpInd", typeof(Int32));
                dtClient.Columns.Add("TruflMemberType", typeof(string));
                dtClient.Columns.Add("TruflRelationship", typeof(Int32));
                dtClient.Columns.Add("TruflshareCode", typeof(string));
                dtClient.Columns.Add("ReferTruflUserID", typeof(Int32));
                dtClient.Columns.Add("ModifiedDate", typeof(DateTime));
                dtClient.Columns.Add("ModifiedBy", typeof(Int32));
                dtClient.Columns.Add("Waited", typeof(TimeSpan));

                //dtClient.Columns.Add("LoggedInUserType", typeof(string));
                
               
                
                

                dtClient.Rows.Add(
                                  DBNull.Value,
                                  DBNull.Value,
                                  registerUserInfo.FullName,
                                  registerUserInfo.Email,
                                  DBNull.Value,
                                  registerUserInfo.PhoneNumber,
                                  registerUserInfo.Password,
                                  //DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value,
                                  DBNull.Value
                                  );

                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveTruflUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@TruflUserTY", dtClient);
                        tvpParam.SqlDbType = SqlDbType.Structured;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@LoggedInUserType", registerUserInfo.LoggedInUserType);

                        SqlParameter pvNewId = new SqlParameter();
                        pvNewId.ParameterName = "@RetVal";
                        pvNewId.DbType = DbType.Int32;
                        pvNewId.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvNewId);

                        int status = cmd.ExecuteNonQuery();
                        if (status == 0)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                ExceptionLogger.WriteToErrorLogFile(ex);
                return false;
            }
        }

        /// <summary>
        /// This method 'LoginAuthentication' will check the login authentication
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public DataTable LoginAuthentication(LoginInputDTO loginInput)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spLoginAuthentication", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@EMAIL_ID", loginInput.emailid);
                        tvpParam.SqlDbType = SqlDbType.Text;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@PASSWORD", loginInput.password);
                        tvparam1.SqlDbType = SqlDbType.Text;
                        SqlParameter tvparam2 = cmd.Parameters.AddWithValue("@UserType", loginInput.usertype);
                        tvparam2.SqlDbType = SqlDbType.Text;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'GetForgetPassword' will ForgetPassword 
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns ForgetPassword Details </returns>
        public DataTable ForgetPassword(string LoginEmail)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetForgetPassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@LoginEmail", LoginEmail);
                        tvpParam.SqlDbType = SqlDbType.Text;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'SaveRestPassword' will RestPassword 
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns RestPassword  </returns>
        public DataTable SaveRestPassword(string LoginEmail)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SaveRestPassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@LoginEmail", LoginEmail);
                        tvpParam.SqlDbType = SqlDbType.Text;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'spGetTruflUserDetails' will TruflUserDetails 
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns Get Trufl User Details  </returns>
        public DataTable GetTruflUserDetails(int TruflUserID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetTruflUserDetails", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@TruflUserID", TruflUserID);
                        tvpParam.SqlDbType = SqlDbType.Int;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }

        /// <summary>
        /// This method 'spGetRestaurantDetails' will RestaurantDetails 
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns Get Restaurant Details  </returns>
        public DataTable GetRestaurantDetails(int RestaurantID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantDetails", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(sendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return sendResponse;
        }
        #endregion

        /// <summary>
        /// This method 'Save User Bio Events' will save User Bio Events data
        /// </summary>
        /// <param name="SaveSignUpUserInfo"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveUserBioEvents(SaveUserBioEventsInputDTO saveUserBioEvents)
        {
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveUserBioEvents", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", saveUserBioEvents.RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@TruflUserID", saveUserBioEvents.TruflUserID);
                        tvparam1.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam2 = cmd.Parameters.AddWithValue("@BioID", saveUserBioEvents.BioID);
                        tvparam2.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam3 = cmd.Parameters.AddWithValue("@BioEventID", saveUserBioEvents.BioEventID);
                        tvparam3.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam4 = cmd.Parameters.AddWithValue("@BioDesc", saveUserBioEvents.BioDesc);
                        tvparam4.SqlDbType = SqlDbType.Text;
                        

                        SqlParameter pvNewId = new SqlParameter();
                        pvNewId.ParameterName = "@RetVal";
                        pvNewId.DbType = DbType.Int32;
                        pvNewId.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvNewId);

                        int status = cmd.ExecuteNonQuery();
                        if (status == 0)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                ExceptionLogger.WriteToErrorLogFile(ex);
                return false;
            }
        }





        /// <summary>
        /// This method 'Update Booking' will Update Booking data.
        /// </summary>
        /// <param name="SaveSignUpUserInfo"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool UpdateBooking(UpdateBookingTableNumberInputDTO updateBookingTableNumber)
        {
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spUpdateBooking", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@BookingID", updateBookingTableNumber.BookingID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@UserID", updateBookingTableNumber.UserID);
                        tvparam1.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam2 = cmd.Parameters.AddWithValue("@RestaurantID", updateBookingTableNumber.RestaurantID);
                        tvparam2.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam3 = cmd.Parameters.AddWithValue("@BStatus", updateBookingTableNumber.BStatus);
                        tvparam3.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam4 = cmd.Parameters.AddWithValue("@TableNumbers", updateBookingTableNumber.TableNumbers);
                        tvparam4.SqlDbType = SqlDbType.Text;


                        SqlParameter pvNewId = new SqlParameter();
                        pvNewId.ParameterName = "@RetVal";
                        pvNewId.DbType = DbType.Int32;
                        pvNewId.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvNewId);

                        int status = cmd.ExecuteNonQuery();
                        if (status == 0)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                ExceptionLogger.WriteToErrorLogFile(ex);
                return false;
            }
        }



        /// <summary>
        /// This method 'Update Restaurant Host Status' will Update Restaurant Host Status data.
        /// </summary>
        /// <param name="UpdateRestaurantHostStatus"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool UpdateRestaurantHostStatus(UpdateRestaurantHostStatusInputDTO UpdateRestaurantHost)
        {
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spUpdateRestaurantHostStatus", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@TruflUserType", UpdateRestaurantHost.TruflUserType);
                        tvpParam.SqlDbType = SqlDbType.Text;
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@RestaurantID", UpdateRestaurantHost.RestaurantID);
                        tvparam1.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam2 = cmd.Parameters.AddWithValue("@UserID", UpdateRestaurantHost.UserID);
                        tvparam2.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam3 = cmd.Parameters.AddWithValue("@ActiveStatus", UpdateRestaurantHost.ActiveStatus);
                        tvparam3.SqlDbType = SqlDbType.Bit;
                       

                        SqlParameter pvNewId = new SqlParameter();
                        pvNewId.ParameterName = "@RetVal";
                        pvNewId.DbType = DbType.Int32;
                        pvNewId.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvNewId);

                        int status = cmd.ExecuteNonQuery();
                        if (status == 0)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                ExceptionLogger.WriteToErrorLogFile(ex);
                return false;
            }
        }


        #endregion

    }
}
