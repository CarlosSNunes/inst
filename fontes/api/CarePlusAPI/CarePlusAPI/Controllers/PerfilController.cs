//===============================================================================
//Web API Perfil
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Perfil para uso do NEOCMS
//==============================================================================

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Neotix.Neocms.CarePlusAPI.Services;
using AutoMapper;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Models.Perfil;
using System.Linq;

namespace Neotix.Neocms.CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PerfilController : ControllerBase
    {
        private readonly IPerfilService PerfilService;
        private readonly IMapper Mapper;
        private readonly AppSettings AppSettings;

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
            IOptions<AppSettings> appSettings)
        {
            PerfilService = perfilService;
            Mapper = mapper;
            AppSettings = appSettings.Value;
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
            List<Perfil> perfil = await PerfilService.Listar();

            List<PerfilModel> model = Mapper.Map<List<PerfilModel>>(perfil);

            return Ok(model);
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
            if (id == 0)
                throw new AppException("O id do perfil não pode ser igual a 0");

            Perfil perfil = await PerfilService.Buscar(id);

            PerfilModel model = Mapper.Map<PerfilModel>(perfil);

            return Ok(model);
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
            if (models == null || !models.Any())
                throw new AppException("Deve-se ter ao menos um perfil");

            List<Perfil> perfis = Mapper.Map<List<Perfil>>(models);

            await PerfilService.Criar(perfis);

            return Ok();
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
            if (models == null || !models.Any())
                throw new AppException("Deve-se ter ao menos um perfil");

            List<Perfil> perfis = Mapper.Map<List<Perfil>>(models);

            await PerfilService.Atualizar(perfis);

            return Ok();
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
            if (id == 0)
                throw new AppException("O id do perfil não pode ser igual a 0");

            await PerfilService.Excluir(id);

            return Ok();
        }
    }
}
