using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Categorias;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriasService _categoriasService;
        private readonly IMapper _mapper;
        private readonly SeriLog _seriLog;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="categoriasService">Serviço de Categorias para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public CategoriasController(
            ICategoriasService categoriasService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        )
        {
            _categoriasService = categoriasService;
            _mapper = mapper;
            _seriLog = new SeriLog(appSettings);
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Categorias do banco de dados e
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
                var result = await _categoriasService.Listar(page, pageSize);

                List<CategoriasModel> model = _mapper.Map<List<CategoriasModel>>(result.Item2);

                return Ok(new
                {
                    count = result.Item1,
                    result = model
                });
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma Categorias através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id da Categorias</param>
        [HttpGet("{id}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (id == 0)
                    throw new AppException("O id não pode ser igual a 0");

                Categoria categoria = await _categoriasService.Buscar(id);

                CategoriasModel model = _mapper.Map<CategoriasModel>(categoria);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
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
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromBody] CategoriasCreateModel model)
        {
            string origem = Request.Headers["Custom"];
            if (model == null)
                throw new AppException("A categoria não pode estar nula");

            try
            {
                Categoria categoria = _mapper.Map<Categoria>(model);

                await _categoriasService.Criar(categoria);

                return Ok();
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
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
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Put([FromBody] CategoriasUpdateModel model)
        {
            string origem = Request.Headers["Custom"];

            if (model == null)
                throw new AppException("A categoria não pode estar nula");

            try
            {

                Categoria categoria = await _categoriasService.Buscar(model.Id);

                categoria = _mapper.Map<Categoria>(model);

                await _categoriasService.Atualizar(categoria);

                return Ok();
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir uma Categorias na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do Categorias</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (id == 0)
                    throw new AppException("O id não pode ser igual a 0");

                Categoria categoria = await _categoriasService.Buscar(id);

                await _categoriasService.Excluir(categoria.Id);

                return Ok();

            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }
    }
}
