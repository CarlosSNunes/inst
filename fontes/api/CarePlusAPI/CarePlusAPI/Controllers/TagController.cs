//===============================================================================
//Web API Tag
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Tag para uso do NEOCMS
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
using Neotix.Neocms.CarePlusAPI.Models.Tag;
using System.Linq;

namespace Neotix.Neocms.CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TagController : ControllerBase
    {
        private readonly ITagService TagService;
        private readonly IMapper Mapper;
        private readonly AppSettings AppSettings;

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
            TagService = tagService;
            Mapper = mapper;
            AppSettings = appSettings.Value;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todas tags do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get()
        {
            List<Tag> result = await TagService.Listar();

            List<TagModel> model = Mapper.Map<List<TagModel>>(result);

            return Ok(model);
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
            if (id == 0)
                throw new AppException("O id da tag não pode ser igual a 0");

            Tag result = await TagService.Buscar(id);

            TagModel model = Mapper.Map<TagModel>(result);

            return Ok(model);
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
            if (models == null || !models.Any())
                throw new AppException("Deve-se ter ao menos um tag");

            List<Tag> tags = Mapper.Map<List<Tag>>(models);

            await TagService.Criar(tags);

            return Ok();
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
            if (models == null || !models.Any())
                throw new AppException("Deve-se ter ao menos um tag");

            List<Tag> tags = Mapper.Map<List<Tag>>(models);

            await TagService.Atualizar(tags);

            return Ok();
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
            if (id == 0)
                throw new AppException("O id da tag não pode ser igual a 0");

            await TagService.Excluir(id);

            return Ok();
        }
    }
}
