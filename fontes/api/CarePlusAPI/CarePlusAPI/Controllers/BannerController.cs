using AutoMapper;
using System;
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
        private readonly ISeriLog _seriLog;
        private readonly IFtpUpload _ftpUpload;

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
            IOptions<AppSettings> appSettings,
            ISeriLog seriLog,
            IFtpUpload ftpUpload
        )
        {
            _bannerService = bannerService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _seriLog = seriLog;
            _ftpUpload = ftpUpload;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Banners do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("{page}/{pageSize}")]
        [Authorize(Roles = "Visualizador, Editor, Administrador")]
        public async Task<IActionResult> Get(
            int page, 
            int pageSize,
            [FromQuery(Name = "ativo")] char? ativo,
            [FromQuery(Name = "area")] string? area
            )
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var result = await _bannerService.Listar(page, pageSize, ativo, area);

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
        [Authorize(Roles = "Visualizador, Editor, Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];

            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            try
            {

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

                    // Transformando os segundos em millisegundos
                    item.TempoExibicao = item.TempoExibicao * 1000;
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
            string renamedDirectoryDesktop = string.Empty;
            string renamedDirectoryMobile = string.Empty;

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
                var fileOriginalNameMobile = $"mobile-{ContentDispositionHeaderValue.Parse(fileMobile.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_")}";

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
                renamedDirectoryDesktop = Path.Combine(pathToSave, fileName);
                System.IO.File.Move(directoryNameDesk, renamedDirectoryDesktop);


                //Renomeando Arquivo Mobile
                var fileMobileName = $"{UniqueHash.ReturnUniqueValue(System.DateTime.Now, fileOriginalNameMobile)}{extensionMobile}";
                renamedDirectoryMobile = Path.Combine(pathToSave, fileMobileName);
                System.IO.File.Move(directoryNameMobile, renamedDirectoryMobile);

                // Sobe o arquivo via FTP e depois deleta o mesmo da maquina local.
                if (_appSettings.HasAssetsServer == true)
                {
                    _ftpUpload.Upload(renamedDirectoryDesktop, "Src/Images/Banner", fileName);
                    _ftpUpload.Upload(renamedDirectoryMobile, "Src/Images/Banner", fileMobileName);
                }

                // Caminho completo no desktop e no mobile
                fullPathDesk = $"{_appSettings.PathToGet}{_appSettings.VirtualPath}/Banner/{fileName}";
                fullPathMobile = $"{_appSettings.PathToGet}{_appSettings.VirtualPath}/Banner/{fileMobileName}";

                // Caminho relativo no desktop e no mobile
                directoryNameDesk = $"{_appSettings.VirtualPath}/Banner/{fileName}";
                directoryNameMobile = $"{_appSettings.VirtualPath}/Banner/{fileMobileName}";

                // Salvando informações sobre os caminhos na model
                model.NomeImagemDesktop = fileName;
                model.NomeImagemMobile = fileMobileName;
                model.CaminhoDesktop = directoryNameDesk;
                model.CaminhoMobile = directoryNameMobile;

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

                if (System.IO.File.Exists(renamedDirectoryDesktop))
                    System.IO.File.Delete(renamedDirectoryDesktop);

                if (System.IO.File.Exists(renamedDirectoryMobile))
                    System.IO.File.Delete(renamedDirectoryMobile);
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
            bool reorderBanners = false;
            bool activeChanged = false;
            string fullPathDesk = string.Empty;
            string fullPathMobile = string.Empty;
            string directoryNameDesk = string.Empty;
            string directoryNameMobile = string.Empty;
            string origem = Request.Headers["Custom"];
            string renamedDirectoryDesktop = string.Empty;
            string renamedDirectoryMobile = string.Empty;

            if (model == null)
                throw new AppException("O Banner não pode estar nulo");

            string fileName = string.Empty;
            string fileNameMobile = string.Empty;
            try
            {

                Banner banner = await _bannerService.Buscar((int)model.Id);

                if (model.Arquivo != null)
                {

                    var file = model.Arquivo;
                    var fileMobile = model.ArquivoMobile;
                    var fullRelativePath = _appSettings.PathToSave + "\\Banner";
                    var stringArr = fullRelativePath.Split("\\");
                    var folderName = Path.Combine(stringArr);
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);



                    if(file.Length > 0){
                        var fileOriginalNameDesk = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                        directoryNameDesk = Path.Combine(pathToSave, fileOriginalNameDesk);
                        await using (var stream = new FileStream(directoryNameDesk, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        var extensionDesk = Path.GetExtension(directoryNameDesk).Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                        //Renomeando Arquivo Desktop
                        fileName = $"{UniqueHash.ReturnUniqueValue(System.DateTime.Now, fileOriginalNameDesk)}{extensionDesk}";
                        renamedDirectoryDesktop = Path.Combine(pathToSave, fileName);
                        System.IO.File.Move(directoryNameDesk, renamedDirectoryDesktop);

                        // Sobe o arquivo via FTP e depois deleta o mesmo da maquina local.
                        if (_appSettings.HasAssetsServer == true)
                        {
                            _ftpUpload.Upload(renamedDirectoryDesktop, "Src/Images/Banner", fileName);
                        }
                    }
                    
                    if(fileMobile
                        .Length > 0)
                    {
                        var fileOriginalNameMobile = $"mobile-{ContentDispositionHeaderValue.Parse(fileMobile.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_")}";
                        directoryNameMobile = Path.Combine(pathToSave, fileOriginalNameMobile);
                        await using (var stream = new FileStream(directoryNameMobile, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        var extensionMobile = Path.GetExtension(directoryNameMobile).Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                        //Renomeando Arquivo Mobile
                        fileNameMobile = $"{UniqueHash.ReturnUniqueValue(System.DateTime.Now, fileOriginalNameMobile)}{extensionMobile}";
                        renamedDirectoryMobile = Path.Combine(pathToSave, fileNameMobile);
                        System.IO.File.Move(directoryNameMobile, renamedDirectoryMobile);

                        // Sobe o arquivo via FTP e depois deleta o mesmo da maquina local.
                        if (_appSettings.HasAssetsServer == true)
                        {
                            _ftpUpload.Upload(renamedDirectoryMobile, "Src/Images/Banner", fileNameMobile);
                        }
                    }
                    fullPathDesk = $"{_appSettings.PathToGet}{_appSettings.VirtualPath}/Banner/{fileName}";
                    fullPathMobile = $"{_appSettings.PathToGet}{_appSettings.VirtualPath}/Banner/{fileNameMobile}";
                    directoryNameDesk = $"{_appSettings.VirtualPath}/Banner/{fileName}";
                    directoryNameMobile = $"{_appSettings.VirtualPath}/Banner/{fileNameMobile}";

                    model.NomeImagemDesktop = fileName;
                    model.NomeImagemMobile = fileNameMobile;
                    model.CaminhoDesktop = $"{_appSettings.VirtualPath}/Banner/{fileName}";
                    model.CaminhoMobile = $"{_appSettings.VirtualPath}/Banner/{fileNameMobile}";
                }
                else
                {
                    model.CaminhoDesktop = banner.CaminhoDesktop;
                    model.NomeImagemDesktop = banner.NomeImagemDesktop;
                    model.CaminhoMobile = banner.CaminhoMobile;
                    model.NomeImagemMobile = banner.NomeImagemMobile;
                }
                model.TempoExibicao = model.TempoExibicao <= 0 ? 10 : model.TempoExibicao;

                if (banner.Ativo == '0' && model.Ativo == '1')
                {
                    reorderBanners = true;
                    activeChanged = true;
                } else if (banner.Ativo != model.Ativo) {
                    activeChanged = true;
                }

                model.Ordem = banner.Ordem;

                banner = _mapper.Map<Banner>(model);
                await _bannerService.Atualizar(banner, reorderBanners, activeChanged);

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

                if (System.IO.File.Exists(renamedDirectoryDesktop))
                    System.IO.File.Delete(renamedDirectoryDesktop);

                if (System.IO.File.Exists(renamedDirectoryMobile))
                    System.IO.File.Delete(renamedDirectoryMobile);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        //<summary>
        //
        //Esse método serve para atualizar um Banner na base, primeiro mapeando
        //o objeto recebido para o objeto esperado na base.
        //Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        //
        //</summary>
        //<param name = "model" > Model de atualização de um Banner</param>
        [HttpPut("banner-order")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> AtualizarOrdem([FromBody] AreaUpdateOrder orderedBanners, [FromHeader(Name = "Custom")] string? origem)
        {

            try {

                if (orderedBanners == null)
                {
                    throw new AppException("O body da requisição não pode ser nulo");
                }

                List<int> bannersIds = new List<int>();
                ICollection<Banner> banners = new List<Banner>();

                orderedBanners.Area.Banners.ForEach(banner =>
                {
                    bannersIds.Add(banner.BannerId);
                });

                List<Banner> bannersInIds = await _bannerService.GetBannersInIds(orderedBanners.Area.AreaName, bannersIds);

                bannersInIds.ForEach(banner => {

                    orderedBanners.Area.Banners.ForEach(orderedBanner =>
                    {
                        if (banner.Id == orderedBanner.BannerId)
                        {
                            banner.Ordem = orderedBanner.Ordem;
                        }
                    });

                });

                await _bannerService.AtualizarDiversos(bannersInIds);

                return Ok(new { success = true });
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
                        Ativo = '0',
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

            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            try
            {

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
