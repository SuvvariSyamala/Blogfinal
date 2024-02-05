using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogApplicationWebAPI.Entitys
{
    public class User
    {
        [Key] 
        public int  UserId { get; set; }
        
        [StringLength(50)]
        [Column("Username", TypeName = "varchar")]
        public string? UserName { get; set; }
       
        [StringLength(50)]
        [Column("Email", TypeName = "varchar")]
        public string? Email { get; set; }
      
        [StringLength(50)]
        [Column("Phone", TypeName = "varchar")]
        public string? PhoneNumber { get; set; }
      
        [StringLength(10)]
        [Column("Password", TypeName = "varchar")]
        public string? Password { get; set; }
       
        [StringLength(50)]
        [Column("UserStatus", TypeName = "varchar")]
        public string? UserStatus { get; set; }
            
        public string?  Role { get; set; } 

    }
}
