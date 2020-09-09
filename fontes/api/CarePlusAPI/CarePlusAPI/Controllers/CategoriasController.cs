//===============================================================================
//Web API Categorias
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Categorias para uso do NEOCMS
//==============================================================================

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Models.Categorias;
using Neotix.Neocms.CarePlusAPI.Services;

namespace Neotix.Neocms.CarePlusAPI.Controllers {
    [Authorize]
    [ApiController]
    [Route ("[controller]")]
    public class CategoriasController : ControllerBase {
        private readonly ICategoriasService _categoriasService;
        private readonly IMapper _mapper;

        ///<summary>
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///</summary>
        ///<param name="categoriasService">Serviço de Categorias para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public CategoriasController (
            ICategoriasService categoriasService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        ) {
            _categoriasService = categoriasService;
            _mapper = mapper;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Categorias do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get () {
            List<Categoria> categorias = await _categoriasService.Listar ();

            List<CategoriasModel> model = _mapper.Map<List<CategoriasModel>> (categorias);

            return Ok (model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma Categorias através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id da Categorias</param>
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetById (int id) {
            if (id == 0)
                throw new AppException ("O id não pode ser igual a 0");

            Categoria categoria = await _categoriasService.Buscar (id);

            CategoriasModel model = _mapper.Map<CategoriasModel> (categoria);

            return Ok (model);
        }

        ///<summary>
        ///
        ///Esse método serve para inserir uma Categorias na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de uma Categorias</param>
        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] CategoriasCreateModel model) {
            if (model == null)
                throw new AppException ("A categoria não pode estar nula");

            try {
                Categoria categoria = _mapper.Map<Categoria> (model);

                await _categoriasService.Criar (categoria);

                return Ok ();
            } catch (System.Exception ex) {
                return BadRequest (new {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para atualizar um Categorias na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="model">Model de atualização de um Categorias</param>
        [HttpPut]
        public async Task<IActionResult> Put ([FromBody] CategoriasUpdateModel model) {
            if (model == null)
                throw new AppException ("A categoria não pode estar nula");

            try {
                Categoria categoria = await _categoriasService.Buscar (model.Id);

                categoria = _mapper.Map<Categoria> (model);

                await _categoriasService.Atualizar (categoria);

                return Ok ();
            } catch (System.Exception ex) {
                return BadRequest (new { message = ex.Message });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir uma Categorias na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do Categorias</param>
        [HttpDelete ("{id}")]
        public async Task<IActionResult> Delete (int id) {
            if (id == 0)
                throw new AppException ("O id não pode ser igual a 0");

            Categoria categoria = await _categoriasService.Buscar (id);

            await _categoriasService.Excluir (categoria.Id);

            return Ok ();
        }
    }
}