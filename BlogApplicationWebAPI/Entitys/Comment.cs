using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BlogApplicationWebAPI.Entitys
{
    public class Comment
    {

        [Key]
        public int Id { get; set; }
        
        [Column("Message")]
        public string ? Text { get; set; }

        public DateTime Commentdate { get; set; }
        [Required]
        [Column("Status")]
        public string? CommentStatus { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }


        [JsonIgnore]
        public User CommentendUser { get; set; }

        [ForeignKey("Id")]

        public int PostId { get; set; }
        [JsonIgnore]
        public Post Post { get; set; }

    }
}
