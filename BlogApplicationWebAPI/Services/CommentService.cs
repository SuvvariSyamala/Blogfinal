using BlogApplicationWebAPI.Database;
using BlogApplicationWebAPI.Entitys;
using Microsoft.EntityFrameworkCore;

namespace BlogApplicationWebAPI.Services
{
    public class CommentService : ICommentService
    {
        private readonly BlogContext Context = null;
        public CommentService(BlogContext context)
        {
            Context = context;  
        }

        public void AddComment(Comment comment)
        {
            try
            {
                Context.Comments.Add(comment);
                Context.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void  DeleteComment(int commentId)
        {
            try
            {
                var commentToDelete = Context.Comments.SingleOrDefault(c => c.Id == commentId);
                if (commentToDelete != null)
                {
                    Context.Comments.Remove(commentToDelete);
                    Context.SaveChanges();

                }
            }
            catch (Exception)
            {

                throw;
            }
           
        }

        public List<Comment> GetCommentByPostId(int postId, string Role)
        {

            try
            {

                IQueryable<Comment> query = Context.Comments
                    .Where(p=>p.PostId == postId)
                    .Include(p => p.CommentendUser)
                    .Include(p => p.Post);

                List<Comment> comments;

                if (Role == "Admin")
                {
                    comments = query
                        .Where(p => p.CommentStatus == "Approved" || p.CommentStatus == "Denied" || p.CommentStatus == "Unreviewed")
                        .ToList();
                }
                else
                {
                    comments = query
                        .Where(p => p.CommentStatus == "Approved")
                        .ToList();
                }

                return comments;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<Comment> GetComment(string Role)
        {
            IQueryable<Comment> query = Context.Comments
    .Include(p => p.CommentendUser)
    .Include(p => p.Post);

            List<Comment> comments;

            if (Role == "Admin")
            {
                comments = query
                    .Where(p => p.CommentStatus == "Approved" || p.CommentStatus == "Denied" || p.CommentStatus == "Unreviewed")
                    .ToList();
            }
            else
            {
                comments = query
                    .Where(p => p.CommentStatus == "Approved")
                    .ToList();
            }

            return comments;

        }

        public Comment GetCommentById(int commentId)
        {
            try
            {
                var res = Context.Comments.Find(commentId);
                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        

        public void UpdateComment(Comment comment)
        {
            try
            {
                if (comment != null)
                {
                    Context.Comments.Update(comment);
                    Context.SaveChanges();

                }
            }
            catch (Exception)
            {

                throw;
            }
            
        }
        public void ApproveComment(int commentId)
        {
            var comment = Context.Comments.Find(commentId) ?? throw new InvalidOperationException($"Comments with Id {commentId} not found.");
            comment.CommentStatus = "Approved";
            Context.Comments.Update(comment);
            Context.SaveChanges();
        }

        public void DenyComment(int commentId)
        {
            var comment = Context.Comments.Find(commentId) ?? throw new InvalidOperationException($"Comments with Id {commentId} not found.");
            comment.CommentStatus = "Denied";
            Context.Comments.Update(comment);
            Context.SaveChanges();
        }

       
    }
}
