using AutoMapper;

using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Banner;
using CarePlusAPI.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CarePlusAPI.Models.Categorias;
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
        [HttpGet("{page}/{pageSize}")]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get(int page, int pageSize)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var result = await _bannerService.Listar(page, pageSize);

                List<BannerModel> model = _mapper.Map<List<BannerModel>>(result.Item2);

                // Adicionando tratativa para devolver caminho da imagem com base na variável de ambiente.

                model.ForEach(item =>
                {
                    if (item.CaminhoDesktop != null)
                    {
                        item.CaminhoCompletoDesktop = $"{_appSettings.PathToGet}{item.CaminhoDesktop}";
                    }
                    else
                    {
                        item.CaminhoCompletoDesktop = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                    }

                    if (item.CaminhoMobile != null)
                    {
                        item.CaminhoCompletoMobile = $"{_appSettings.PathToGet}{item.CaminhoMobile}";
                    }
                    else
                    {
                        item.CaminhoCompletoMobile = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                    }
                });

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


                if (model.CaminhoDesktop != null)
                {
                    model.CaminhoCompletoDesktop = $"{_appSettings.PathToGet}{model.CaminhoDesktop}";
                }
                else
                {
                    model.CaminhoCompletoDesktop = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                }

                if (model.CaminhoMobile != null)
                {
                    model.CaminhoCompletoMobile = $"{_appSettings.PathToGet}{model.CaminhoMobile}";
                }
                else
                {
                    model.CaminhoCompletoMobile = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                }

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
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetByArea(string area)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (string.IsNullOrEmpty(area))
                    throw new AppException("O area não pode ser igual a null ou empty");

                List<Banner> banner = await _bannerService.BuscarPorArea(area);

                List<BannerModel> model = _mapper.Map<List<BannerModel>>(banner);
                model.ForEach(item =>
                {
                    if (item.CaminhoDesktop != null)
                    {
                        item.CaminhoCompletoDesktop = $"{_appSettings.PathToGet}{item.CaminhoDesktop}";
                    }
                    else
                    {
                        item.CaminhoCompletoDesktop = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                    }

                    if (item.CaminhoMobile != null)
                    {
                        item.CaminhoCompletoMobile = $"{_appSettings.PathToGet}{item.CaminhoMobile}";
                    }
                    else
                    {
                        item.CaminhoCompletoMobile = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
                    }
                });

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
        public async Task<IActionResult> Post(
            [FromForm] BannerCreateModel model,
            [FromHeader(Name = "Custom")] string? origem
            )
        {

            string fullPathDesk = string.Empty;
            string fullPathMobile = string.Empty;
            string directoryNameDesk = string.Empty;
            string directoryNameMobile = string.Empty;

            if (model == null) throw new AppException("O banner não pode estar nulo");
            try
            {
                var file = model.Arquivo;
                var fileMobile = model.ArquivoMobile;
                var fullRelativePath = _appSettings.PathToSave + "\\Banner";
                var stringArr = fullRelativePath.Split("\\");
                var folderName = Path.Combine(stringArr);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                var fileOriginalNameDesk = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                var fileOriginalNameMobile = ContentDispositionHeaderValue.Parse(fileMobile.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");

                directoryNameDesk = Path.Combine(pathToSave, fileOriginalNameDesk);
                directoryNameMobile = Path.Combine(pathToSave, fileOriginalNameMobile);

                await using (var stream = new FileStream(directoryNameDesk, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                await using (var stream = new FileStream(directoryNameMobile, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var extensionDesk = Path.GetExtension(directoryNameDesk).Replace("\"", " ").Trim().ToLower().Replace(" ", "_");

                var extensionMobile = Path.GetExtension(directoryNameMobile).Replace("\"", " ").Trim().ToLower().Replace(" ", "_");

                //Renomeando Arquivo Desktop
                var fileName = $"{UniqueHash.ReturnUniqueValue(System.DateTime.Now, fileOriginalNameDesk)}{extensionDesk}";
                var renamedDirectory = Path.Combine(pathToSave, fileName);
                System.IO.File.Move(directoryNameDesk, renamedDirectory);


                //Renomeando Arquivo Mobile
                var fileMobileName = $"{UniqueHash.ReturnUniqueValue(System.DateTime.Now, fileOriginalNameMobile)}{extensionMobile}";
                renamedDirectory = Path.Combine(pathToSave, fileMobileName);
                System.IO.File.Move(directoryNameMobile, renamedDirectory);


                fullPathDesk = $"{_appSettings.PathToGet}{_appSettings.VirtualPath}/Banner/{fileName}";
                fullPathMobile = $"{_appSettings.PathToGet}{_appSettings.VirtualPath}/Banner/{fileMobileName}";
                directoryNameDesk = $"{_appSettings.VirtualPath}/Banner/{fileName}";
                directoryNameMobile = $"{_appSettings.VirtualPath}/Banner/{fileMobileName}";

                model.NomeImagemDesktop = fileName;
                model.NomeImagemMobile = fileMobileName;
                model.CaminhoDesktop = $"{_appSettings.VirtualPath}/Banner/{fileName}";
                model.CaminhoMobile = $"{_appSettings.VirtualPath}/Banner/{fileMobileName}";
                model.TempoExibicao = model.TempoExibicao <= 0 ? 10 : model.TempoExibicao;
                Banner banner = _mapper.Map<Banner>(model);
                await _bannerService.Criar(banner);

               

                return Ok(new
                {
                    directoryNameDesk,
                    directoryNameMobile,
                    fullPathDesk,
                    fullPathMobile
                });
            }
            catch (System.Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                if (System.IO.File.Exists(directoryNameDesk))
                    System.IO.File.Delete(directoryNameDesk);

                if (System.IO.File.Exists(directoryNameMobile))
                    System.IO.File.Delete(directoryNameMobile);
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
            var arquivo = model.Arquivo;

            var arquivoMobile = model.ArquivoMobile;

            try
            {
                Banner banner = await _bannerService.Buscar(model.Id.Value);

                if (model.Arquivo != null && model.ArquivoMobile != null)
                {
                    if (System.IO.File.Exists(banner.CaminhoDesktop))
                        System.IO.File.Delete(banner.CaminhoDesktop);

                    if (System.IO.File.Exists(banner.CaminhoMobile))
                        System.IO.File.Delete(banner.CaminhoMobile);

                    var desktop = await _bannerService.SalvaImagem(bannerPath, arquivo);
                    var fileName = desktop.Item1;
                    bannerPath = desktop.Item2;
                    model.NomeImagemDesktop = fileName;
                    model.CaminhoDesktop = bannerPath + fileName;
                    //model.CaminhoDesktop = bannerPath.Replace(_appSettings.PathToSave, _appSettings.PathToGet);

                    var mobile = await _bannerService.SalvaImagem(bannerPath, arquivoMobile);
                    bannerPath = mobile.Item2;
                    model.NomeImagemMobile = fileName;
                    model.CaminhoMobile = bannerPath + fileName;
                    //model.CaminhoMobile = bannerPath.Replace(_appSettings.PathToSaveMobile, _appSettings.PathToGetMobile);


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

                if (System.IO.File.Exists(bannerPath))
                    System.IO.File.Delete(bannerPath);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para duplicar um Banner na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Banner</param>
        [HttpGet("duplicar/{id}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Duplicate(
            int id,
            [FromHeader(Name = "Custom")] string? origem
            )
        {
            try
            {
                if (id == 0)
                    throw new AppException("O id do Banner não pode estar vazio");

                Banner banner = await _bannerService.Buscar(id);

                var newBanner = new BannerCreateModel
                        {
                        Titulo = $"[Duplicado] - {banner.Titulo}",
                        Subtitulo = banner.Subtitulo,
                        Area = banner.Area,
                        TempoExibicao = banner.TempoExibicao,
                        Descricao = banner.Descricao,
                        Rota = banner.Rota,
                        LinkExterno = banner.LinkExterno,
                        Link = banner.Link,
                        Ativo = "0".ToCharArray()[0],
                        CaminhoDesktop = banner.CaminhoDesktop,
                        NomeLink = banner.NomeLink,
                        NomeImagemDesktop = banner.NomeImagemDesktop,
                        CaminhoMobile = banner.CaminhoMobile,
                        NomeImagemMobile = banner.NomeImagemMobile
                };

                var bannerToCreate = _mapper.Map<Banner>(newBanner);
                await _bannerService.Criar(bannerToCreate);

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
