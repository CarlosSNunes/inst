using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Perfil;
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
    public class PerfilController : ControllerBase
    {
        private readonly IPerfilService _perfilService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly ISeriLog _seriLog;


        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependencia
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="perfilService">Serviço de perfil para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public PerfilController(
            IPerfilService perfilService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            ISeriLog seriLog
            )
        {
            _perfilService = perfilService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _seriLog = seriLog;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos perfis do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>       
        [HttpGet]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get()
        {
            string origem = Request.Headers["Custom"];

            try
            {
                List<Perfil> perfil = await _perfilService.Listar();

                List<PerfilModel> model = _mapper.Map<List<PerfilModel>>(perfil);

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
        ///Esse método serve para buscar um perfil através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do perfil</param>
        [HttpGet("{id}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id do perfil não pode ser igual a 0");

                Perfil perfil = await _perfilService.Buscar(id);

                PerfilModel model = _mapper.Map<PerfilModel>(perfil);

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
        ///Esse método serve para inserir perfis na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de perfis</param>
        [HttpPost]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post(List<PerfilCreateModel> models)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (models == null || !models.Any())
                    throw new AppException("Deve-se ter ao menos um perfil");

                List<Perfil> perfis = _mapper.Map<List<Perfil>>(models);

                await _perfilService.Criar(perfis);

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
        ///Esse método serve para atualizar perfis na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="model">Model de atualização de perfis</param>
        [HttpPut]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Put(List<PerfilUpdateModel> models)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (models == null || !models.Any())
                    throw new AppException("Deve-se ter ao menos um perfil");

                List<Perfil> perfis = _mapper.Map<List<Perfil>>(models);

                await _perfilService.Atualizar(perfis);

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
        ///Esse método serve para excluir um perfil na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do perfil</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id do perfil não pode ser igual a 0");

                await _perfilService.Excluir(id);

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
