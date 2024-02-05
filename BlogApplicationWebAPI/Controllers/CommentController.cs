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
    public class CommentController : ControllerBase
    {
        private readonly ICommentService CommentService;

        private readonly IMapper _mapper;
        private readonly ILogger<CommentController> _logger;   

        public CommentController(ICommentService commentService, IMapper mapper, ILogger<CommentController> logger)
        {
            CommentService = commentService;
            _mapper = mapper;
           this. _logger = logger;   
        }
        [HttpGet, Route("GetCommentByPostId/{postId}")]
        [AllowAnonymous]
        public IActionResult GetCommentByPostId(int postId,string role)
        {
            try
            {
                List<Comment> comments = CommentService.GetCommentByPostId(postId,role);
                if (comments == null || comments.Count == 0)
                {
                    return StatusCode(200, $"Comments with PostId {postId} not found.");
                }
              
                List<CommentDTO> commentsDTO = _mapper.Map<List<CommentDTO>>(comments);
                return StatusCode(200, commentsDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet, Route("GetAllComments")]
        [Authorize]
        public IActionResult GetAll(string Role)
        {
            try
            {
                List<Comment> comments = CommentService.GetComment(Role);
                List<CommentDTO> commentsDTO = _mapper.Map<List<CommentDTO>>(comments);
                return StatusCode(200, commentsDTO);


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost, Route("AddComment")]
        [Authorize(Roles ="User")]
        public IActionResult Add([FromBody] CommentDTO commentDTO)
        {
            try
            {
                Comment comment = _mapper.Map<Comment>(commentDTO);
                CommentService.AddComment(comment);
                return StatusCode(200, comment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.InnerException.Message);
            }
        }
        [HttpGet, Route("GetCommentById/{Id}")]
        [Authorize(Roles ="Admin")]

        public IActionResult Get(int Id)
        {
            try
            {
                Comment comment = CommentService.GetCommentById(Id);
                CommentDTO commentDTO = _mapper.Map<CommentDTO>(comment);
                if (comment != null)
                    return StatusCode(200, commentDTO);
                else
                    return StatusCode(404, new JsonResult("Invalid Id"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut, Route("UpdateComment")]
        [Authorize (Roles ="User")]
        public IActionResult Update([FromBody]CommentDTO commentDTO)
        {
            try
            {
                Comment comment = _mapper.Map<Comment>(commentDTO);
                CommentService.UpdateComment(comment);
                return StatusCode(200, comment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete, Route("DeleteComment/{commentId}")]
        [Authorize(Roles = "User")]
        public IActionResult Delete(int commentId)
        {
            try
            {
                CommentService.DeleteComment(commentId);
                return StatusCode(200, new JsonResult($"Comment with Id {commentId} is Deleted"));
            }
            catch (Exception)
            {
                throw;
            }


        }
        [HttpPut, Route("ApproveComment/{commentId}")]
        [Authorize (Roles = "Admin")]
        public IActionResult ApproveComment(int commentId)
        {
            try
            {
                CommentService.ApproveComment(commentId);
                return StatusCode(200, new JsonResult($"Comment with Id {commentId} is Approved"));
            }
            catch (Exception)
            {
                throw new Exception("Comment is not found");
            }
        }
        [HttpPut, Route("DenyComment/{commentId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DenyComment(int commentId)
        {
            try
            {
                CommentService.DenyComment(commentId);
                return StatusCode(200, new JsonResult($"Comment with Id {commentId} is Denied"));
            }
            catch (Exception)
            {
                throw new Exception("Comment is not found");
            }
        }

    }
}
