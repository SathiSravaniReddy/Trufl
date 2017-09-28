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
    public class AdminDL
    {
        #region Db Connection 
        SqlConnection con = new SqlConnection(ConfigurationManager.AppSettings["TraflConnection"]);
        string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
        #endregion

        #region Trufl_Admin

        public DashBoardDetailsDTO GetDashBoardDetails(DashBoardDTO dashboardInput)
        {
            DashBoardDetailsDTO response = new DashBoardDetailsDTO();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetDashBoardDetails", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (dashboardInput != null)
                        {
                            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@FromDate", dashboardInput.FromDate);
                            tvpParam.SqlDbType = SqlDbType.DateTime;
                            SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@ToDate", dashboardInput.ToDate);
                            tvparam1.SqlDbType = SqlDbType.DateTime;
                        }
                        else
                        {
                            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@FromDate", DBNull.Value);
                            tvpParam.SqlDbType = SqlDbType.DateTime;
                            SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@ToDate", DBNull.Value);
                            tvparam1.SqlDbType = SqlDbType.DateTime;
                        }

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            DataSet ds = new DataSet();
                            da.Fill(ds);

                            //sendResponse = ds.Tables[0];  // Create
                            //sendResponse.Merge(ds.Tables[1]);
                            response.OffersRaised = ds.Tables[0];
                            response.OffersAccepted = ds.Tables[1];
                            response.OffersRemoved = ds.Tables[2];
                            response.VisitedCustomers = ds.Tables[3];
                            response.TotalNumberOfCustomers = ds.Tables[4];
                            response.NumberOfTruflRestaurants = ds.Tables[5];
                            response.RestaurantDetails = ds.Tables[6];
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionLogger.WriteToErrorLogFile(ex);
            }
            //return sendResponse;
            return response;
        }

        /// <summary>
        /// This method 'GetNotifications ' returns Notifications details
        /// </summary>
        /// <returns>Notifications List</returns>
        public DataTable GetNotifications(int RestaurantID)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spGetNotifications", sqlcon))
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
        /// This method 'SaveNotifications' will save Notifcation data
        /// </summary>
        /// <param name="SaveNotifications"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveNotifications(NotificationsDTO notifications)
        {
            try
            {
                
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveNotifications", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", notifications.RestaurantID);
                        tvpParam.SqlDbType = SqlDbType.Int;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@Description", notifications.Description);
                        tvpParam1.SqlDbType = SqlDbType.Text;
                        SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@ExpiryDate ", notifications.ExpiryDate);
                        tvpParam2.SqlDbType = SqlDbType.DateTime;


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


        /// This method 'spSaveRestaurant' will save Restaurant data
        /// </summary>
        /// <param name="SaveRestaurant"></param>
        /// <returns>Returns 1 if Success, 0 for failure</returns>
        public bool SaveRestaurant(SaveRestaurantDTO restaurant)
        {
            try
            {

                var dtClient = new DataTable();

                dtClient.Columns.Add("RestaurantID", typeof(Int32));
                dtClient.Columns.Add("RestaurantName", typeof(string));
                dtClient.Columns.Add("Description", typeof(string));
                dtClient.Columns.Add("PrimaryContact", typeof(string));
                dtClient.Columns.Add("SecondaryContact", typeof(string));
                dtClient.Columns.Add("HoursofOperation", typeof(Int32));
                dtClient.Columns.Add("Parking", typeof(bool));
                dtClient.Columns.Add("Geo", typeof(string));
                dtClient.Columns.Add("Email", typeof(string));
                dtClient.Columns.Add("Address1", typeof(string));
                dtClient.Columns.Add("Address2", typeof(string));
                dtClient.Columns.Add("State", typeof(string));
                dtClient.Columns.Add("Zipcode", typeof(string));
                dtClient.Columns.Add("OwnerName", typeof(string));
                dtClient.Columns.Add("OwnerContact1", typeof(string));
                dtClient.Columns.Add("OwnerContact2", typeof(string));
                dtClient.Columns.Add("OwnerEmail", typeof(string));
                dtClient.Columns.Add("GetSeatedOffer", typeof(bool));
                dtClient.Columns.Add("QuotedTime", typeof(string));
                dtClient.Columns.Add("ModifiedDate", typeof(DateTime));
                dtClient.Columns.Add("ModifiedBy", typeof(Int32));
                dtClient.Columns.Add("SeatingSize", typeof(Int32));
                dtClient.Columns.Add("NumberOfTables", typeof(Int32));
                dtClient.Columns.Add("MenuPath", typeof(Int32));


                dtClient.Rows.Add(restaurant.RestaurantID,
                                  restaurant.RestaurantName,
                                  restaurant.Description,
                                  restaurant.PrimaryContact,
                                  restaurant.SecondaryContact,
                                  restaurant.HoursofOperation,
                                  restaurant.Parking,
                                  restaurant.Geo,
                                  restaurant.Email,
                                  restaurant.Address1,
                                  restaurant.Address2,
                                  restaurant.State,
                                  restaurant.Zipcode,
                                  restaurant.OwnerName,
                                  restaurant.OwnerContact1,
                                  restaurant.OwnerContact2,
                                  restaurant.OwnerEmail,
                                  restaurant.GetSeatedOffer,
                                  restaurant.QuotedTime,
                                  restaurant.ModifiedDate,
                                  restaurant.ModifiedBy,
                                  restaurant.SeatingSize,
                                  restaurant.NumberOfTables,
                                  restaurant.MenuPath
                                   );



                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("spSaveRestaurant", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantTY", dtClient);
                        tvpParam.SqlDbType = SqlDbType.Structured;
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@LoggedInUser", restaurant.LoggedInUser);
                        tvpParam1.SqlDbType = SqlDbType.Int;

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

        /// <summary>
        /// This method 'GetRestaurantUserDetails ' returns Restaurant User details
        /// </summary>
        /// <returns>Notifications List</returns>
        public SettingsDTO GetRestaurantUserDetails(int? RestaurantID,int TruflUserID,string UserType)
        {
            SettingsDTO sendResponse = new SettingsDTO();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spGetRestaurantUserDetails", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;
                        cmd.CommandType = CommandType.StoredProcedure;

                        
                        if (RestaurantID == null)
                        {
                            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", DBNull.Value);
                        }
                        else
                        {
                            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@RestaurantID", RestaurantID);
                            tvpParam.SqlDbType = SqlDbType.Int;
                        }
                        SqlParameter tvparam1 = cmd.Parameters.AddWithValue("@TruflUserID", TruflUserID);
                        tvparam1.SqlDbType = SqlDbType.Int;
                        SqlParameter tvparam2 = cmd.Parameters.AddWithValue("@UserType", UserType);
                        tvparam2.SqlDbType = SqlDbType.Char;

                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            DataSet ds = new DataSet();
                            da.Fill(ds);

                            sendResponse.UserLoginInformation = ds.Tables[0];
                            sendResponse.UsersInformation = ds.Tables[1];
                            sendResponse.RegisteredRestaurants = ds.Tables[2];
                            sendResponse.RestaurantUserDetailswithHistory = ds.Tables[3];
                            //sendResponse.BookingHistory = ds.Tables[3];
                            sendResponse.UserProfielFullName = ds.Tables[4];
                            sendResponse.BioData = ds.Tables[5];
                            sendResponse.BookingHistory = ds.Tables[6];
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
        /// This method 'GetAllRestaurants ' returns AllRestaurants details
        /// </summary>
        /// <returns>Notifications List</returns>
        public DataTable GetAllRestaurants()
        {
            DataTable sendResponse = new DataTable();
            try
            {
                string connectionString = ConfigurationManager.AppSettings["TraflConnection"];
                using (SqlConnection sqlcon = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spGetAllRestaurants", sqlcon))
                    {
                        cmd.CommandTimeout = TruflConstants.DBResponseTime;

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
        /// This method 'SaveProfilePassword' will Save Profile Password 
        /// </summary>
        /// <param name=" data"></param>
        /// <returns>Returns SaveProfilePassword  </returns>
        public bool SaveProfilePassword(RestPasswordDTO restPasswordInput)
        {
            DataTable sendResponse = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SaveProfilePassword", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlParameter tvpParam = cmd.Parameters.AddWithValue("@UserID", restPasswordInput.UserID);
                        SqlParameter tvpParam1 = cmd.Parameters.AddWithValue("@UserName", restPasswordInput.UserName);
                        SqlParameter tvpParam2 = cmd.Parameters.AddWithValue("@UserEmail", restPasswordInput.UserEmail);
                        tvpParam2.SqlDbType = SqlDbType.Text;
                        //SqlParameter tvpParam3 = cmd.Parameters.AddWithValue("@LoginPassword", DBNull.Value);
              
                        SqlParameter tvpParam4 = cmd.Parameters.AddWithValue("@NewLoginPassword", restPasswordInput.NewLoginPassword);
                        tvpParam4.SqlDbType = SqlDbType.Text;

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
    }
}
