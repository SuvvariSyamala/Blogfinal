using BlogApplicationWebAPI.Entitys;
using BlogApplicationWebAPI.model;

namespace BlogApplicationWebAPI.Services
{
    public interface IUserService
    {
        void AddUser(User user);
        List<UsersData> GetUsers();
        User GetUserById(int UserId);
        List<User>  GetUserByRoleName(string Role);
        void UpdateUser(User user);
        void DeleteUser(int UserId);
        User ValidteUser(string email, string password);
        // void BlockUser(int userId);
        //void UnBlockUser(int userId);
        void ToggleBlockUser(int userId);

        User GetUserByName(string userName);
    }
}
