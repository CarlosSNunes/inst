using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Post;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
        private readonly ISeriLog _seriLog;
        private readonly AppSettings _appSettings;

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
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            ISeriLog seriLog
        )
        {
            _dashboardService = dashboardService;
            _mapper = mapper;
            _seriLog = seriLog;
            _appSettings = appSettings.Value;
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
            string origem = Request.Headers["Custom"];

            try
            {
                List<Post> maisLidos = await _dashboardService.ListarPostsMaisLidos();

                List<PostModel> model = _mapper.Map<List<PostModel>>(maisLidos);

                // Adicionando tratativa para devolver caminho da imagem com base na variável de ambiente.
                model.ForEach(item =>
                {
                    if (item.CaminhoImagem != null)
                    {
                        item.CaminhoCompleto = $"{_appSettings.PathToGet}{item.CaminhoImagem}";
                    }
                    else
                    {
                        item.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                    }
                });

                return Ok(model);
            }
            catch (System.Exception ex)
            {

                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
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
            string origem = Request.Headers["Custom"];

            try
            {
                var banners = await _dashboardService.TotalBannersAtivos();

                return Ok(banners);
            }
            catch (System.Exception ex)
            {

                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
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
            string origem = Request.Headers["Custom"];

            try
            {
                var posts = await _dashboardService.TotalPostsBlog();

                return Ok(posts);
            }
            catch (System.Exception ex)
            {

                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
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
            string origem = Request.Headers["Custom"];

            try
            {
                var usuarios = await _dashboardService.TotalUsuarios();

                return Ok(usuarios);
            }
            catch (System.Exception ex)
            {

                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }
    }
}
