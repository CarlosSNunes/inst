//using AutoMapper;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Options;
//using Moq;
//using CarePlusAPI.Controllers;
//using CarePlusAPI.Entities;
//using CarePlusAPI.Helpers;
//using CarePlusAPI.Models.Banner;
//using CarePlusAPI.Services;
//using System;
//using System.IO;
//using System.Threading;
//using Xunit;
//using Microsoft.Data.Sqlite;

//namespace CarePlusAPI.Tests.Controllers
//{
//    public class BannerControllerTest : IDisposable
//    {
//        private readonly BannerService _bannerService;
//        private readonly IMapper _mapper;
//        private readonly IOptions<AppSettings> _appSettings;
//        private readonly DbContextOptions<DataContext> _dbOptions;
//        private readonly SqliteConnection _connection;
//        private readonly IConfiguration _configuration;
//        private readonly FileStream _stream;
//        private readonly Banner _banner = new Banner
//        {
//            Id = 1,
//            DataCadastro = DateTime.Now,
//            Descricao = "Campanha contra o cancer",
//            NomeImagemDesktop = "",
//            NomeImagemMobile = "",
//            LinkExterno = '0',
//            Rota = "/campanha/cancer",
//            Titulo = "Faça seus exames",
//            UsuarioId = 1,
//        };


//        private readonly BannerCreateModel _bannerCreateModel = new BannerCreateModel
//        {
//            Subtitulo = "",
//            Descricao = "Campanha contra o cancer",
//            NomeImagemDesktop = "",
//            NomeImagemMobile = "",
//            LinkExterno = '0',
//            Rota = "/campanha/cancer",
//            Titulo = "Faça seus exames",
//        };

//        private readonly BannerUpdateModel _bannerUpdateModel = new BannerUpdateModel
//        {
//            Id = 1,
//            Descricao = "Campanha contra o cancer",
//            NomeImagemDesktop = "",
//            NomeImagemMobile = "",
//            LinkExterno = '0',
//            Rota = "/campanha/cancer",
//            Titulo = "Faça seus exames"
//        };

//        public BannerControllerTest()
//        {
//            AutoMapperProfile mapperProfile = new AutoMapperProfile();
//            _connection = new SqliteConnection("DataSource=:memory:");
//            _connection.Open();

//            _dbOptions = new DbContextOptionsBuilder<DataContext>()
//                    .UseSqlite(_connection)
//                    .Options;

//            using (DataContext context = new DataContext(_dbOptions))
//                context.Database.EnsureCreated();

//            _bannerService = new BannerService(new DataContext(_dbOptions));

//            var builder = new ConfigurationBuilder()
//                .SetBasePath(Directory.GetCurrentDirectory())
//                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//                .AddEnvironmentVariables();

//            _configuration = builder.Build();

//            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

//            var appSettings = appSettingsSection.Get<AppSettings>();

//            _appSettings = Options.Create<AppSettings>(appSettings);

//            MapperConfiguration config = new MapperConfiguration(cfg =>
//            {
//                cfg.AddProfile(mapperProfile);
//            });

//            _mapper = config.CreateMapper();

//            _stream = File.OpenRead("Src/Images/mock/cerebro.jpg");

//            _bannerCreateModel.Arquivo = CreateFile();

//            _bannerCreateModel.ArquivoMobile = CreateFile();

//            _bannerUpdateModel.Arquivo = CreateFile();

//            _bannerUpdateModel.ArquivoMobile = CreateFile();
//        }

//        private IFormFile CreateFile()
//        {

//            var fileMock = new Mock<IFormFile>();
//            var ms = new MemoryStream();
//            var writer = new StreamWriter(ms);

//            writer.Write(_stream);
//            writer.Flush();
//            ms.Position = 0;
//            var fileName = "post.jpg";
//            var contentDisposition = "form-data; name=\"Arquivo\"; filename=\"cerebro.jpg\"";
//            //Setup mock file using info from physical file
//            fileMock.Setup(_ => _.FileName).Returns(fileName);
//            fileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
//            fileMock.Setup(_ => _.Length).Returns(ms.Length);
//            fileMock.Setup(_ => _.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()))
//                .Returns((Stream stream, CancellationToken token) => ms.CopyToAsync(stream))
//                .Verifiable();
//            fileMock.Setup(f => f.ContentDisposition).Returns(contentDisposition).Verifiable();
//            //...setup other members as needed.

//            var inputFile = fileMock.Object;

//            return inputFile;
//        }

//        [Fact]
//        public void ConstrutorSucesso()
//        {

//            var result = new BannerController(_bannerService, _mapper, _appSettings);
//            Assert.NotNull(result);
//        }

//        [Fact]
//        public async void ListarSucesso()
//        { 
            
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            int page = 0;
//            int pageSize = 50;
//            var result = await controller.Get(page, pageSize, null, null);
//            Assert.IsType<OkObjectResult>(result);
//        }

//        [Fact]
//        public async void BuscarSucesso()
//        {
//            await _bannerService.Criar(_banner);
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            IActionResult result = await controller.GetById(1);
//            Assert.IsType<OkObjectResult>(result);
//        }

//        [Fact]
//        public async void BuscarErro()
//        {
//            await _bannerService.Criar(_banner);
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await Assert.ThrowsAsync<AppException>(() => controller.GetById(999));
//        }

//        [Fact]
//        public async void BuscarErroZero()
//        {
//            await _bannerService.Criar(_banner);
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings); controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
//        }

//        [Fact]
//        public async void CriarSucesso()
//        {
//            var controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            IActionResult result = await controller.Post(_bannerCreateModel, "CarePlus");
//            Assert.IsType<OkResult>(result);
//        }

//        [Fact]
//        public async void CriarSucessoDiretorioNovo()
//        {
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            IActionResult result = await controller.Post(_bannerCreateModel, "CarePlus");
//            Assert.IsType<OkResult>(result);
//        }

//        [Fact]
//        public async void CriarErro()
//        {
//            var connection = new SqliteConnection("");
//            connection.Open();
//            var dbOptions = new DbContextOptionsBuilder<DataContext>()
//                    .UseSqlite(connection)
//                    .Options;
//            var bannerService = new BannerService(new DataContext(dbOptions));

//            BannerController controller = new BannerController(bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            IActionResult result = await controller.Post(_bannerCreateModel, "CarePlus");
//            Assert.IsType<BadRequestObjectResult>(result);
//        }

//        [Fact]
//        public async void CriarErroNulo()
//        {
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await Assert.ThrowsAsync<AppException>(() => controller.Post(null, "CarePlus"));
//        }

//        [Fact]
//        public async void AtualizarSucesso()
//        {
//            var c = new BannerController(_bannerService, _mapper, _appSettings);
//            c.ControllerContext = new ControllerContext();
//            c.ControllerContext.HttpContext = new DefaultHttpContext();
//            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";

//            await c.Post(_bannerCreateModel, "CarePlus");

//            using (DataContext context = new DataContext(_dbOptions))
//            {
//                BannerService service = new BannerService(context);
//                BannerController controller = new BannerController(service, _mapper, _appSettings);
//                controller.ControllerContext = new ControllerContext();
//                controller.ControllerContext.HttpContext = new DefaultHttpContext();
//                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//                IActionResult result = await controller.Put(_bannerUpdateModel);
//                Assert.IsType<OkResult>(result);
//            }
//        }

//        [Fact]
//        public async void AtualizarSucessoNovoDiretorio()
//        {
//            var c = new BannerController(_bannerService, _mapper, _appSettings);
//            c.ControllerContext = new ControllerContext();
//            c.ControllerContext.HttpContext = new DefaultHttpContext();
//            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await c.Post(_bannerCreateModel, "CarePlus");

//            using (DataContext context = new DataContext(_dbOptions))
//            {
//                BannerService service = new BannerService(context);
//                BannerController controller = new BannerController(service, _mapper, _appSettings);
//                controller.ControllerContext = new ControllerContext();
//                controller.ControllerContext.HttpContext = new DefaultHttpContext();
//                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//                IActionResult result = await controller.Put(_bannerUpdateModel);
//                Assert.IsType<OkResult>(result);
//            }
//        }

//        [Fact]
//        public async void AtualizarSucessoArquivoNulo()
//        {
//            var c = new BannerController(_bannerService, _mapper, _appSettings);
//            c.ControllerContext = new ControllerContext();
//            c.ControllerContext.HttpContext = new DefaultHttpContext();
//            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await c.Post(_bannerCreateModel, "CarePlus");

//            using (DataContext context = new DataContext(_dbOptions))
//            {
//                BannerService service = new BannerService(context);
//                BannerController controller = new BannerController(service, _mapper, _appSettings);
//                controller.ControllerContext = new ControllerContext();
//                controller.ControllerContext.HttpContext = new DefaultHttpContext();
//                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//                _bannerUpdateModel.Arquivo = null;
//                _bannerUpdateModel.ArquivoMobile = null;
//                IActionResult result = await controller.Put(_bannerUpdateModel);
//                Assert.IsType<OkResult>(result);
//            }
//        }

//        [Fact]
//        public async void AtualizarErro()
//        {
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            IActionResult result = await controller.Put(_bannerUpdateModel);
//            Assert.IsType<BadRequestObjectResult>(result);
//        }

//        [Fact]
//        public async void AtualizarErroNulo()
//        {
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
//        }

//        [Fact]
//        public async void ExcluirSucesso()
//        {
//            var c = new BannerController(_bannerService, _mapper, _appSettings);
//            c.ControllerContext = new ControllerContext();
//            c.ControllerContext.HttpContext = new DefaultHttpContext();
//            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await c.Post(_bannerCreateModel, "CarePlus");

//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            IActionResult result = await controller.Delete(1);
//            Assert.IsType<OkResult>(result);
//        }

//        [Fact]
//        public async void ExcluirErro()
//        {
//            await _bannerService.Criar(_banner);
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await Assert.ThrowsAsync<AppException>(() => controller.Delete(999));
//        }
       

//        [Fact]
//        public async void ExcluirErroZero()
//        {
//            await _bannerService.Criar(_banner);
//            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
//            controller.ControllerContext = new ControllerContext();
//            controller.ControllerContext.HttpContext = new DefaultHttpContext();
//            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
//            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
//        }

//        public void Dispose()
//        {
//            _stream.Close();
//            _connection.Close();
//        }
//    }
//}
