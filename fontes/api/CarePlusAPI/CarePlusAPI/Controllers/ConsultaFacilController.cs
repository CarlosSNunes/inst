//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Models.ConsultaFacil;
using Neotix.Neocms.CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Neotix.Neocms.CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ConsultaFacilController : ControllerBase
    {
        private readonly IConsultaFacilService _consultaFacilService;
        private readonly IMapper Mapper;
        private readonly AppSettings AppSettings;

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
            IOptions<AppSettings> appSettings)
        {
            _consultaFacilService = consultaFacilService;
            Mapper = mapper;
            AppSettings = appSettings.Value;
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
            List<Clinica> result = await _consultaFacilService.Listar();

            List<ConsultaFacilModel> model = Mapper.Map<List<ConsultaFacilModel>>(result);

            return Ok(model);
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
            if (id == 0)
                throw new AppException("O id da Clinica não pode ser igual a 0");

            Clinica result = await _consultaFacilService.BuscarPorId(id);

            ConsultaFacilModel model = Mapper.Map<ConsultaFacilModel>(result);

            return Ok(model);
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
            if (data.Equals(null))
                throw new AppException("A data não pode ser null");

            List<Clinica> result = await _consultaFacilService.BuscarPorData(data);

            List<ConsultaFacilModel> model = Mapper.Map<List<ConsultaFacilModel>>(result);

            return Ok(model);
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
            if (model == null)
                throw new AppException("Model não pode estar nulo");

            try
            {
                Clinica clinica = Mapper.Map<Clinica>(model);

                await _consultaFacilService.Criar(clinica);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
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
            if (model == null)
                throw new AppException("Model não pode estar nulo");

            try
            {
                Clinica clinica = await _consultaFacilService.BuscarPorId(model.Id.Value);

                clinica = Mapper.Map<Clinica>(model);

                await _consultaFacilService.Atualizar(clinica);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
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
            if (id == 0)
                throw new AppException("O id da Clinica não pode ser igual a 0");

            Clinica clinica = await _consultaFacilService.BuscarPorId(id);

            await _consultaFacilService.Excluir(clinica.Id);

            return Ok();
        }
    }
}
