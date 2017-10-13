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
using TruflEmailService;

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

        public DataTable GetWaitListUsers(int RestaurantID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spGetWaitListUsers", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;

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
        public DataTable AcceptedWaitedUser(int BookingID, int BookinStatus)
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
        public bool SaveWaitedlistBooking(BookingTableDTO bookingTableInput)
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
                dtClient.Columns.Add("Quoted", typeof(Int32));
                dtClient.Columns.Add("PaymentStatus", typeof(string));
                dtClient.Columns.Add("TableNumbers", typeof(string));
                dtClient.Columns.Add("WaitListTime", typeof(DateTime));
                dtClient.Columns.Add("SeatedTime", typeof(DateTime));


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
                                   bookingTableInput.TableNumbers,
                                   bookingTableInput.WaitListTime,
                                   bookingTableInput.SeatedTime
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
        public bool SaveSeatBooking(List<RestaurantSeatedUsersDTO> restaurantSeatedUsersInputDTO)
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
        public DataTable GetUserTypes(string UserType, int RestaurantID)
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
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@TruflUserType", UserType);
                        tvpParam1.SqlDbType = SqlDbType.Char;
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
        public bool SaveSignUpUserInfo(TruflUserDTO registerUserInfo)
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
        public DataTable LoginAuthentication(LoginDTO loginInput)
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
            MailUtility email = new MailUtility();
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
                            ResetPasswordEmailDTO data = new ResetPasswordEmailDTO();
                            data.To = sendResponse.Rows[0]["To"].ToString();
                            data.Subject = sendResponse.Rows[0]["Subject"].ToString();
                            data.Body = sendResponse.Rows[0]["Body"].ToString();
                            data.BodyFormat = sendResponse.Rows[0]["BodyFormat"].ToString();
                            email.sendMail(data);

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
        public DataTable SaveRestPassword(RestPasswordDTO restPasswordInput)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SavePassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@UserID", restPasswordInput.UserID);
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@UserName", restPasswordInput.UserName);
                        SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@UserEmail", restPasswordInput.UserEmail);
                        tvpParam2.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam3 = cmd.Parameters.AddWithValue("@LoginPassword", restPasswordInput.LoginPassword);
                        tvpParam3.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam4 = cmd.Parameters.AddWithValue("@NewLoginPassword", restPasswordInput.NewLoginPassword);
                        tvpParam4.SqlDbType = SqlDbType.Text;


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
        public bool SaveUserBioEvents(SaveUserBioEventsDTO saveUserBioEvents)
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
        public bool UpdateBooking(UpdateBookingTableNumberDTO updateBookingTableNumber)
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
        public bool UpdateRestaurantHostStatus(UpdateRestaurantHostStatusDTO UpdateRestaurantHost)
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



        /// <summary>
        /// This method 'GetBioCategories' will Get BioCategories  list
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns Get Bio Categories Details  </returns>
        public DataTable GetBioCategories()
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetBioCategories", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

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
        /// This method 'GetBioEvents' will Get Bio Events  details
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns Get Bio Events Details  </returns>
        public DataTable GetBioEvents(int BioID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetBioEvents", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@BioID", BioID);
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
        /// This method 'spGetEmployeConfigration' will Get Employe Configration details
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns Get EmployeConfigration Details  </returns>
        public DataTable GetEmployeConfiguration(string TruflUserType, int RestaurantID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetEmployeConfigration", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@TruflUserType", TruflUserType);
                        tvpParam.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam1.SqlDbType = SqlDbType.Int;

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
        /// This method 'spGetEmployeConfigration' will Get Employe Configration details
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns Get EmployeConfigration Details  </returns>
        public bool spUpdateRestaurantEmployee(EmployeeConfigDTO employeeConfigDTO)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spUpdateRestaurantEmployee", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@TruflUserID", employeeConfigDTO.TruflUserID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@UserName", employeeConfigDTO.UserName);
                        tvpParam1.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@Email", employeeConfigDTO.Email);
                        tvpParam2.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam3 = cmd.Parameters.AddWithValue("@PhoneNumber", employeeConfigDTO.PhoneNumber);
                        tvpParam3.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam4 = cmd.Parameters.AddWithValue("@UserType", employeeConfigDTO.UserType);
                        tvpParam4.SqlDbType = SqlDbType.Text;

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
            // return sendResponse;
        }


        #endregion

        /// This method GetRestaurantOpenSections ' returns RestaurantOpenSections details
        /// </summary>
        /// <param name="RestaurantID"> takes Restaurant ID as input</param>
        /// <returns></returns>
        public DataTable GetRestaurantOpenSections(int RestaurantID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    sqlcon.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantOpenSections", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;

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
        /// This method UpdateRestaurantActiveSections updates RestaurantOpenSection isActive and isDeleted fields 
        /// and sets the isActive fields of open floors to true and closed to false
        /// </summary>
        /// <param name="restaurantActiveSections">RestaurantActiveSectionsDTO restaurantActiveSections</param>
        /// <returns></returns>
        public bool UpdateRestaurantActiveSections(List<RestaurantActiveSectionsDTO> restaurantActiveSections)
        {
            try
            {
                var dtrestActiveSect = new DataTable();
                dtrestActiveSect.Columns.Add("RestaurantID", typeof(Int32));
                dtrestActiveSect.Columns.Add("FloorNumber", typeof(Int32));
                dtrestActiveSect.Columns.Add("IsActive", typeof(Boolean));
                dtrestActiveSect.Columns.Add("IsDelete", typeof(Boolean));

                for (int i = 0; restaurantActiveSections.Count > i; i++)
                {
                    dtrestActiveSect.Rows.Add(restaurantActiveSections[i].RestaurantID,
                                       restaurantActiveSections[i].FloorNumber,
                                       restaurantActiveSections[i].IsActive,
                                       restaurantActiveSections[i].IsDelete);
                }
               

                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    sqlcon.Open();
                    using (SqlCommand cmd = new SqlCommand("spUpdateRestaurantActiveSections", sqlcon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantActiveSectionsTY", dtrestActiveSect);
                        tvpParam.SqlDbType = SqlDbType.Structured;

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
        /// This method UpdateRestaurantActiveSections updates RestaurantOpenSection isActive and isDeleted fields 
        /// and sets the isActive fields of open floors to true and closed to false
        /// </summary>
        /// <param name="restaurantActiveSections">RestaurantActiveSectionsDTO restaurantActiveSections</param>
        /// <returns></returns>

        public bool SaveRestaurantOpenSectionStaff(List<RestaurantSectionStaffDTO> restaurantSectionStaff)
        {
            try
            {
                var dtrestSectStaff = new DataTable();
                dtrestSectStaff.Columns.Add("RestaurantID", typeof(Int32));
                dtrestSectStaff.Columns.Add("TruflUserID", typeof(Int32));
                dtrestSectStaff.Columns.Add("RestaurantFloorNumber", typeof(Int32));


                for (int i = 0; restaurantSectionStaff.Count > i; i++)
                {
                    dtrestSectStaff.Rows.Add(restaurantSectionStaff[i].RestaurantID,
                                       restaurantSectionStaff[i].TruflUserID,
                                       restaurantSectionStaff[i].RestaurantFloorNumber);
                }
               

                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    sqlcon.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveRestaurantOpenSectionStaff", sqlcon))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantSectionStaffTY", dtrestSectStaff);
                        tvpParam.SqlDbType = SqlDbType.Structured;

                        SqlParameter pvRetVal = new SqlParameter();
                        pvRetVal.ParameterName = "@RetVal";
                        pvRetVal.DbType = DbType.Int32;
                        pvRetVal.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvRetVal);

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

        public DataSet GetRestaurantWaitTimeOpenSectionStaff(int RestaurantID)
        {
            DataSet dssendResponse = new DataSet();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    sqlcon.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantWaitTimeOpenSectionStaff", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;

                        SqlParameter pvRetVal = new SqlParameter();
                        pvRetVal.ParameterName = "@RetVal";
                        pvRetVal.DbType = DbType.Int32;
                        pvRetVal.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvRetVal);

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dssendResponse);
                        }
                        dssendResponse.Tables[0].TableName = "RestaurantWaitListOpen";
                        dssendResponse.Tables[1].TableName = "RestaurantOpenSectionStaff";
                        dssendResponse.Tables[2].TableName = "RestaurantOpenSection";
                    }
                }
                // }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return dssendResponse;
        }

        public bool SaveRestaurantOpenTime(int RestaurantID, string Time)
        {
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveRestaurantOpenTime", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@OpenTime", Time);
                        tvpParam1.SqlDbType = SqlDbType.Text;

                        SqlParameter pvRetVal = new SqlParameter();
                        pvRetVal.ParameterName = "@RetVal";
                        pvRetVal.DbType = DbType.Int32;
                        pvRetVal.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvRetVal);

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

        public DataTable GetRestaurantHostessOpenSectionDetails(int RestaurantID, string UserType)
        {
            DataTable dtsendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantHostesOpenSectionDetails", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@UserType", UserType);
                        tvpParam1.SqlDbType = SqlDbType.Text;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dtsendResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return dtsendResponse;
        }

       
        public bool SaveRestaurantGuest(SaveRestaurantGuestDTO SaveRestaurantGuest)
        {
            try
            {
                var dtUserBioEvents = new DataTable();
                dtUserBioEvents.Columns.Add("UserBioEventID", typeof(Int32));
                dtUserBioEvents.Columns.Add("RestaurantID", typeof(Int32));
                dtUserBioEvents.Columns.Add("TruflUserID", typeof(Int32));
                dtUserBioEvents.Columns.Add("BioID", typeof(Int32));
                dtUserBioEvents.Columns.Add("Description", typeof(string));

                for (int i = 0; SaveRestaurantGuest.UserBioEventsTY.Count > i; i++)
                {
                    dtUserBioEvents.Rows.Add(SaveRestaurantGuest.UserBioEventsTY[i].UserBioEventID,
                                      SaveRestaurantGuest.UserBioEventsTY[i].RestaurantID,
                                      SaveRestaurantGuest.UserBioEventsTY[i].TruflUserID,
                                      SaveRestaurantGuest.UserBioEventsTY[i].BioID,
                                      SaveRestaurantGuest.UserBioEventsTY[i].Description);

                }

                //if (SaveRestaurantGuest.TruflUserID == 0)
                //    SaveRestaurantGuest.TruflUserID = null;

                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveRestaurantGuest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", SaveRestaurantGuest.RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@TruflUserID", SaveRestaurantGuest.TruflUserID);
                        tvpParam1.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@FullName", SaveRestaurantGuest.FullName);
                        tvpParam2.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam3 = cmd.Parameters.AddWithValue("@Email", SaveRestaurantGuest.Email);
                        tvpParam3.SqlDbType = SqlDbType.Text;
                         SqlParameter tvpParam4 = cmd.Parameters.AddWithValue("@ContactNumber", SaveRestaurantGuest.ContactNumber);
                        tvpParam4.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam5 = cmd.Parameters.AddWithValue("@UserType", SaveRestaurantGuest.UserType);
                        tvpParam5.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam6 = cmd.Parameters.AddWithValue("@BookingStatus", SaveRestaurantGuest.BookingStatus);
                        tvpParam6.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam7 = cmd.Parameters.AddWithValue("@WaitListTime", SaveRestaurantGuest.WaitListTime);
                        tvpParam7.SqlDbType = SqlDbType.DateTime;
                        SqlParameter tvpParam8 = cmd.Parameters.AddWithValue("@SeatedTime", SaveRestaurantGuest.SeatedTime);
                        tvpParam8.SqlDbType = SqlDbType.DateTime;
                        SqlParameter tvpParam9 = cmd.Parameters.AddWithValue("@UserBioEventsTY", dtUserBioEvents);
                        tvpParam9.SqlDbType = SqlDbType.Structured;

                        SqlParameter pvRetVal = new SqlParameter();
                        pvRetVal.ParameterName = "@RetVal";
                        pvRetVal.DbType = DbType.Int32;
                        pvRetVal.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(pvRetVal);

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

        public DataSet GetRestaurantGuest(int RestaurantID, int UserId, string UserType)
        {
            DataSet dssendResponse = new DataSet();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantGuest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@UserType", UserType);
                        tvpParam1.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@TruflUserID", UserId);
                        tvpParam2.SqlDbType = SqlDbType.Int;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(dssendResponse);
                        }
                        dssendResponse.Tables[0].TableName = "TruflUser";
                        dssendResponse.Tables[1].TableName = "UserBioEvent";
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            return dssendResponse;
        }

        //public bool SaveRestaurantOpenSectionStaff(RestaurantSectionStaffDTO RestaurantSectionStaff)
        //{
        //    string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
        //    try
        //    {
        //        var dtrestSectStaff = new DataTable();
        //        dtrestSectStaff.Columns.Add("RestaurantID", typeof(Int32));
        //        dtrestSectStaff.Columns.Add("TruflUserID", typeof(Int32));
        //        dtrestSectStaff.Columns.Add("RestaurantFloorNumber", typeof(Int32));

        //        dtrestSectStaff.Rows.Add(RestaurantSectionStaff.RestaurantID,
        //                              RestaurantSectionStaff.TruflUserID,
        //                              RestaurantSectionStaff.RestaurantFloorNumber);

        //        using (SqlConnection con = new SqlConnection(connectionString))
        //        {
        //            con.Open();
        //            using (SqlCommand cmd = new SqlCommand("spSaveRestaurantOpenSectionStaff", con))
        //            {
        //                cmd.CommandType = CommandType.StoredProcedure;
        //                SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantSectionStaffTY", RestaurantSectionStaff);
        //                tvpParam.SqlDbType = SqlDbType.Structured;

        //                SqlParameter pvRetVal = new SqlParameter();
        //                pvRetVal.ParameterName = "@RetVal";
        //                pvRetVal.DbType = DbType.Int32;
        //                pvRetVal.Direction = ParameterDirection.Output;
        //                cmd.Parameters.Add(pvRetVal);

        //                int status = cmd.ExecuteNonQuery();
        //                if (status == 0)
        //                {
        //                    return false;
        //                }
        //                else
        //                {
        //                    return true;
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionLogger.WriteToErrorLogFile(ex);
        //        return false;
        //    }
        //}

        //////////////NOT IN USE
        ///// <summary>
        ///// This method SaveRestaurantOpenSectionStaff ' saves RestaurantWaitListOpen (Rest ID &Time), 
        ///// updates RestaurantOpenSection isActive and isDeleted fields 
        ///// and Inserts or Updates RestaurantOpenSectionStaff with Rest ID, User Id, Floorno
        ///// </summary>
        ///// <param name="restOpenSection"> Has the Values for Time(string), Model Class for table type
        ///// restaurantSectionStaffDTO RestaurantSectionStaffDTO</param>
        ///// restaurantActiveSectionsDTO RestaurantActiveSectionsDTO</param>
        ///// <returns></returns>
        //public bool SaveRestaurantOpenSectionStaff__NIU(RestaurantOpenSectionDTO restOpenSection)
        //{

        //    try
        //    {

        //        var dtrestSectStaff = new DataTable();
        //        dtrestSectStaff.Columns.Add("RestaurantID", typeof(Int32));
        //        dtrestSectStaff.Columns.Add("TruflUserID", typeof(Int32));
        //        dtrestSectStaff.Columns.Add("RestaurantFloorNumber", typeof(Int32));

        //        dtrestSectStaff.Rows.Add(restOpenSection.restaurantSectionStaffDTO.RestaurantID,
        //                                restOpenSection.restaurantSectionStaffDTO.TruflUserID,
        //                                restOpenSection.restaurantSectionStaffDTO.RestaurantFloorNumber);

        //        var dtrestActvSect = new DataTable();
        //        dtrestActvSect.Columns.Add("RestaurantID", typeof(Int32));
        //        dtrestActvSect.Columns.Add("FloorNumber", typeof(Int32));
        //        dtrestActvSect.Columns.Add("IsActive", typeof(Boolean));
        //        dtrestActvSect.Columns.Add("IsDelete", typeof(Boolean));

        //        dtrestActvSect.Rows.Add(restOpenSection.restaurantActiveSectionsDTO.RestaurantID,
        //                                restOpenSection.restaurantActiveSectionsDTO.FloorNumber,
        //                                restOpenSection.restaurantActiveSectionsDTO.IsActive,
        //                                restOpenSection.restaurantActiveSectionsDTO.IsDelete);

        //        string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
        //        using (SqlConnection sqlcon = new SqlConnection(connectionString))
        //        {
        //            sqlcon.Open();
        //            using (SqlCommand cmd = new SqlCommand("spSaveRestaurantOpenSectionStaff", sqlcon))
        //            {
        //                cmd.CommandType = CommandType.StoredProcedure;
        //                SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", restOpenSection.restaurantSectionStaffDTO.RestaurantID);
        //                tvpParam.SqlDbType = SqlDbType.Int;
        //                SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@Time", restOpenSection.time);
        //                tvpParam1.SqlDbType = SqlDbType.VarChar;
        //                SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@RestaurantSectionStaffTY", dtrestSectStaff);
        //                tvpParam2.SqlDbType = SqlDbType.Structured;
        //                SqlParameter tvpParam3 = cmd.Parameters.AddWithValue("@RestaurantActiveSectionsTY", dtrestActvSect);
        //                tvpParam3.SqlDbType = SqlDbType.Structured;

        //                SqlParameter pvNewId = new SqlParameter();
        //                pvNewId.ParameterName = "@RetVal";
        //                pvNewId.DbType = DbType.Int32;
        //                pvNewId.Direction = ParameterDirection.Output;
        //                cmd.Parameters.Add(pvNewId);

        //                int status = cmd.ExecuteNonQuery();
        //                if (status == 0)
        //                {
        //                    return false;
        //                }
        //                else
        //                {
        //                    return true;
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        var s = ex.Message;
        //        ExceptionLogger.WriteToErrorLogFile(ex);
        //        return false;
        //    }
        //}



    }
}
