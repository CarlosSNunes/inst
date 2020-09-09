//===============================================================================
//Web API Banner
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Banner para uso do NEOCMS
//==============================================================================

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Models.Banner;
using Neotix.Neocms.CarePlusAPI.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using TinifyAPI;
using Microsoft.AspNetCore.Http;

namespace Neotix.Neocms.CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BannerController : ControllerBase
    {
        private readonly IBannerService _bannerService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="bannerService">Serviço de homeBanner para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public BannerController(
            IBannerService bannerService,
            IMapper mapper,
            IOptions<AppSettings> appSettings
        )
        {
            _bannerService = bannerService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            Tinify.Key = _appSettings.TinyPngKey;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos homeBanners do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Banner> banners = await _bannerService.Listar();

            List<BannerModel> model = _mapper.Map<List<BannerModel>>(banners);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um homeBanner através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do homeBanner</param>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Banner banner = await _bannerService.Buscar(id);

            BannerModel model = _mapper.Map<BannerModel>(banner);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um homeBanner através da Area e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="area">Id do homeBanner</param>
        [HttpGet("getByArea/{area}")]
        public async Task<IActionResult> GetByArea(string area, int offset, int limit)
        {
            if (string.IsNullOrEmpty(area))
                throw new AppException("O area não pode ser igual a null ou empty");

            List<Banner> banner = await _bannerService.BuscarPorArea(area, offset, limit);

            List<BannerModel> model = _mapper.Map<List<BannerModel>>(banner);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para inserir um homeBanner na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de um homeBanner</param>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] BannerCreateModel model)
        {
            if (model == null)
                throw new AppException("O banner não pode estar nulo");

            string path = "";
            var Arquivo = model.Arquivo;

            string pathMobile = ""; 
            string directoryNameMobile;
            var ArquivoMobile = model.ArquivoMobile;

            string fileName = string.Empty;

            try
            {
                var desktop = await _bannerService.SalvaImagem(_appSettings.PathToSave, Arquivo);
                fileName = desktop.Item1;
                path = desktop.Item2;
                model.NomeImagemDesktop = fileName;
                model.CaminhoDesktop = path.Replace(_appSettings.PathToSave, _appSettings.PathToGet);

                var mobile = await _bannerService.SalvaImagem(_appSettings.PathToSaveMobile, ArquivoMobile);
                directoryNameMobile = mobile.Item1;
                pathMobile = mobile.Item2;
                model.NomeImagemMobile = fileName;
                model.CaminhoMobile = pathMobile.Replace(_appSettings.PathToSaveMobile, _appSettings.PathToGetMobile);

               
                model.TempoExibicao = model.TempoExibicao <= 0 ? 10 : model.TempoExibicao;

                Banner banner = _mapper.Map<Banner>(model);

                await _bannerService.Criar(banner);

                return Ok();
            }
            catch (System.Exception ex)
            {
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para atualizar um homeBanner na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="model">Model de atualização de um homeBanner</param>
        [HttpPut]
        public async Task<IActionResult> Put([FromForm] BannerUpdateModel model)
        {
            if (model == null)
                throw new AppException("O homeBanner não pode estar nulo");           
            
            string path = "";
            var Arquivo = model.Arquivo;

            string pathMobile = "";
            string directoryNameMobile;
            var ArquivoMobile = model.ArquivoMobile;

            string fileName = string.Empty;

            try
            {
                Banner banner = await _bannerService.Buscar(model.Id.Value);

                if (model.Arquivo != null && model.ArquivoMobile != null)
                {
                    if (System.IO.File.Exists(banner.CaminhoDesktop))
                        System.IO.File.Delete(banner.CaminhoDesktop);

                    if (System.IO.File.Exists(banner.CaminhoMobile))
                        System.IO.File.Delete(banner.CaminhoMobile);

                    var desktop = await _bannerService.SalvaImagem(_appSettings.PathToSave, model.Arquivo);
                    fileName = desktop.Item1;
                    path = desktop.Item2;
                    model.NomeImagemDesktop = fileName;
                    model.CaminhoDesktop = path.Replace(_appSettings.PathToSave, _appSettings.PathToGet);

                    var mobile = await _bannerService.SalvaImagem(_appSettings.PathToSaveMobile, model.ArquivoMobile);
                    directoryNameMobile = mobile.Item1;
                    pathMobile = mobile.Item2;
                    model.NomeImagemMobile = fileName;
                    model.CaminhoMobile = pathMobile.Replace(_appSettings.PathToSaveMobile, _appSettings.PathToGetMobile);

                    
                    model.CaminhoDesktop = path.Replace(_appSettings.PathToSave, _appSettings.PathToGet);
                    model.CaminhoMobile = path.Replace(_appSettings.PathToSaveMobile, _appSettings.PathToGetMobile);
                }
                else
                {
                    model.CaminhoDesktop = banner.CaminhoDesktop;
                    model.CaminhoMobile = banner.CaminhoMobile;
                    model.NomeImagemDesktop = banner.NomeImagemDesktop;
                    model.NomeImagemMobile = banner.NomeImagemMobile;
                }

                banner = _mapper.Map<Banner>(model);

                await _bannerService.Atualizar(banner);

                return Ok();
            }
            catch (System.Exception ex)
            {
                if (System.IO.File.Exists(path))
                    System.IO.File.Delete(path);

                return BadRequest(new { message = ex.Message });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um homeBanner na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do homeBanner</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Banner banner = await _bannerService.Buscar(id);

            //if (System.IO.File.Exists(banner.CaminhoImagem))
            //    System.IO.File.Delete(banner.CaminhoImagem);

            if (System.IO.File.Exists(banner.CaminhoDesktop))
                System.IO.File.Delete(banner.CaminhoDesktop);

            if (System.IO.File.Exists(banner.CaminhoMobile))
                System.IO.File.Delete(banner.CaminhoMobile);

            await _bannerService.Excluir(id);

            return Ok();
        }
    }
}
