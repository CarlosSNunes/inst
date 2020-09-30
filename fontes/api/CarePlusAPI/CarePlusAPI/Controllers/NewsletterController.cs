

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Newsletter;
using CarePlusAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterService _newsletterService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="newsletterService">Serviço de Newsletter para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public NewsletterController(
            INewsletterService newsletterService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        )
        {
            _newsletterService = newsletterService;
            _mapper = mapper;
            _appSettings = appSettings.Value;            
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Newsletter do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get()
        {
            List<Newsletter> newsletter = await _newsletterService.Listar();

            List<NewsletterModel> model = _mapper.Map<List<NewsletterModel>>(newsletter);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma Newsletter através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id da Newsletter</param>
        [HttpGet("{id}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Newsletter newsletter = await _newsletterService.Buscar(id);

            NewsletterModel model = _mapper.Map<NewsletterModel>(newsletter);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para inserir uma Newsletter na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de uma Newsletter</param>
        [HttpPost]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromBody] NewsletterCreateModel model)
        {
            if (model == null)
                throw new AppException("A newsletter não pode estar nula");

            try
            {
                Newsletter newsletter = _mapper.Map<Newsletter>(model);

                await _newsletterService.Criar(newsletter);

                return Ok();
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
        ///Esse método serve para atualizar um Newsletter na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="model">Model de atualização de um Newsletter</param>
        [HttpPut]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Put([FromBody] NewsletterUpdateModel model)
        {
            if (model == null)
                throw new AppException("A newsletter não pode estar nula");
           
            try
            {
                Newsletter newsletter = await _newsletterService.Buscar(model.Id);

                newsletter = _mapper.Map<Newsletter>(model);

                await _newsletterService.Atualizar(newsletter);

                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir uma Newsletter na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do Newsletter</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Newsletter newsletter = await _newsletterService.Buscar(id);

            await _newsletterService.Excluir(newsletter.Id);

            return Ok();
        }
    }
}
