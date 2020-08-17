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
using Neotix.Neocms.CarePlusAPI.Models.Banner;
using Neotix.Neocms.CarePlusAPI.Services;
using System;
using System.IO;
using System.Threading;
using Xunit;

namespace Neotix.Neocms.CarePlusAPI.Tests.Controllers
{
    public class BannerControllerTest : IDisposable
    {
        private readonly BannerService _bannerService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly FileStream _stream;
        private readonly Banner _banner = new Banner
        {
            Id = 1,
            DataCadastro = DateTime.Now,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
            UsuarioId = 1,
        };


        private readonly BannerCreateModel _bannerCreateModel = new BannerCreateModel
        {
            Subtitulo = "",
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
        };

        private readonly BannerUpdateModel _bannerUpdateModel = new BannerUpdateModel
        {
            Id = 1,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames"
        };

        public BannerControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            _bannerService = new BannerService(new DataContext(_dbOptions));
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            _appSettings = Options.Create<AppSettings>(appSettings);

            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            _mapper = config.CreateMapper();

            _stream = File.OpenRead("Src/Banner/cerebro.jpg");

            _bannerCreateModel.Arquivo = CreateFile();

            _bannerCreateModel.ArquivoMobile = CreateFile();

            _bannerUpdateModel.Arquivo = CreateFile();

            _bannerUpdateModel.ArquivoMobile = CreateFile();

            _appSettings.Value.PathToSave = Directory.GetCurrentDirectory() + "\\";
            _appSettings.Value.PathToGet = Directory.GetCurrentDirectory() + "\\";

            _appSettings.Value.PathToSaveMobile = Directory.GetCurrentDirectory() + "\\";
            _appSettings.Value.PathToGetMobile = Directory.GetCurrentDirectory() + "\\";
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
            var result = new BannerController(_bannerService, _mapper, _appSettings);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListarSucesso()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(999));
        }

        [Fact]
        public async void BuscarErroZero()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
        }

        [Fact]
        public async void CriarSucesso()
        {
            var controller = new BannerController(_bannerService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_bannerCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarSucessoDiretorioNovo()
        {
            _appSettings.Value.PathToSave += new Guid() + "\\";

            if (Directory.Exists(_appSettings.Value.PathToSave))
                Directory.Delete(_appSettings.Value.PathToSave, true);

            _appSettings.Value.PathToSaveMobile += new Guid() + "\\";

            if (Directory.Exists(_appSettings.Value.PathToSaveMobile))
                Directory.Delete(_appSettings.Value.PathToSaveMobile, true);

            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_bannerCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            var connection = new SqliteConnection("");
            connection.Open();
            var dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(connection)
                    .Options;
            var bannerService = new BannerService(new DataContext(dbOptions));

            BannerController controller = new BannerController(bannerService, _mapper, _appSettings);
            IActionResult result = await controller.Post(_bannerCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null));
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings);

            await c.Post(_bannerCreateModel);

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings);
                IActionResult result = await controller.Put(_bannerUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarSucessoNovoDiretorio()
        {
            _appSettings.Value.PathToSave += new Guid() + "\\";

            if (Directory.Exists(_appSettings.Value.PathToSave))
                Directory.Delete(_appSettings.Value.PathToSave, true);

            _appSettings.Value.PathToSave += new Guid() + "\\";

            if (Directory.Exists(_appSettings.Value.PathToSave))
                Directory.Delete(_appSettings.Value.PathToSave, true);

            var c = new BannerController(_bannerService, _mapper, _appSettings);
            await c.Post(_bannerCreateModel);

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings);
                IActionResult result = await controller.Put(_bannerUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarSucessoArquivoNulo()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings);
            await c.Post(_bannerCreateModel);

            using (DataContext context = new DataContext(_dbOptions))
            {
                BannerService service = new BannerService(context);
                BannerController controller = new BannerController(service, _mapper, _appSettings);
                _bannerUpdateModel.Arquivo = null;
                _bannerUpdateModel.ArquivoMobile = null;
                IActionResult result = await controller.Put(_bannerUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            IActionResult result = await controller.Put(_bannerUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            var c = new BannerController(_bannerService, _mapper, _appSettings);
            await c.Post(_bannerCreateModel);

            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(999));
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            await _bannerService.Criar(_banner);
            BannerController controller = new BannerController(_bannerService, _mapper, _appSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
        }

        public void Dispose()
        {
            _stream.Close();
            _connection.Close();
        }
    }
}
