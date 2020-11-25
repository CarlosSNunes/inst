using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Post;
using CarePlusAPI.Models.PostTag;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TinifyAPI;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly SeriLog _seriLog;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependencia
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="noticiaService">Serviço de Post para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public PostController(
            IPostService noticiaService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _postService = noticiaService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            Tinify.Key = _appSettings.TinyPngKey;
            _seriLog = new SeriLog(appSettings);
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Post do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>        
        [HttpGet("{page}/{pageSize}")]
        [AllowAnonymous]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> Get(int page, int pageSize)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var result = await _postService.Listar(page, pageSize);

                List<PostModel> model = _mapper.Map<List<PostModel>>(result.Item2);

                // Adicionando tratativa para devolver caminho da imagem com base na variável de ambiente.
                model.ForEach(item =>
                {
                    if (item.CaminhoImagem != null)
                    {
                        item.CaminhoCompleto = $"{_appSettings.PathToGet}{item.CaminhoImagem}";
                    }
                    else
                    {
                        item.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
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
        ///Esse método serve para listar todos Post do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("maisLidos/{page}/{pageSize}")]        
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetMostsRead(int page, int pageSize)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var result = await _postService.BuscarMaisLidos(page, pageSize);

                List<PostModel> model = _mapper.Map<List<PostModel>>(result.Item2);

                // Adicionando tratativa para devolver caminho da imagem com base na variável de ambiente.
                model.ForEach(item =>
                {
                    if (item.CaminhoImagem != null)
                    {
                        item.CaminhoCompleto = $"{_appSettings.PathToGet}{item.CaminhoImagem}";
                    }
                    else
                    {
                        item.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
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
        ///Esse método serve para buscar um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>        
        [HttpGet("{slug}")]        
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (string.IsNullOrWhiteSpace(slug))
                    throw new AppException("O slug do Post não pode estar vazio");

                Post result = await _postService.BuscarPorSlug(slug);

                PostModel model = _mapper.Map<PostModel>(result);

                if (model.CaminhoImagem != null)
                {
                    model.CaminhoCompleto = $"{_appSettings.PathToGet}{model.CaminhoImagem}";
                }
                else
                {
                    model.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
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
        ///Esse método serve para buscar e gravar uma vizualização em um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpGet("hit/{slug}")]        
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetBySlugHit(string slug)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (string.IsNullOrWhiteSpace(slug))
                    throw new AppException("O slug do Post não pode estar vazio");

                Post result = await _postService.BuscarPorSlugHit(slug);

                PostModel model = _mapper.Map<PostModel>(result);

                if (model.CaminhoImagem != null)
                {
                    model.CaminhoCompleto = $"{_appSettings.PathToGet}{model.CaminhoImagem}";
                } else
                {
                    model.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
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
        ///Esse método serve para buscar e gravar uma vizualização em um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpGet("categoria/{id}/{page}/{pageSize}/{slug}")]
        [AllowAnonymous]
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetByCategory(int id, int page, int pageSize, string slug)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (id == 0)
                    throw new AppException("O id do Post não pode ser igual a 0");

               var result = await _postService.BuscarPorCategoria(id, page, pageSize, slug);

                List<PostModel> model = _mapper.Map<List<PostModel>>(result.Item2);

                // Adicionando tratativa para devolver caminho da imagem com base na variável de ambiente.
                model.ForEach(item =>
                {
                    if (item.CaminhoImagem != null)
                    {
                        item.CaminhoCompleto = $"{_appSettings.PathToGet}{item.CaminhoImagem}";
                    }
                    else
                    {
                        item.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
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
        ///Esse método serve para buscar e gravar uma vizualização em um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpGet("term/{term}/{page}/{pageSize}")]        
        [Authorize(Roles = "Editor, Visualizador, Administrador")]
        public async Task<IActionResult> GetByTerm(string term, int page, int pageSize)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (string.IsNullOrWhiteSpace(term))
                    throw new AppException("O termo não estar vazio");

                var result = await _postService.BuscarPorTermo(term, page, pageSize);

                List<PostModel> model = _mapper.Map<List<PostModel>>(result.Item2);

                // Adicionando tratativa para devolver caminho da imagem com base na variável de ambiente.
                model.ForEach(item =>
                {
                    if (item.CaminhoImagem != null)
                    {
                        item.CaminhoCompleto = $"{_appSettings.PathToGet}{item.CaminhoImagem}";
                    }
                    else
                    {
                        item.CaminhoCompleto = $"{_appSettings.UrlDefault}{_appSettings.PostImageRelativePathDefault}";
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
        ///Esse método serve para realizar o upload de uma imagem e retornar o caminho 
        ///após ter sido feito o upload.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="file">Arquivo para ser feito o upload</param>
        [HttpPost("Upload")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            string origem = Request.Headers["Custom"];

            if (file == null)
                throw new AppException("O Arquivo não pode estar nulo");

            string fileName = string.Empty;
            string fullPath = string.Empty;
            string directoryName = string.Empty;

            try
            {
                var fullRelativePath = _appSettings.PathToSave + "\\Post";
                var stringArr = fullRelativePath.Split("\\");
                var folderName = Path.Combine(stringArr);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                    fullPath = Path.Combine(pathToSave, fileName);
                    directoryName = Path.GetDirectoryName(fullPath);


                    var directoryToReplace = Directory.GetCurrentDirectory();
                    directoryName = directoryName.Replace(directoryToReplace, "");

                    // Combine with appSettings

                    fullPath = $"{_appSettings.PathToGet}/${directoryName}";

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return Ok(new {
                    directoryName,
                    fullPath
                });
            }
            catch (System.Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                if (System.IO.File.Exists(directoryName))
                    System.IO.File.Delete(directoryName);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para inserir um Post na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de um Post</param>
        [HttpPost]        
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Post([FromForm] PostCreateModel model)
        {
            string origem = Request.Headers["Custom"];

            if (model == null)
                throw new AppException("O Post não pode estar nulo");

            string fileName = string.Empty;
            string directoryName = string.Empty;

            try
            {

                if (model.Arquivo != null)
                {
                    var file = model.Arquivo;
                    var fullRelativePath = _appSettings.PathToSave + "\\Post";
                    var stringArr = fullRelativePath.Split("\\");
                    var folderName = Path.Combine(stringArr);
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    if (file.Length > 0)
                    {
                        fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                        directoryName = Path.Combine(pathToSave, fileName);

                        using (var stream = new FileStream(directoryName, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                    }

                    model.NomeImagem = fileName;

                    var directoryToReplace = Directory.GetCurrentDirectory();
                    model.CaminhoImagem = directoryName.Replace(directoryToReplace, "");
                }

                Post post = _mapper.Map<Post>(model);

                await _postService.Criar(post);

                return Ok();
            }
            catch (System.Exception ex)
            {
                System.Console.Write(ex);
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                if (System.IO.File.Exists(directoryName))
                    System.IO.File.Delete(directoryName);

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
        ///<param name="model">Model de atualização de um Post</param
        [HttpPut]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Put([FromForm] PostUpdateModel model)
        {
            string origem = Request.Headers["Custom"];

            if (model == null)
                throw new AppException("O Post não pode estar nulo");

            string fileName = string.Empty;
            string directoryName = string.Empty;

            try
            {
                Post post = await _postService.BuscarPorSlug(model.Slug);

                if (model.Arquivo != null)
                {
                    var file = model.Arquivo;
                    var fullRelativePath = _appSettings.PathToSave + "\\Post";
                    var stringArr = fullRelativePath.Split("\\");
                    var folderName = Path.Combine(stringArr);
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    if (file.Length > 0)
                    {
                        fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                        directoryName = Path.Combine(pathToSave, fileName);

                        using (var stream = new FileStream(directoryName, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                    }

                    model.NomeImagem = fileName;

                    var directoryToReplace = Directory.GetCurrentDirectory();
                    model.CaminhoImagem = directoryName.Replace(directoryToReplace, "");
                }
                else
                {
                    model.CaminhoImagem = post.CaminhoImagem;
                    model.NomeImagem = post.NomeImagem;
                }

                post = _mapper.Map<Post>(model);

                await _postService.Atualizar(post);

                return Ok();
            }
            catch (System.Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                if (System.IO.File.Exists(directoryName))
                    System.IO.File.Delete(directoryName);

                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para duplicar um Post na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="slug">Slug do Post</param>
        [HttpGet("duplicar/{slug}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Duplicate(string slug)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (string.IsNullOrWhiteSpace(slug))
                    throw new AppException("O slug do Post não pode estar vazio");

                Post post = await _postService.BuscarPorSlug(slug);

                var newPost = new PostCreateModel
                {
                    Titulo = $"[Duplicado] - {post.Titulo}",
                    Subtitulo = post.Subtitulo,
                    DescricaoPrevia = post.DescricaoPrevia,
                    Descricao = post.Descricao,
                    DataPublicacao = post.DataPublicacao,
                    DataExpiracao = post.DataExpiracao,
                    CaminhoImagem = post.CaminhoImagem,
                    NomeImagem = post.NomeImagem,
                    Destaque = post.Destaque,
                    Ativo = post.Ativo,
                    Vizualizacoes = post.Vizualizacoes,
                    TituloPaginaSEO = post.TituloPaginaSEO,
                    DescricaoPaginaSEO = post.DescricaoPaginaSEO,
                    CategoriaId = post.CategoriaId
                };

                newPost.PostTag = new List<PostTagCreateModel>();
                foreach (var postTag in post.PostTag) { 
                    newPost.PostTag.Add(new PostTagCreateModel { TagId = postTag.TagId });
                }

                var postToCreate = _mapper.Map<Post>(newPost);
                await _postService.Criar(postToCreate);

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
        ///Esse método serve para excluir um Post na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpDelete("{slug}")]
        [Authorize(Roles = "Editor, Administrador")]
        public async Task<IActionResult> Delete(string slug)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (string.IsNullOrWhiteSpace(slug))
                    throw new AppException("O slug do Post não pode estar vazio");

                Post post = await _postService.BuscarPorSlug(slug);

                if (System.IO.File.Exists(post.CaminhoImagem))
                    System.IO.File.Delete(post.CaminhoImagem);

                await _postService.Excluir(post.Slug);

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