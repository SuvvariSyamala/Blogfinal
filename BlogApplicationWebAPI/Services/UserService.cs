using BlogApplicationWebAPI.Database;
using BlogApplicationWebAPI.DTO;
using BlogApplicationWebAPI.Entitys;
using BlogApplicationWebAPI.model;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net.Mail;
using System.Net;

namespace BlogApplicationWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly BlogContext Context = null;
       // private readonly EmailService _emailService;
        public UserService (BlogContext context)
        {
            Context = context;  
        //    _emailService = emailService;
        }
        public void  AddUser(User user)
        {
            try
            {
                if (user != null)
                {
                Context.Users.Add(user);
                Context.SaveChanges();
           //     _emailService.SendRegistrationEmail(user.Email, user.UserName);
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void  DeleteUser(int userId)
        {
            try
            {
                User user = Context.Users.SingleOrDefault(u=>u.UserId==userId);
                if (user != null)
                {
                    Context.Users.Remove(user);
                    Context.SaveChanges();
                    
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }

        

        public User GetUserById(int userId)
        {
            try
            {
                var res = Context.Users.SingleOrDefault(u=>u.UserId==userId);

                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<User> GetUserByRoleName(string Role)
        {
           var res=Context.Users.Where(u=>u.Role==Role).ToList();
            return res; 
        }

        public List<UsersData> GetUsers()
        {
            try
            {
                var Result = Context.Users.Select(r => new UsersData { UserId = r.UserId, UserName = r.UserName, Email = r.Email,Role=r.Role, PhoneNumber = r.PhoneNumber, UserStatus = r.UserStatus }).ToList();
                return Result;
              // return Context.Users.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void  UpdateUser(User user)
        {

            try
            {
                    Context.Users.Update(user);
                    Context.SaveChanges();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }
        public User ValidteUser(string email, string password)
        {
            return Context.Users.SingleOrDefault(u => u.Email == email && u.Password == password);
        }
        /*public void ToggleBlockUser(int userId)
        {
            // Find the user with the specified userId in the database
            var user = Context.Users.Find(userId);

            // Check if a user with the given userId exists in the database
            if (user != null)
            {
                // Check the current status of the user
                if (user.UserStatus == null || user.UserStatus == "Active")
                {
                    // If the user is currently active or status is null, change the status to "Blocked"
                    user.UserStatus = "Blocked";
                }
                else
                {
                    // If the user is currently blocked, change the status to "Active"
                    user.UserStatus = "Active";
                }

                // Save the changes to the database
                Context.SaveChanges();
            }
        }*/
        public void ToggleBlockUser(int userId)
        {
            // Find the user with the specified userId in the database
            var user = Context.Users.Find(userId);

            // Check if a user with the given userId exists in the database
            if (user != null)
            {
                // Check the current status of the user
                if (user.UserStatus == null || user.UserStatus == "Active")
                {
                    // If the user is currently active or status is null, change the status to "Blocked"
                    user.UserStatus = "Blocked";

                    // Send email notification
                    string to = user.Email; // Assuming there's an Email property in your User model
                    string subject = "Account Blocked Notification";
                    string body = $"Dear {user.UserName}, \n \nYour account has been blocked. If you believe this is an error, please contact support.";

                    SendNotificationEmail(to, subject, body);
                }
                else
                {
                    // If the user is currently blocked, change the status to "Active"
                    user.UserStatus = "Active";
                }

                // Save the changes to the database
                Context.SaveChanges();
            }
        }

        // Method to schedule and send a booking confirmation email
       
        // Method to send a notification email
        public void SendNotificationEmail(string recipientEmail, string subject, string body)
        {
            try
            {
                string email = "vysyarajusarathchandra2@gmail.com";
                string password = "xbvziyopggkkapdm";

                // Create the email message
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(email);
                mail.To.Add(recipientEmail);
                mail.Subject = subject;
                mail.Body = body;

                // Set up SMTP client
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential(email, password);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;

                // Send the email
                smtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }

        public User GetUserByName(string userName)
        {
            return Context.Users.SingleOrDefault(u => u.UserName == userName);
        }

    }
}
