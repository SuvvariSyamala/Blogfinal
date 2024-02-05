using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApplicationWebAPI.Entitys
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        [Column("CategoryName",TypeName ="Varchar")]
        public string? CategoryName { get; set; }

        [Required]
        public string?  Description { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

    }
}
