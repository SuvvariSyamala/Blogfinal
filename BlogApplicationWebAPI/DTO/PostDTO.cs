namespace BlogApplicationWebAPI.DTO
{
    public class PostDTO
    {       
        public int PostId { get; set; }     
        public string ? PostTitle { get; set; }
        public string? Content { get; set; }      
        public string ? UrlHandle { get; set; }

        public string Image {  get; set; }  
        public string ? PostsStatus { get;set; } 
        
        public string ? AuthorName { get; set; }
        public string ? CategoryName { get; set; }
        public DateTime? PublishedDate { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; } 
        public string CanComment { get; set; }


    }
}
