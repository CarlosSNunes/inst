//===============================================================================
//Web API Post
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Post para uso do NEOCMS
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
using Neotix.Neocms.CarePlusAPI.Models.Post;
using System.IO;
using System;
using Microsoft.AspNetCore.Http;
using TinifyAPI;
using System.Net.Http.Headers;

namespace Neotix.Neocms.CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IMapper Mapper;
        private readonly AppSettings AppSettings;

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
            Mapper = mapper;
            AppSettings = appSettings.Value;
            Tinify.Key = AppSettings.TinyPngKey;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Post do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Post> result = await _postService.Listar();

            List<PostModel> model = Mapper.Map<List<PostModel>>(result);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos Post do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet("maisLidos")]
        public async Task<IActionResult> GetMostsRead()
        {
            List<Post> result = await _postService.BuscarMaisLidos();

            List<PostModel> model = Mapper.Map<List<PostModel>>(result);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            Post result = await _postService.BuscarPorId(id);

            PostModel model = Mapper.Map<PostModel>(result);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar e gravar uma vizualização em um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpGet("hit/{id}")]
        public async Task<IActionResult> GetByIdHit(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            Post result = await _postService.BuscarPorIdHit(id);

            PostModel model = Mapper.Map<PostModel>(result);

            return Ok(model);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar e gravar uma vizualização em um Post através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpGet("categoria/{id}")]
        public async Task<IActionResult> GetByCategory(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            List<Post> result = await _postService.BuscarPorCategoria(id);

            List<PostModel> model = Mapper.Map<List<PostModel>>(result);

            return Ok(model);
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
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            if (file == null)
                throw new AppException("O Arquivo não pode estar nulo");

            string fileName = string.Empty;
            string fullPath = string.Empty;
            string directoryName = string.Empty;
            
            try
            {
                var folderName = AppSettings.PathToSave;
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                    fullPath = Path.Combine(pathToSave, fileName);
                    directoryName = Path.GetDirectoryName(fullPath);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return Ok(new { directoryName });
            }
            catch (System.Exception ex)
            {
                if (System.IO.File.Exists(directoryName))
                    System.IO.File.Delete(directoryName);

                return BadRequest(new { message = ex.Message });
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
        public async Task<IActionResult> Post([FromForm] PostCreateModel model)
        {
            if (model == null)
                throw new AppException("O Post não pode estar nulo");

            string fileName = string.Empty;           
            string directoryName = string.Empty;
           
            try
            {
                if (model.Arquivo != null)
                {
                    var file = model.Arquivo;
                    var folderName = AppSettings.PathToSave;
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
                    model.CaminhoImagem = directoryName.Replace(AppSettings.PathToSave, AppSettings.PathToGet);
                }

                Post post = Mapper.Map<Post>(model);

                await _postService.Criar(post);

                return Ok();
            }
            catch (System.Exception ex)
            {
                if (System.IO.File.Exists(directoryName))
                    System.IO.File.Delete(directoryName);

                return BadRequest(new { message = ex.Message });
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
        public async Task<IActionResult> Put([FromForm] PostUpdateModel model)
        {
            if (model == null)
                throw new AppException("O Post não pode estar nulo");

            string fileName = string.Empty;           
            string directoryName = string.Empty;

            try
            {
                Post post = await _postService.BuscarPorId(model.Id.Value);


                if (model.Arquivo != null)
                {
                    var file = model.Arquivo;
                    var folderName = AppSettings.PathToSave;
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
                    model.CaminhoImagem = directoryName.Replace(AppSettings.PathToSave, AppSettings.PathToGet);
                }
                else
                {
                    model.CaminhoImagem = post.CaminhoImagem;
                    model.NomeImagem = post.NomeImagem;
                }

                post = Mapper.Map<Post>(model);

                await _postService.Atualizar(post);

                return Ok();
            }
            catch (System.Exception ex)
            {
                if (System.IO.File.Exists(directoryName))
                    System.IO.File.Delete(directoryName);

                return BadRequest(new { message = ex.Message });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um Post na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            Post post = await _postService.BuscarPorId(id);

            if (System.IO.File.Exists(post.CaminhoImagem))
                System.IO.File.Delete(post.CaminhoImagem);

            await _postService.Excluir(post.Id);

            return Ok();
        }        
    }
}
