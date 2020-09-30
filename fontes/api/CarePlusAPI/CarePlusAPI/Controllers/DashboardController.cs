
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CarePlusAPI.Entities;
using CarePlusAPI.Models.Post;
using CarePlusAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly IMapper _mapper;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="categoriasService">Serviço de Categorias para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>        
        public DashboardController(
            IDashboardService dashboardService,
            IMapper mapper
        )
        {
            _dashboardService = dashboardService;
            _mapper = mapper;
        }

        ///<summary>
        ///
        ///Esse método serve para listar os posts mais lidos e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("posts-mais-lidos")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Post> maisLidos = await _dashboardService.ListarPostsMaisLidos();

                List<PostModel> model = _mapper.Map<List<PostModel>>(maisLidos);

                return Ok(model);
            }
            catch (System.Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message
                });
            }

        }

        ///<summary>
        ///
        ///Esse método serve para retornar o numero de Banners ativos 
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("banner-ativo")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetBanners()
        {
            try
            {
                var banners = await _dashboardService.TotalBannersAtivos();

                return Ok(banners);
            }
            catch (System.Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message
                });
            }

        }

        ///<summary>
        ///
        ///Esse método serve para retornar o numero total de Posts Blog 
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("post-ativo")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetPosts()
        {
            try
            {
                var posts = await _dashboardService.TotalPostsBlog();

                return Ok(posts);
            }
            catch (System.Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message
                });
            }

        }

        ///<summary>
        ///
        ///Esse método serve para retornar o numero total de Usuários 
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("usuario-ativo")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetUsuarios()
        {
            try
            {
                var usuarios = await _dashboardService.TotalUsuarios();

                return Ok(usuarios);
            }
            catch (System.Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message
                });
            }

        }


    }
}
