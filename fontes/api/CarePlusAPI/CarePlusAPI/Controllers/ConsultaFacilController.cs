using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.ConsultaFacil;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [ExcludeFromCodeCoverage]
    public class ConsultaFacilController : ControllerBase
    {
        private readonly IConsultaFacilService _consultaFacilService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly ISeriLog _seriLog;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependencia
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="consultaFacilService">Serviço de Post para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public ConsultaFacilController(
            IConsultaFacilService consultaFacilService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            ISeriLog seriLog
            )
        {
            _consultaFacilService = consultaFacilService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _seriLog = seriLog;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todas Clinicas do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet]
        [Authorize(Roles = "Editor, Visualizador, Colaborador, Administrador")]
        public async Task<IActionResult> Get()
        {
            string origem = Request.Headers["Custom"];

            try
            {
                List<Clinica> result = await _consultaFacilService.Listar();

                List<ConsultaFacilModel> model = _mapper.Map<List<ConsultaFacilModel>>(result);

                return Ok(model);
            }
            catch (Exception ex)
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
        ///Esse método serve para buscar uma Clinica através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id da Clinica</param>        
        [HttpGet("{id}")]
        [Authorize(Roles = "Editor, Visualizador, Colaborador, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id da Clinica não pode ser igual a 0");

                Clinica result = await _consultaFacilService.BuscarPorId(id);

                ConsultaFacilModel model = _mapper.Map<ConsultaFacilModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
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
        ///Esse método serve para buscar Consultas através da data e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="data">Id do Post</param>
        [HttpGet("{data}")]
        [Authorize(Roles = "Editor, Visualizador, Colaborador, Administrador")]
        public async Task<IActionResult> GetByDate(DateTime data)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (string.IsNullOrWhiteSpace(data.ToString()))
                    throw new AppException("A data não pode ser null");

                List<Clinica> result = await _consultaFacilService.BuscarPorData(data);

                List<ConsultaFacilModel> model = _mapper.Map<List<ConsultaFacilModel>>(result);

                return Ok(model);
            }
            catch (Exception ex)
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
        ///Esse método serve para inserir uma clinica e seus horarios na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de um Post</param>
        [HttpPost]
        [Authorize(Roles = "Editor, Colaborador, Administrador")]
        public async Task<IActionResult> Post([FromForm] ConsultaFacilCreateModel model)
        {
            string origem = Request.Headers["Custom"];

            if (model == null)
                throw new AppException("Model não pode estar nulo");

            try
            {
                Clinica clinica = _mapper.Map<Clinica>(model);

                await _consultaFacilService.Criar(clinica);

                return Ok();
            }
            catch (Exception ex)
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
        ///Esse método serve para atualizar um Post na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="model">Model de atualização de um Post</param>
        [HttpPut]
        [Authorize(Roles = "Editor, Colaborador, Administrador")]
        public async Task<IActionResult> Put([FromForm] ConsultaFacilUpdateModel model)
        {
            string origem = Request.Headers["Custom"];

            if (model == null)
                throw new AppException("Model não pode estar nulo");

            try
            {
                Clinica clinica = await _consultaFacilService.BuscarPorId(model.Id.Value);

                clinica = _mapper.Map<Clinica>(model);

                await _consultaFacilService.Atualizar(clinica);

                return Ok();
            }
            catch (Exception ex)
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
        ///Esse método serve para excluir uma Clinica na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id da Clinica</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor, Colaborador, Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id da Clinica não pode ser igual a 0");

                Clinica clinica = await _consultaFacilService.BuscarPorId(id);

                await _consultaFacilService.Excluir(clinica.Id);

                return Ok();
            }
            catch (Exception ex)
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
