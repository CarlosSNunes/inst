using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Tag;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly SeriLog _seriLog;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependencia
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="tagService">Serviço de tag para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public TagController(
            ITagService tagService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        )
        {
            _tagService = tagService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _seriLog = new SeriLog(appSettings);
        }

        ///<summary>
        ///
        ///Esse método serve para listar todas tags do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("{page}/{pageSize}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get(int page, int pageSize)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                var result = await _tagService.Listar(page, pageSize);

                List<TagModel> model = _mapper.Map<List<TagModel>>(result.Item2);

                return Ok(new
                {
                    count = result.Item1,
                    result = model
                });
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
        ///Esse método serve para buscar uma tag através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="Id">Id da tag</param>
        [HttpGet("{id}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id da tag não pode ser igual a 0");

                Tag result = await _tagService.Buscar(id);

                TagModel model = _mapper.Map<TagModel>(result);

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
        ///Esse método serve para inserir tags na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="models">Models de criação das tags</param>
        [HttpPost]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post(List<TagCreateModel> models)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (models == null || !models.Any())
                    throw new AppException("Deve-se ter ao menos um tag");

                List<Tag> tags = _mapper.Map<List<Tag>>(models);

                await _tagService.Criar(tags);

                return Ok();
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
        ///Esse método serve para atualizar tags na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="models">Models de atualização das tags</param>
        [HttpPut]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Put(List<TagUpdateModel> models)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (models == null || !models.Any())
                    throw new AppException("Deve-se ter ao menos um tag");

                List<Tag> tags = _mapper.Map<List<Tag>>(models);

                await _tagService.Atualizar(tags);

                return Ok();
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
        ///Esse método serve para excluir uma tag na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id da tag</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id da tag não pode ser igual a 0");

                await _tagService.Excluir(id);

                return Ok();
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
