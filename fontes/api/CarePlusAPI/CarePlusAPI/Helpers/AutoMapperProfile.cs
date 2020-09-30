
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Models.Banner;
using CarePlusAPI.Models.Categorias;
using CarePlusAPI.Models.ConsultaFacil;
using CarePlusAPI.Models.Newsletter;
using CarePlusAPI.Models.Perfil;
using CarePlusAPI.Models.Post;
using CarePlusAPI.Models.PostTag;
using CarePlusAPI.Models.Tag;
using CarePlusAPI.Models.Usuario;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public class AutoMapperProfile : Profile
    {
        ///<summary>
        ///
        ///Esse método serve para mapear os objetos de entidades com suas models
        ///
        ///</summary>
        public AutoMapperProfile()
        {
            CreateMap<Usuario, UsuarioModel>()
            .ForMember(d => d.UsuarioPerfil,
                opt => opt.MapFrom(src => src.UsuarioPerfil.Select(p => p.Perfil))
            );
            CreateMap<UsuarioCreateModel, Usuario>();
            CreateMap<UsuarioUpdateModel, Usuario>();

            CreateMap<Perfil, PerfilModel>();
            CreateMap<PerfilCreateModel, UsuarioPerfil>();
            CreateMap<PerfilUpdateModel, UsuarioPerfil>();

            //Perfil
            CreateMap<PerfilCreateModel, Perfil>();
            CreateMap<PerfilUpdateModel, Perfil>();
            CreateMap<Perfil, PerfilModel>();

            //Banner
            CreateMap<BannerUpdateModel, Banner>();
            CreateMap<BannerCreateModel, Banner>();
            CreateMap<Banner, BannerModel>();

            //Categorias
            CreateMap<CategoriasUpdateModel, Categoria>();
            CreateMap<CategoriasCreateModel, Categoria>();
            CreateMap<Categoria, CategoriasModel>();

            //Tag
            CreateMap<TagUpdateModel, Tag>();
            CreateMap<TagCreateModel, Tag>();
            CreateMap<Tag, TagModel>();

            //Newsletter
            CreateMap<NewsletterUpdateModel, Newsletter>();
            CreateMap<NewsletterCreateModel, Newsletter>();
            CreateMap<Newsletter, NewsletterModel>();

            //Post
            CreateMap<PostUpdateModel, Post>();
            CreateMap<PostCreateModel, Post>();
            CreateMap<Post, PostModel>()
            .ForMember(d => d.PostTag, opt =>
            {
                opt.MapFrom(src => src.PostTag.Select(p => p.Tag));
            })
            .ForMember(c => c.Categoria, opt =>
            {
                opt.MapFrom(src => src.Categoria.Titulo);
            });

            CreateMap<Categoria, CategoriasModel>().ReverseMap();
            CreateMap<Tag, TagModel>().ReverseMap();

            CreateMap<PostTagUpdateModel, PostTag>();
            CreateMap<PostTagCreateModel, PostTag>();

            //ConsultaFacil
            CreateMap<ConsultaFacilUpdateModel, Clinica>();
            CreateMap<ConsultaFacilCreateModel, Clinica>();
            CreateMap<Clinica, ConsultaFacilModel>()
            .ForMember(e => e.EnderecoClinica, opt =>
            {
                opt.MapFrom(src => src.EnderecoClinica);
            })
            .ForMember(h => h.HorarioClinica, opt =>
            {
                opt.MapFrom(src => src.HorarioClinica);
            });
        }
    }
}