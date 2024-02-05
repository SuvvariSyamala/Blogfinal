using BlogApplicationWebAPI.Entitys;
using Microsoft.EntityFrameworkCore;

namespace BlogApplicationWebAPI.Database
{
    public class BlogContext : DbContext    
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        private  IConfiguration config = null;
        public BlogContext (IConfiguration cfg)
        {
            config = cfg;

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(config["ConnectionString"]);
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasIndex(c => c.CategoryName).IsUnique(true);
            base.OnModelCreating(modelBuilder);

                     

        }

    }
}
