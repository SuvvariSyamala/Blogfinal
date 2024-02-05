using BlogApplicationWebAPI.Entitys;

namespace BlogApplicationWebAPI.Services
{
    public interface IPostService
    {
        void AddPost(Post post);
        void UpdatePost(Post post);
        void DeletePost(int postId);
        Post GetPostById(int postId);
       // IQueryable<Post> GetPostById(int postId);

        List<Post>GetPostByUserId(int userId);
        List<Post> GetPost(string Role, string postsStatus);
        List<Post> GetPostByName(string search);

        //void UpdatePostStatus(int postId, string newStatus);
        void ApprovePost(int postId);
        void DenyPost(int postId);
        List<Post> GetPostByCategoryId(int categoryId);
        List<Post> GetPostByCategoryIdAndUserId(int categoryId, int userId);
        void AllowComment(int postId);
        void DisAllowComment(int postId);

    }
}
