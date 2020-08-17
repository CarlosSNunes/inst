using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Moq;
using Neotix.Neocms.CarePlusAPI.Controllers;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Models.Post;
using Neotix.Neocms.CarePlusAPI.Models.PostTag;
using Neotix.Neocms.CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using Xunit;

namespace Neotix.Neocms.CarePlusAPI.Tests.Controllers
{
    public class PostControllerTest : IDisposable
    {
        private readonly PostService _postService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly FileStream _stream;
        private readonly Post _post = new Post
        {
            Id = 1,
            DataCadastro = DateTime.Now,
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Noticia Teste",
            CaminhoImagem = "",
            CategoriaId = 1,
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
        };


        private readonly PostCreateModel _postCreateModel = new PostCreateModel
        {
            PostTag = new List<PostTagCreateModel> {
                new PostTagCreateModel {
                    TagId = 1
                }
            },
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Noticia Teste",
            CaminhoImagem = "",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 1
        };

        private readonly PostUpdateModel _postUpdateModel = new PostUpdateModel
        {
            Id = 1,
            PostTag = new List<PostTagUpdateModel> {
                new PostTagUpdateModel {
                    TagId = 1
                }
            },
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Noticia Teste",
            CaminhoImagem = "",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 1
        };

        public PostControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_dbOptions))
            {
                context.Categoria.Add(new Categoria { Id = 1, Descricao = "Saúde" });
                context.Tag.Add(new Tag { Id = 1, Descricao = "Saúde" });

                context.SaveChanges();
            }

            _postService = new PostService(new DataContext(_dbOptions));
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            var appSettings = appSettingsSection.Get<AppSettings>();

            _appSettings = Options.Create<AppSettings>(appSettings);

            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            _mapper = config.CreateMapper();

            _stream = File.OpenRead("Src/Post/cerebro.jpg");

            _postCreateModel.Arquivo = CreateFile();

            _postUpdateModel.Arquivo = CreateFile();

            _appSettings.Value.PathToSave = Directory.GetCurrentDirectory() + "\\";
            _appSettings.Value.PathToGet = Directory.GetCurrentDirectory() + "\\";
            _appSettings.Value.TinyPngKey = "9s2ckS71CFJ3hQGYM83GJYy5DDThKgHf";
        }

        private IFormFile CreateFile()
        {
            var file = new Mock<IFormFile>();
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(_stream);
            writer.Flush();
            ms.Position = 0;
            var fileName = "cerebro.jpg";
            var Length = 300;
            var contentDisposition = "form-data; name=\"Arquivo\"; filename=\"cerebro.jpg\"";
            var contentType = "image/png";
            var headers = new HeaderDictionary();
            file.Setup(f => f.ContentDisposition).Returns(contentDisposition).Verifiable();
            file.Setup(f => f.Length).Returns(Length).Verifiable();
            file.Setup(f => f.ContentType).Returns(contentType).Verifiable();
            file.Setup(f => f.Headers).Returns(headers).Verifiable();
            file.Setup(f => f.FileName).Returns(fileName).Verifiable();
            file.Setup(_ => _.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()))
                .Returns((Stream stream, CancellationToken token) => ms.CopyToAsync(stream))
                .Verifiable();

            var inputFile = file.Object;

            return inputFile;
        }

        [Fact]
        public void ConstrutorSucesso()
        {
            var result = new PostController(_postService, _mapper, _appSettings);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListarSucesso()
        {
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void UploadSucesso()
        {
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            IActionResult result = await controller.Upload(_postUpdateModel.Arquivo);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void UploadErro()
        {
            _appSettings.Value.PathToSave = null;
            PostController controller = new PostController(_postService, _mapper, _appSettings);            
            await Assert.ThrowsAsync<AppException>(() => controller.Upload(null));
        }

        [Fact]
        public async void CriarSucesso()
        {
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_postCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarSucessoArquivoNulo()
        {
            _postCreateModel.Arquivo = null;
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_postCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            _appSettings.Value.PathToSave = null;
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_postCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            await _postService.Criar(_post);

            using (DataContext context = new DataContext(_dbOptions))
            {
                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings);
                IActionResult result = await controller.Put(_postUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarSucessoArquivoNulo()
        {
            await _postService.Criar(_post);

            using (DataContext context = new DataContext(_dbOptions))
            {
                _postUpdateModel.Arquivo = null;
                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings);
                IActionResult result = await controller.Put(_postUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            await _postService.Criar(_post);

            using (DataContext context = new DataContext(_dbOptions))
            {
                _postUpdateModel.Id = null;
                _postUpdateModel.DescricaoPrevia = null;
                _postUpdateModel.Titulo = null;

                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings);
                IActionResult result = await controller.Put(_postUpdateModel);
                Assert.IsType<BadRequestObjectResult>(result);
            }
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            await controller.Post(_postCreateModel);
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await _postService.Criar(_post);
            PostController controller = new PostController(_postService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(999));
        }

        public void Dispose()
        {
            _stream.Close();
        }
    }
}
