using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Banner;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinifyAPI;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BannerController : ControllerBase
    {
        private readonly IBannerService _bannerService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly SeriLog _seriLog;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependência
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="bannerService">Serviço de Banner para consumo do banco de dados</param>
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
            _seriLog = new SeriLog(appSettings);
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Banners do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet]
        [AllowAnonymous]
        //[Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get()
        {
            string origem = Request.Headers["Custom"];
            try
            {
                List<Banner> banners = await _bannerService.Listar();

                List<BannerModel> model = _mapper.Map<List<BannerModel>>(banners);

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
        ///Esse método serve para buscar um Banner através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Banner</param>
        [HttpGet("{id}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (id == 0)
                    throw new AppException("O id não pode ser igual a 0");

                Banner banner = await _bannerService.Buscar(id);

                BannerModel model = _mapper.Map<BannerModel>(banner);

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
        ///Esse método serve para buscar um Banner através da Area e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="area">Id do Banner</param>
        [HttpGet("getByArea/{area}")]
        [AllowAnonymous]
        //[Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetByArea(string area)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (string.IsNullOrEmpty(area))
                    throw new AppException("O area não pode ser igual a null ou empty");

                List<Banner> banner = await _bannerService.BuscarPorArea(area);

                List<BannerModel> model = _mapper.Map<List<BannerModel>>(banner);

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
        ///Esse método serve para inserir um Banner na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de um Banner</param>
        [HttpPost]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromForm] BannerCreateModel model)
        {
            string origem = Request.Headers["Custom"];

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
                var bannerPath = "Src/Images/Banner/";

                var desktop = await _bannerService.SalvaImagem(_appSettings.PathToSave + bannerPath, Arquivo);

                fileName = desktop.Item1;
                path = desktop.Item2;
                model.NomeImagemDesktop = fileName;
                model.CaminhoDesktop = bannerPath + fileName;
                
                var mobile = await _bannerService.SalvaImagem(_appSettings.PathToSave + bannerPath, ArquivoMobile);
                directoryNameMobile = mobile.Item1;
                pathMobile = mobile.Item2;
                model.NomeImagemMobile = fileName;
                model.CaminhoMobile = bannerPath + fileName;


                model.TempoExibicao = model.TempoExibicao <= 0 ? 10 : model.TempoExibicao;

                Banner banner = _mapper.Map<Banner>(model);

                await _bannerService.Criar(banner);

                return Ok();
            }
            catch (System.Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

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
        ///Esse método serve para atualizar um Banner na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="model">Model de atualização de um Banner</param>
        [HttpPut]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Put([FromForm] BannerUpdateModel model)
        {
            string origem = Request.Headers["Custom"];

            if (model == null)
                throw new AppException("O Banner não pode estar nulo");

            var bannerPath = "Src/Images/Banner/";
            var Arquivo = model.Arquivo;

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
                    bannerPath = desktop.Item2;
                    model.NomeImagemDesktop = fileName;
                    model.CaminhoDesktop = bannerPath + fileName;
                    //model.CaminhoDesktop = bannerPath.Replace(_appSettings.PathToSave, _appSettings.PathToGet);

                    var mobile = await _bannerService.SalvaImagem(_appSettings.PathToSaveMobile, model.ArquivoMobile);
                    directoryNameMobile = mobile.Item1;
                    bannerPath = mobile.Item2;
                    model.NomeImagemMobile = fileName;
                    model.CaminhoMobile = bannerPath + fileName;
                    //model.CaminhoMobile = bannerPath.Replace(_appSettings.PathToSaveMobile, _appSettings.PathToGetMobile);


                    model.CaminhoDesktop = bannerPath.Replace(_appSettings.PathToSave, _appSettings.PathToGet);
                    model.CaminhoMobile = bannerPath.Replace(_appSettings.PathToSaveMobile, _appSettings.PathToGetMobile);
                }
                else
                {
                    model.CaminhoDesktop = banner.CaminhoDesktop;
                    model.CaminhoMobile = banner.CaminhoMobile;
                    model.NomeImagemDesktop = banner.NomeImagemDesktop;
                    model.NomeImagemMobile = banner.NomeImagemMobile;
                }

                await _bannerService.Atualizar(banner);

                return Ok();
            }
            catch (System.Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                if (System.IO.File.Exists(path))
                    System.IO.File.Delete(path);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um Banner na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do Banner</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id não pode ser igual a 0");

                try
                {
                    Banner banner = await _bannerService.Buscar(id);

                    if (System.IO.File.Exists(banner.CaminhoDesktop))
                        System.IO.File.Delete(banner.CaminhoDesktop);

                    if (System.IO.File.Exists(banner.CaminhoMobile))
                        System.IO.File.Delete(banner.CaminhoMobile);
                }
                catch (Exception ex)
                {

                    throw ex;
                }

                await _bannerService.Excluir(id);

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
