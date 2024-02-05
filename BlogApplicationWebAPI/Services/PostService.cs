using BlogApplicationWebAPI.Database;
using BlogApplicationWebAPI.Entitys;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace BlogApplicationWebAPI.Services
{
    public class PostService : IPostService
    {
        private readonly BlogContext Context = null;
        public PostService(BlogContext context)
        {
            this.Context = context;
        }
        public void AddPost(Post post)
        {
            post.PublishedDate = DateTime.Now;
            Context.Posts.Add(post);
            Context.SaveChanges();

        }

        public void DeletePost(int postId)
        {
            var postToDelete = Context.Posts.SingleOrDefault(p => p.PostId == postId);
            if (postToDelete != null)
            {
                Context.Posts.Remove(postToDelete);
                Context.SaveChanges();

            }

        }

        public List<Post> GetPost(string Role, string postsStatus)
        {
            IQueryable<Post> query = Context.Posts
    .Include(p => p.PostedUser)
    .Include(p => p.Categorynew);

            List<Post> posts;

            if (Role == "Admin")
            {
                posts = query
                    .Where(p => postsStatus != null ? p.PostsStatus == postsStatus :
                     p.PostsStatus == "Approved" || p.PostsStatus == "Denied" || p.PostsStatus == "Unreviewed")
                    .ToList();
            }
            else
            {
                posts = query
                    .Where(p => p.PostsStatus == "Approved")
                    .ToList();
            }

            return posts;

        }

        public Post GetPostById(int postId)
        {
            var res = Context.Posts.Where(p => p.PostId == postId).Include(p => p.PostedUser)

         .Include(p => p.Categorynew).FirstOrDefault(); ;
            return res;
        }

        





        public List<Post> GetPostByCategoryId(int categoryId)
        {
            var res = Context.Posts.Where(p => p.CategoryId == categoryId && p.PostsStatus == "Approved").Include(p => p.PostedUser)

         .Include(p => p.Categorynew).ToList();
            return res;
        }
        public void UpdatePost(Post post)
        {

            Context.Posts.Update(post);
            Context.SaveChanges();



        }

        public void ApprovePost(int postId)
        {
            var post = Context.Posts.Find(postId) ?? throw new InvalidOperationException($"Post with Id {postId} not found.");
            post.PostsStatus = "Approved";
            post.IsApproved = true;
            Context.Posts.Update(post);
            Context.SaveChanges();
        }

        public void DenyPost(int postId)
        {
            var post = Context.Posts.Find(postId) ?? throw new InvalidOperationException($"Post with Id {postId} not found.");
            post.PostsStatus = "Denied";
            post.IsDenied = true;
            Context.Posts.Update(post);
            Context.SaveChanges();
        }

        public List<Post> GetPostByUserId(int userId)
        {
            var res = Context.Posts.Where(p => p.UserId == userId).Include(p => p.PostedUser)

        .Include(p => p.Categorynew).ToList();
            return res;
        }



        public List<Post> GetPostByCategoryIdAndUserId(int categoryId, int userId)
        {
            var res = Context.Posts
   .Where(p => p.CategoryId == categoryId && p.UserId == userId)
   .Include(p => p.PostedUser)
   .Include(p => p.Categorynew)
   .ToList();

            return res;


        }

        public void AllowComment(int postId)
        {
            var post = Context.Posts.SingleOrDefault(p => p.PostId == postId);
            if (post != null)
            {
                post.CanComment = "Allowed";
                Context.SaveChanges();
            }
        }

        public void DisAllowComment(int postId)
        {
            var post = Context.Posts.SingleOrDefault(p => p.PostId == postId);
            if (post != null)
            {
                post.CanComment = "DisAllowed";
                Context.SaveChanges();
            }
        }

        public List<Post> GetPostByName(string search)
        {
            var res = Context.Posts
        .Include(p => p.PostedUser)
        .Include(p => p.Categorynew)
        .AsEnumerable()
        .Where(p => string.IsNullOrEmpty(search) || p.PostTitle.Contains(search, StringComparison.OrdinalIgnoreCase))
        .ToList();

            return res;
        }
    }
}
