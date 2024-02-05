using System;
using System.Net.Mail;
using System.Net;

namespace BlogApplicationWebAPI.Services
{
    public class EmailService
    {
        public void SendRegistrationEmail(string toEmail, string userName)
        {
            var fromAddress = new MailAddress("uploadmyfileu@gmail.com", "Blog Sphere");
            var toAddress = new MailAddress(toEmail, userName);
            const string fromPassword = "Sarath@2001";
            const string subject = "Registration Confirmation";
            string body = $"Dear {userName},\n\nThank you for registering on our website.";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }

}

