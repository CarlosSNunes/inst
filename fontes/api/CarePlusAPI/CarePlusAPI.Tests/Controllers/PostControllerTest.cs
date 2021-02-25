using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Moq;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Post;
using CarePlusAPI.Models.PostTag;
using CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Xunit;
using System.Threading;

namespace CarePlusAPI.Tests.Controllers
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
        private readonly Mock<SeriLog> _seriLogMock = new Mock<SeriLog>();
        private readonly Mock<IFtpUpload> _ftpUpload = new Mock<IFtpUpload>();
        private readonly Mock<IGetCipher> _getCipherMock = new Mock<IGetCipher>();
        private readonly Post _post = new Post
        {
            PostTag = new List<PostTag> {
                new PostTag{
                    TagId = 1
                }
            },
            DataCadastro = DateTime.Now,
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Post Teste",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 1,
            Ativo = '1',
            Slug = "titulo-teste",
            Destaque = '1',
            CaminhoImagem = "Src/Images/Post/post.jpg",
            NomeImagem = "post.jpg"
        };

        private readonly Post _post2 = new Post
        {
            PostTag = new List<PostTag> {
                new PostTag{
                    TagId = 1
                }
            },
            DataCadastro = DateTime.Now,
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Post Teste",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 1,
            Ativo = '1',
            Slug = "titulo-teste-1",
            Destaque = '1',
            CaminhoImagem = "Src/Images/Post/post.jpg",
            NomeImagem = "post.jpg"
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
            Descricao = "AAAAA",
            DescricaoPrevia = "Noticia Teste",
            CaminhoImagem = "",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 1,
            Destaque = '1',
            Ativo = '1',
            TituloPaginaSEO = "Noticia Teste",
            DescricaoPaginaSEO = "Subtitulo teste"

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
            CategoriaId = 1,
            Slug = "titulo-teste"
        };

        public PostControllerTest()
        {
            _getCipherMock.Setup(s => s.Decrypt(It.IsAny<string>())).Returns("aaaaa");

            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            _seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                context.Categoria.Add(new Categoria { Id = 1, Titulo = "Saúde" });
                context.Tag.Add(new Tag { Id = 1, Descricao = "Saúde" });

                context.SaveChanges();
            }

            _postService = new PostService(new DataContext(_dbOptions, _getCipherMock.Object));
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

            _stream = File.OpenRead("Src/Images/mock/post.jpg");

            _postCreateModel.Arquivo = CreateFile();

            _postUpdateModel.Arquivo = CreateFile();

            _ftpUpload.Setup(ftp => ftp.Upload(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()));
        }

        private IFormFile CreateFile()
        {
            var formFile = new Mock<IFormFile>();
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(_stream);
            writer.Flush();
            ms.Position = 0;
            var fileName = "post.jpg";
            var contentDisposition = "form-data; name=\"Arquivo\"; filename=\"post.jpg\"";

            formFile.Setup(_ => _.FileName).Returns(fileName);
            formFile.Setup(_ => _.Length).Returns(ms.Length);
            formFile.Setup(_ => _.OpenReadStream()).Returns(ms);
            formFile.Setup(_ => _.ContentDisposition).Returns(contentDisposition);
            formFile.Setup(_ => _.ContentType).Returns("image/jpeg");
            formFile.Setup(_ => _.CopyToAsync(ms, CancellationToken.None)).Returns(System.Threading.Tasks.Task.CompletedTask);
            formFile.Verify();

            return formFile.Object;
        }

        [Fact]
        public void ConstrutorSucesso()
        {

            var result = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListarSucesso()
        {
            await _postService.Criar(_post, false);



            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0; 
            var limit = 5;
            var result = await controller.Get(offset, limit, null, "CarePlus", null);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListarSucessoPostsSemImagem()
        {
            Post postSemImagem = _post;
            postSemImagem.CaminhoImagem = null;
            await _postService.Criar(postSemImagem, false);

            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.Get(offset, limit, null, "CarePlus", null);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void MaisLidosSucesso()
        {
            await _postService.Criar(_post, false);

            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.GetMostsRead(offset, limit, null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void MaisLidosSucessoSemImagem()
        {
            Post postSemImagem = _post;
            postSemImagem.CaminhoImagem = null;
            await _postService.Criar(postSemImagem, false);

            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.GetMostsRead(offset, limit, null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetBySlugSucesso()
        {
            await _postService.Criar(_post, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlug("titulo-teste", "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetBySlugSucessoSemImagem()
        {
            Post postSemImagem = _post;
            postSemImagem.CaminhoImagem = null;
            await _postService.Criar(postSemImagem, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlug("titulo-teste", "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetBySlugErroNull()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlug(null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetBySlugErro()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlug("titulo-teste", "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetBySlugHitSucesso()
        {
            await _postService.Criar(_post, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlugHit("titulo-teste", "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetBySlugHitSucessoSemImagem()
        {
            Post postSemImagem = _post;
            postSemImagem.CaminhoImagem = null;
            await _postService.Criar(postSemImagem, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlugHit("titulo-teste", "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetBySlugHitErroNull()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlugHit(null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetBySlugHitErro()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBySlugHit("titulo-teste", "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetByCategoryIdSucesso()
        {
            await _postService.Criar(_post, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.getByCategoryId(1, offset, limit, null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetByCategoryIdSemImagemSucesso()
        {
            Post postSemImagem = _post;
            postSemImagem.CaminhoImagem = null;
            await _postService.Criar(postSemImagem, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.getByCategoryId(1, offset, limit, null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetByCategoryIdErroZero()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            IActionResult result = await controller.getByCategoryId(0, offset, limit, null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetRelativePostsSucesso()
        {
            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                List<Post> postsList = new List<Post>();
                postsList.Add(_post);
                postsList.Add(_post2);
                await context.Set<Post>().AddRangeAsync(postsList);  
                await context.SaveChangesAsync();
            }


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.getRelativePosts(1, offset, limit, "titulo-teste", null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetRelativePostsSemImagemSucesso()
        {

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                List<Post> postsList = new List<Post>();

                Post postSemImagem = _post;
                postSemImagem.CaminhoImagem = null;

                Post postSemImagem2 = _post2;
                postSemImagem2.CaminhoImagem = null;

                postsList.Add(postSemImagem);
                postsList.Add(postSemImagem2);

                await context.Set<Post>().AddRangeAsync(postsList);
                await context.SaveChangesAsync();
            }


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.getRelativePosts(1, offset, limit, "titulo-teste", null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public async void GetRelativePostsErroZero()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            IActionResult result = await controller.getRelativePosts(0, offset, limit, "titulo-teste", null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetByTermSucesso()
        {
            await _postService.Criar(_post, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.GetByTerm("titulo", offset, limit, null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByTermSemImagemSucesso()
        {
            Post postSemImagem = _post;
            postSemImagem.CaminhoImagem = null;
            postSemImagem.NomeImagem = null;
            await _postService.Criar(postSemImagem, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            var result = await controller.GetByTerm("titulo", offset, limit, null, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByTermErro()
        {
            await _postService.Criar(_post, false);


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var offset = 0;
            var limit = 5;
            IActionResult result = await controller.GetByTerm("", offset, limit, null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void UploadSucesso()
        {
            // Mocando classe compress
            Mock<Compress> compressMock = new Mock<Compress>();
            compressMock.Setup(_ => _.CompressImage("aaa")).Verifiable();

            // Mocando classe serilog


            PostController controller = new PostController(_postService, _mapper, _appSettings, compressMock.Object, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Upload(_postUpdateModel.Arquivo, "CarePlus");
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void UploadErro()
        {
            _appSettings.Value.PathToSave = null;


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);            
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Upload(null, "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarSucesso()
        {
            // Mocando classe compress
            Mock<Compress> compressMock = new Mock<Compress>();
            compressMock.Setup(_ => _.CompressImage("aaa")).Verifiable();

            // Mocando Serilog


            PostController controller = new PostController(_postService, _mapper, _appSettings, compressMock.Object, _seriLogMock.Object, _ftpUpload.Object);

            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_postCreateModel, "CarePlus");
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarSucessoArquivoNulo()
        {
            _postCreateModel.Arquivo = null;


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_postCreateModel, "CarePlus");
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            _appSettings.Value.PathToSave = null;


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);

            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null, "CarePlus"));
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            await _postService.Criar(_post, null);

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                // Mocando classe compress
                Mock<Compress> compressMock = new Mock<Compress>();
                compressMock.Setup(_ => _.CompressImage("aaa")).Verifiable();

                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings, compressMock.Object, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Put(_postUpdateModel, "CarePlus");
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            await _postService.Criar(_post, null);

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                _postUpdateModel.Arquivo = null;
                PostService service = new PostService(context);

                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                await Assert.ThrowsAsync<AppException>(() => controller.Put(null, "CarePlus"));
            }
        }

        [Fact]
        public async void AtualizarSucessoArquivoNulo()
        {
            await _postService.Criar(_post, null);

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                // Mocando classe compress
                Mock<Compress> compressMock = new Mock<Compress>();
                compressMock.Setup(_ => _.CompressImage("aaa")).Verifiable();

                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings, compressMock.Object, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                PostUpdateModel post = _postUpdateModel;
                post.Arquivo = null;

                IActionResult result = await controller.Put(post, "CarePlus");
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            await _postService.Criar(_post, null);

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                _postUpdateModel.Id = null;
                _postUpdateModel.DescricaoPrevia = null;
                _postUpdateModel.Titulo = null;
                _postUpdateModel.Slug = string.Empty;

                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Put(_postUpdateModel, "CarePlus");
                Assert.IsType<BadRequestObjectResult>(result);
            }
        }


        [Fact]
        public async void DuplicarSucesso()
        {
            await _postService.Criar(_post, null);

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {

                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostService service = new PostService(context);
                PostController controller = new PostController(service, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Duplicate(_postUpdateModel.Slug, "CarePlus");
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void DuplicarErro()
        {

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                PostService service = new PostService(context);
                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostController controller = new PostController(service, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                await Assert.ThrowsAsync<AppException>(() => controller.Duplicate(null, "CarePlus"));
            }
        }


        [Fact]
        public async void DuplicarErroSlug()
        {

            using (DataContext context = new DataContext(_dbOptions, _getCipherMock.Object))
            {
                PostService service = new PostService(context);

                // Mocando SeriLog
            Mock<SeriLog> seriLogMock = new Mock<SeriLog>();
                seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

                PostController controller = new PostController(service, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Duplicate("slug-inexistente", "CarePlus");
                Assert.IsType<BadRequestObjectResult>(result);
            }
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            await _postService.Criar(_post, null);

            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);

            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await controller.Post(_postCreateModel, "CarePlus");
            IActionResult result = await controller.Delete("titulo-teste", "CarePlus");
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErroNull()
        {


            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(null, "CarePlus"));
        }

        [Fact]
        public async void ExcluirErro()
        {
            PostController controller = new PostController(_postService, _mapper, _appSettings, null, _seriLogMock.Object, _ftpUpload.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete("titulo-teste", "CarePlus");
            Assert.IsType<BadRequestObjectResult>(result);
        }

        public void Dispose()
        {
            _stream.Close();
            _connection.Close();
        }
    }
}
