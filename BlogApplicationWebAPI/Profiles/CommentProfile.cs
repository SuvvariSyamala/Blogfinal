using AutoMapper;
using BlogApplicationWebAPI.DTO;
using BlogApplicationWebAPI.Entitys;

namespace BlogApplicationWebAPI.Profiles
{
    public class CommentProfile :Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDTO>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.CommentendUser.UserName))
.ForMember(dest => dest.PostTitle, opt => opt.MapFrom(src => src.Post.PostTitle));
            CreateMap<CommentDTO, Comment>();

        }

    }
}
