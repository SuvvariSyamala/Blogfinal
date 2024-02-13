using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BlogApplicationWebAPI.Entitys
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        [Required]
        [StringLength(500)]
        [Column("Title",TypeName="Varchar")]
        public string? PostTitle { get; set; }
        [Required]
        public string ? Content { get; set; }
        public string  UrlHandle { get; set; }

        public string Image {  get; set; }  
        [Required]
        [StringLength(50)]
        [Column("Status",TypeName ="Varchar")]
        public string ? PostsStatus { get; set; }
        
        [Required]
        public DateTime PublishedDate { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        [JsonIgnore]
        public User  PostedUser { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category  Categorynew { get; set; }
        
        public virtual ICollection<Comment> Comments { get; set; }  
        public string CanComment { get; set; }

    }
}
