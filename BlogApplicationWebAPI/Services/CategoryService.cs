using BlogApplicationWebAPI.Database;
using BlogApplicationWebAPI.Entitys;

namespace BlogApplicationWebAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly BlogContext Context = null;
        public CategoryService(BlogContext context)        
        {
          
           this.Context = context;  
        
        }
        public void AddCategory(Category category)
        {
           
            Context.Categories.Add(category);
            Context.SaveChanges();
            
            
        }

        public void DeleteCategory(int categoryId)
        {
            var categoryToDelete = Context.Categories.SingleOrDefault(c => c.CategoryId == categoryId);
            if (categoryToDelete != null)
            {
                Context.Categories.Remove(categoryToDelete);
                Context.SaveChanges();
                
            }
           
        }

        public List<Category> GetCategories()
        {
            var res=Context.Categories.ToList();
            return res; 
        }

        public Category GetCategoryById(int categoryId)
        {
            return Context.Categories.Find(categoryId);
        }

        public void UpdateCategory(Category category)
        {
            if (category != null)
            {
                Context.Categories.Update(category);
                Context.SaveChanges();
                
            }
        }

        
    }
}
