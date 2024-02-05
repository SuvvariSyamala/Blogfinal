using BlogApplicationWebAPI.Entitys;

namespace BlogApplicationWebAPI.Services
{
    public interface ICategoryService
    {
        void AddCategory(Category category);

        void UpdateCategory(Category category);

       
        void DeleteCategory(int categoryId);

      
        Category GetCategoryById(int categoryId);

        
        List<Category> GetCategories();


        
    }
}
