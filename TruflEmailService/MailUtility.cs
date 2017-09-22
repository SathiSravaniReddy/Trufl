using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net.Configuration;
using System.Net;
using TruflEmailService;
using System.Configuration;

namespace TruflEmailService
{
    public class MailUtility
    {
        public MailUtility()
        {

        }

        //private void sendMailUsingSMTP(ResetPasswordEmailDTO user, TruflEmailDetails emailSetting)
        //{
        //    using (MailMessage mail = new MailMessage())
        //    {
        //        mail.From = new MailAddress(emailSetting.emailFrom);
        //        mail.To.Add(emailSetting.emailTo.Replace(";", ","));
        //        mail.Subject = emailSetting.subject;
        //        mail.Body = emailSetting.body;
        //        mail.IsBodyHtml = true;
        //        using (SmtpClient smtp = new SmtpClient(emailSetting.host, emailSetting.port))
        //        {
        //            smtp.Credentials = new NetworkCredential(emailSetting.emailFrom, emailSetting.smtpPassword);
        //            smtp.EnableSsl = emailSetting.enableSSL;
        //            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        //            smtp.Send(mail);
        //        }
        //    }
        //}
        //static object getbaseSettings()
        //{
        //    //Configuration configurationFile = null;
        //    //if (HttpContext.Current != null)
        //    //    configurationFile = WebConfigurationManager.
        //    //    OpenWebConfiguration(HttpContext.Current.Request.ApplicationPath);
        //    //else
        //    //    configurationFile = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
        //    //MailSettingsSectionGroup SMTPSettings = configurationFile.GetSectionGroup("system.net/mailSettings") as MailSettingsSectionGroup;
        //    var cappemail = new TruflEmailDetails
        //    {
        //        //emailFrom = CAPPParameter.getValue<string>("EmailuserName"),
        //        //host = CAPPParameter.getValue<string>("networkhost"),
        //        //port = CAPPParameter.getValue<int>("port"),
        //        //smtpPassword = CAPPParameter.getValue<string>("Emailpassword"),
        //        //enableSSL = CAPPParameter.getValue<bool>("enableSSL")
        //        emailFrom = "azure_d1b6fbbef4de5f104373672b535cac66@azure.com",
        //        host = "smtp.sendgrid.net",
        //        port = 587,
        //        smtpPassword = "1ns!tuc@ppM",
        //        enableSSL = true
        //    };
        //    return cappemail;

        //}

        //private object GetMailSettingForResetPassword(ResetPasswordEmailDTO email)
        //{
        //    var cappemail = getbaseSettings() as TruflEmailDetails;
        //    cappemail.emailTo = email.To;
        //    cappemail.subject = email.Subject;
        //    cappemail.body = email.Body;
        //    return cappemail;


        //}
        ////public void sendMail(ResetPasswordEmailDTO email)
        //{
        //    sendMailUsingSMTP(email, GetMailSettingForResetPassword(email) as TruflEmailDetails);

        //}
        private void SendMailUsingSMTP(TruflEmailDetails emailSetting)
        {
            emailSetting.APIKey = ConfigurationManager.AppSettings.Get("MailjetAPIKey").ToString();
            emailSetting.SecretKey = ConfigurationManager.AppSettings.Get("MailjetSecretKey").ToString();
            emailSetting.emailFrom = ConfigurationManager.AppSettings.Get("emailFrom").ToString();
            emailSetting.host = ConfigurationManager.AppSettings.Get("smtphost").ToString();
            emailSetting.port = Convert.ToInt16(ConfigurationManager.AppSettings.Get("smtpPort"));
            emailSetting.enableSSL = Convert.ToBoolean(ConfigurationManager.AppSettings.Get("enableSSL"));
            emailSetting.enableSSL = true;
            //emailSetting.emailTo = "naresh.pittala@ptgindia.com, praveen.pekuda@ptgindia.com, bhaskar.ravuri@ptgindia.com";
            //emailSetting.emailTo = "naresh.pittala@ptgindia.com, naresh2277@gmail.com";
            //emailSetting.subject = "Test Mail from WebAPI using Mailjet service";
            //emailSetting.body = "<p><H1> Test Mail </H1></p> <p>This is a test mail sent using mailjet service.</p> <p> We can send mail to any domain or server easily</p> ";
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(emailSetting.emailFrom);
                    mail.To.Add(emailSetting.emailTo.Replace(";", ","));
                    mail.Subject = emailSetting.subject;
                    mail.Body = emailSetting.body;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient(emailSetting.host, emailSetting.port))
                    {
                        smtp.Credentials = new NetworkCredential(emailSetting.APIKey, emailSetting.SecretKey);             //For Mailjet
                        //smtp.Credentials = new NetworkCredential(emailSetting.emailFrom, emailSetting.smtpPassword);         //For smtp     // Enter senders User name and password
                        smtp.EnableSsl = emailSetting.enableSSL;
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtp.Send(mail);
                    }
                }
            }
            catch (Exception ex)
            {
                string err = ex.Message;
            }
        }

        class TruflEmailDetails
        {
            internal string APIKey;
            internal string SecretKey;
            internal string emailFrom;
            internal string host;
            internal int port;
            internal bool enableSSL;
            internal string emailTo;
            internal string subject;
            internal string body;
        }

    }
}
