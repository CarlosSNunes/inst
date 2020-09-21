//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using AutoMapper;
using CarePlusHomolog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Models.FaleConosco;
using Neotix.Neocms.CarePlusAPI.Services;
using System.Threading.Tasks;

namespace Neotix.Neocms.CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FaleConoscoController : ControllerBase
    {
        private readonly IFaleConoscoService _faleConoscoService;
        private readonly IMapper _mapper;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="faleConoscoService">Serviço de Categorias para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public FaleConoscoController(
            IFaleConoscoService faleConoscoService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        )
        {
            _faleConoscoService = faleConoscoService;
            _mapper = mapper;
        }        

        ///<summary>
        ///
        ///Esse método serve para buscar o tipo de assunto fale conosco através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("tipo-assunto-fale-conosco")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetTipoAssuntoFaleConosco()
        {
            try
            {
                TipoAssuntoFaleConoscoModel obj = await _faleConoscoService.ListarTipoAssuntoFaleConosco();

                return Ok(obj);
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
        ///Esse método serve para buscar o assunto o ouvidoria através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("assunto-ouvidoria")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetAssuntoOuvidoria()
        {
            try
            {
                BuscarAssuntoOuvidoriaModel obj = await _faleConoscoService.BuscarAssuntoOuvidoria();

                return Ok(obj);
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
        ///Esse método serve para buscar a classificacao ouvidoria através do WS Partner       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("classificacao-ouvidoria")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetClassificacaoOuvidoria()
        {
            try
            {
                BuscarClassificacaoOuvidoriaModel obj = await _faleConoscoService.BuscarClassificacaoOuvidoria();

                return Ok(obj);
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
        ///Esse método serve para enviar informações de fale conosco ao WS Partner   
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação Fale conosco</param>
        [HttpPost("gravar-fale-conosco")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromForm] GravarFaleConoscoEntradaModel model)
        {
            if (model == null)
                throw new AppException("Model não pode estar nula");

            try
            {

                WSRetornoFaleConosco obj = await _faleConoscoService.GravarFaleConosco(model);

                return Ok(obj);
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
        ///Esse método serve para enviar informações do Canal de Denuncia ao WS Partner   
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação Fale conosco</param>
        [HttpPost("gravar-canal-de-denuncia")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromForm] GravarCanalDenunciaEntradaModel model)
        {
            if (model == null)
                throw new AppException("Model não pode estar nulo");

            try
            {

                WSRetornoCanalDenuncia obj = await _faleConoscoService.GravarCanalDenuncia(model);

                return Ok(obj);
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
        ///Esse método serve para enviar informações de Ouvidoria ao WS Partner   
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação Fale conosco</param>
        [HttpPost("gravar-ouvidoria")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromForm] GravarOuvidoriaEntradaModel model)
        {
            if (model == null)
                throw new AppException("Model não pode estar nulo");

            try
            {

                OuvidoriaOut obj = await _faleConoscoService.GravarOuvidoria(model);

                return Ok(obj);
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
