using AutoMapper;
using BlogApplicationWebAPI.DTO;
using BlogApplicationWebAPI.Entitys;
using BlogApplicationWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using log4net;
namespace BlogApplicationWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]  
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService CategoryService;

        private readonly IMapper _mapper;
        private readonly ILogger<CategoryController>  _logger;

        public CategoryController(ICategoryService categoryService, IMapper mapper , ILogger<CategoryController> logger)
        {
            this.CategoryService = categoryService;
            _mapper = mapper;
            this._logger = logger;   
        }

        [HttpGet, Route("GetAllCategories")]
       [Authorize]
        public IActionResult GetAll()
        {
            try
            {
                List<Category> categories = CategoryService.GetCategories();
                List<CategoryDTO> categoriesDTO = _mapper.Map<List<CategoryDTO>>(categories);
                return StatusCode(200, categoriesDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost, Route("AddCategory")]
        [Authorize]
        public IActionResult Add(CategoryDTO categoryDTO)
        {
            try
            {
                Category category = _mapper.Map<Category>(categoryDTO);
                CategoryService.AddCategory(category);
                return StatusCode(200, category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpGet, Route("GetCategoryById/{categoryId}")]
        [Authorize]


        public IActionResult Get(int categoryId)
        {
            try
            {
                Category category = CategoryService.GetCategoryById(categoryId);
                CategoryDTO categoryDTO = _mapper.Map<CategoryDTO>(category);
                if (category != null)
                    return StatusCode(200, categoryDTO);
                else
                    return StatusCode(404, new JsonResult("Invalid Id"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut, Route("EditCategory")]
        [Authorize(Roles ="Admin")]
        
        public IActionResult Edit(CategoryDTO categoryDTO)
        {
            try
            {
                Category category = _mapper.Map<Category>(categoryDTO);
                CategoryService.UpdateCategory(category);
                return StatusCode(200, category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete, Route("DeleteCategory/{categoryId}")]
        [Authorize(Roles ="Admin")]
        public IActionResult Delete(int categoryId)
        {
            try
            {
                CategoryService.DeleteCategory(categoryId);
                return StatusCode(200, new JsonResult($"Category with Id {categoryId} is Deleted"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500,ex.Message);

            }
        }
    }
}

