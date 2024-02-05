using AutoMapper;
using BlogApplicationWebAPI.DTO;
using BlogApplicationWebAPI.Entitys;
using BlogApplicationWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using log4net;
using System.Net.Http.Headers;

namespace BlogApplicationWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService PostService;

        private readonly IMapper _mapper;
        private readonly ILogger<PostController> _logger;

        public PostController(IPostService postService, IMapper mapper, ILogger<PostController> logger)
        {
            this.PostService = postService;
            _mapper = mapper;
            this._logger = logger;
        }

        [HttpGet, Route("GetAllPosts")]
        public IActionResult GetAll(string Role,string? postsStatus)
        {
            try
            {
                List<Post> posts = PostService.GetPost(Role,postsStatus);
                List<PostDTO> postsDTO = _mapper.Map<List<PostDTO>>(posts);
                return StatusCode(200, postsDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet, Route("GetPostByName")]
        [AllowAnonymous]
        public IActionResult GetPost(string search)
        {
            try
            {
                List<Post> posts = PostService.GetPostByName(search);
                List<PostDTO> postsDTO = _mapper.Map<List<PostDTO>>(posts);
               // List<string> suggestions = PostService.GetPost(PostName);

                if (posts.Count > 0)
                    return StatusCode(200, postsDTO);
                else
                    return StatusCode(404, new JsonResult("No posts found with the specified title"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }

        }
        
        [HttpGet, Route("GetPostByCategoryId/{categoryId}")]
       [ AllowAnonymous]
        public IActionResult GetPostByCategoryId(int categoryId)
        {
            try
            {
                List<Post> posts = PostService.GetPostByCategoryId(categoryId);

                if (posts == null || posts.Count == 0)
                {
                    return StatusCode(404, $"Posts with CategoryId {categoryId} not found.");
                }

                List<PostDTO> postDTOs = _mapper.Map<List<PostDTO>>(posts);
                return StatusCode(200, postDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet, Route("GetPostByUserId/{userId}")]
        [Authorize(Roles ="User")] 
        public IActionResult GetPostByUserId(int userId)
        {
            try
            {
                List<Post> posts = PostService.GetPostByUserId(userId);

                if (posts == null || posts.Count == 0)
                {
                    return StatusCode(404, $"Posts for UserId {userId} not found.");
                }

                List<PostDTO> postDTOs = _mapper.Map<List<PostDTO>>(posts);
                return StatusCode(200, postDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost, Route("AddPost")]
        [Authorize]
        public IActionResult Add([FromBody] PostDTO postDTO)
        {
            try
            {
                Post posts = _mapper.Map<Post>(postDTO);
                PostService.AddPost(posts);
                return StatusCode(200, posts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.InnerException.Message);
            }
        }
        [HttpGet, Route("GetPostById/{postId}")]
        [AllowAnonymous]
        public IActionResult GetPostById(int postId)
        {
            try
            {
                Post post = PostService.GetPostById(postId);

                if (post == null)
                {
                    return StatusCode(404, $"User with Id {postId} not found.");
                }


                PostDTO postDTO = _mapper.Map<PostDTO>(post);
                return StatusCode(200, postDTO);
            }

            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPut, Route("EditPost")]
        [Authorize(Roles ="User")]
        public IActionResult Edit([FromBody] PostDTO postDTO)
        {
            try
            {
                Post post = _mapper.Map<Post>(postDTO);
                PostService.UpdatePost(post);
                return StatusCode(200, post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete, Route("DeletePost/{postId}")]
        [Authorize(Roles ="User")]
        public IActionResult Delete(int postId)
        {
            try
            {
                PostService.DeletePost(postId);
                return StatusCode(200, new JsonResult($"Post with Id {postId} is Deleted"));
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut, Route("ApprovePost/{postId}")]
        [Authorize (Roles = "Admin")]
        public IActionResult ApprovePost(int postId)
        {
            try
            {
                PostService.ApprovePost(postId);
                return StatusCode(200, new JsonResult($"Post with Id {postId} is Approved"));
            }
            catch (Exception)
            {
                throw new Exception("Post is not found");
            }
        }
        [HttpPut, Route("DenyPost/{postId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DenyPost(int postId)
        {
            try
            {
                PostService.DenyPost(postId);
                return StatusCode(200, new JsonResult($"Post with Id {postId} is Denied"));
            }
            catch (Exception)
            {
                throw new Exception("Post is not found");
            }
        }
        [HttpGet, Route("GetPostByCategoryIdAndUserId/{categoryId}/{userId}")]
        [Authorize(Roles = "User")]
        public IActionResult GetPostByCategoryIdAndUserId(int categoryId, int userId)
        {
            try
            {
                List<Post> posts = PostService.GetPostByCategoryIdAndUserId(categoryId, userId);

                if (posts == null || posts.Count == 0)
                {
                    return StatusCode(404, $"Posts with CategoryId {categoryId} and UserId {userId} not found.");
                }

                List<PostDTO> postDTOs = _mapper.Map<List<PostDTO>>(posts);
                return StatusCode(200, postDTOs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut,Route("AllowComment/{postId}")]
        [Authorize(Roles ="Admin")]
        public IActionResult AllowComment(int postId) {
            try
            {
                PostService.AllowComment(postId);
                return StatusCode(200, $"Allowed comments on {postId}");
            }catch(Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }
        [HttpPut, Route("DisAllowComment/{postId}")]
        [Authorize(Roles ="Admin")]
        public IActionResult DisAllowComment(int postId)
        {
            try
            {
                PostService.DisAllowComment(postId);
                return StatusCode(200, $"DisAllowed comments on {postId}");
            }
            catch (Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }
        [HttpPost, Route("UploadImage")]
        [AllowAnonymous]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}

    

