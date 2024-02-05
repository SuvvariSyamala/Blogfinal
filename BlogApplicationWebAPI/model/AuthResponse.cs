namespace BlogApplicationWebAPI.model
{
    public class AuthResponse
    {
        public string UserName { get; set; }
        public string  RoleName { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public string UserStatus { get; set; }
    }
}
