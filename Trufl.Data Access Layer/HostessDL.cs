﻿using System;
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
        /// This method 'SaveParkingLots' will save Location data
        /// </summary>
        /// <param name="passParkingLots"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveTruflUserInfromation(List<TruflUserInputDTO> truflUserInputDTO)
        {
            try
            {
                var dtClient = new DataTable();

                dtClient.Columns.Add("TruflUserID", typeof(Int64));
                dtClient.Columns.Add("RestaurantID", typeof(Int64));
                dtClient.Columns.Add("FirstName", typeof(string));
                dtClient.Columns.Add("MiddleName", typeof(string));
                dtClient.Columns.Add("LastName", typeof(string));
                dtClient.Columns.Add("Email", typeof(string));
                dtClient.Columns.Add("pic", typeof(string));
                dtClient.Columns.Add("Contact1", typeof(string));
                dtClient.Columns.Add("Password", typeof(string));
                dtClient.Columns.Add("Salt", typeof(string));
                dtClient.Columns.Add("DOB", typeof(DateTime));
                dtClient.Columns.Add("ActiveInd", typeof(char));
                dtClient.Columns.Add("RestaurantEmpInd", typeof(Int64));
                dtClient.Columns.Add("TruflMemberType", typeof(Int64));
                dtClient.Columns.Add("TruflRelationship", typeof(Int64));
                dtClient.Columns.Add("TruflshareCode", typeof(string));
                dtClient.Columns.Add("ReferTruflUserID", typeof(Int64));
                dtClient.Columns.Add("ModifiedDate", typeof(DateTime));
                dtClient.Columns.Add("ModifiedBy", typeof(Int64));
                dtClient.Columns.Add("Waited", typeof(string));

                dtClient.Rows.Add(truflUserInputDTO[0].TruflUserID,
                                   truflUserInputDTO[0].RestaurantID,
                                   truflUserInputDTO[0].FirstName,
                                   truflUserInputDTO[0].MiddleName,
                                   truflUserInputDTO[0].LastName,
                                   truflUserInputDTO[0].Email,
                                   truflUserInputDTO[0].pic,
                                   truflUserInputDTO[0].Contact1,
                                   truflUserInputDTO[0].Password,
                                   truflUserInputDTO[0].Salt,
                                   truflUserInputDTO[0].DOB,
                                   truflUserInputDTO[0].ActiveInd,
                                   truflUserInputDTO[0].RestaurantEmpInd,
                                   truflUserInputDTO[0].TruflMemberType,
                                   truflUserInputDTO[0].TruflRelationship,
                                   truflUserInputDTO[0].TruflshareCode,
                                   truflUserInputDTO[0].ReferTruflUserID,
                                   truflUserInputDTO[0].ModifiedDate,
                                   truflUserInputDTO[0].ModifiedBy,
                                   truflUserInputDTO[0].Waited
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
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@LoggedInUser", truflUserInputDTO[0].LoggedInUser);
                        tvparam1.SqlDbType = SqlDbType.Structured;
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

                dtClient.Columns.Add("BookingID", typeof(Int64));
                dtClient.Columns.Add("TruflUserID", typeof(Int64));
                dtClient.Columns.Add("RestaurantID", typeof(Int64));
                dtClient.Columns.Add("PartySize", typeof(Int64));
                dtClient.Columns.Add("OfferType", typeof(Int64));
                dtClient.Columns.Add("OfferAmount", typeof(Int64));
                dtClient.Columns.Add("BookingStatus", typeof(Int64));
                dtClient.Columns.Add("Points", typeof(Int64));
                dtClient.Columns.Add("TruflUserCardDataID", typeof(Int64));
                dtClient.Columns.Add("TruflTCID", typeof(Int64));
                dtClient.Columns.Add("ModifiedDate", typeof(DateTime));
                dtClient.Columns.Add("ModifiedBy", typeof(Int64));
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

                dtClient.Columns.Add("RestaurantID", typeof(Int64));
                dtClient.Columns.Add("TruflUserID", typeof(Int64));
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
        public bool SaveSignUpUserInfo(List<TruflUserInputDTO> registerUserInfo)
        {
            try
            {
                var dtClient = new DataTable();

                //dtClient.Columns.Add("TruflUserID", typeof(Int64));
                //dtClient.Columns.Add("RestaurantID", typeof(Int64));
                //dtClient.Columns.Add("FirstName", typeof(string));
                //dtClient.Columns.Add("MiddleName", typeof(string));
                //dtClient.Columns.Add("LastName", typeof(string));
                //dtClient.Columns.Add("Email", typeof(string));
                //dtClient.Columns.Add("pic", typeof(string));
                //dtClient.Columns.Add("Contact1", typeof(string));
                //dtClient.Columns.Add("Password", typeof(string));
                //dtClient.Columns.Add("Salt", typeof(string));
                //dtClient.Columns.Add("DOB", typeof(string));
                //dtClient.Columns.Add("ActiveInd", typeof(Int64));
                //dtClient.Columns.Add("RestaurantEmpInd", typeof(Int64));
                //dtClient.Columns.Add("TruflMemberType", typeof(Int64));
                //dtClient.Columns.Add("TruflRelationship", typeof(Int64));
                //dtClient.Columns.Add("TruflshareCode", typeof(string));
                //dtClient.Columns.Add("ReferTruflUserID", typeof(string));
                //dtClient.Columns.Add("ModifiedDate", typeof(DateTime));
                //dtClient.Columns.Add("ModifiedBy", typeof(Int64));
                //dtClient.Columns.Add("Waited", typeof(DateTime));

               
                dtClient.Columns.Add("FirstName", typeof(string));
                dtClient.Columns.Add("MiddleName", typeof(string));
                dtClient.Columns.Add("LastName", typeof(string));
                dtClient.Columns.Add("Email", typeof(string));
                dtClient.Columns.Add("Password", typeof(string));
                dtClient.Columns.Add("LoggedInUserType", typeof(string));



                //dtClient.Rows.Add(         registerUserInfo[0].TruflUserID,
                //                   registerUserInfo[0].RestaurantID,
                //                   registerUserInfo[0].FirstName,
                //                   registerUserInfo[0].MiddleName,
                //                   registerUserInfo[0].LastName,
                //                   registerUserInfo[0].Email,
                //                   registerUserInfo[0].pic,
                //                   registerUserInfo[0].Contact1,
                //                   registerUserInfo[0].Password,
                //                   registerUserInfo[0].Salt,
                //                   registerUserInfo[0].DOB,
                //                   registerUserInfo[0].ActiveInd,
                //                   registerUserInfo[0].RestaurantEmpInd,
                //                   registerUserInfo[0].TruflMemberType,
                //                   registerUserInfo[0].TruflRelationship,
                //                   registerUserInfo[0].TruflshareCode,
                //                   registerUserInfo[0].ReferTruflUserID,
                //                   registerUserInfo[0].ModifiedDate,
                //                   registerUserInfo[0].ModifiedBy,
                //                   registerUserInfo[0].Waited

                //                   );

                dtClient.Rows.Add(
                                  registerUserInfo[0].FirstName,
                                  registerUserInfo[0].MiddleName,
                                  registerUserInfo[0].LastName,
                                  registerUserInfo[0].Email,                                 
                                  registerUserInfo[0].Password
                                  


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
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@LoggedInUser", registerUserInfo[0].LoggedInUser);
                        tvparam1.SqlDbType = SqlDbType.Structured;
                        SqlParameter tvparam2 = cmd.Parameters.AddWithValue("@LoggedInUserType", registerUserInfo[0].LoggedInUserType);
                        tvparam2.SqlDbType = SqlDbType.Structured;
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
        #endregion

        

        #endregion

    }
}
