using AutoMapper;
using BlogApplicationWebAPI.DTO;
using BlogApplicationWebAPI.Entitys;

namespace BlogApplicationWebAPI.Profiles
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<Post, PostDTO>()
            .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.PostedUser.UserName))
.ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Categorynew.CategoryName));
            CreateMap<PostDTO, Post>();
        }

    }
}
