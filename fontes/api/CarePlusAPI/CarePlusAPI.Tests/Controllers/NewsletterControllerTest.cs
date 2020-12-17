using AutoMapper;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Newsletter;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.IO;
using Xunit;

namespace CarePlusAPI.Tests.Controllers
{
    public class NewsletterControllerTest : IDisposable
    {
        private readonly NewsletterService _newsletterService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly Mock<SeriLog> _seriLogMock = new Mock<SeriLog>();
        private readonly Newsletter _newsletter = new Newsletter
        {
            Id = 1,
            DataCadastro = DateTime.Now,
            NomeCompleto = "NomeTeste",
            Email = "teste@teste.com"

        };

        private readonly NewsletterCreateModel _newsletterCreateModel = new NewsletterCreateModel
        {
            NomeCompleto = "NomeTeste",
            Email = "teste@teste.com"
        };

        private readonly NewsletterUpdateModel _newsletterUpdateModel = new NewsletterUpdateModel
        {
            Id = 1,
            NomeCompleto = "NomeTeste2",
            Email = "teste2@teste.com"
        };

        public NewsletterControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            _newsletterService = new NewsletterService(new DataContext(_dbOptions));
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
        }

        [Fact]
        public void ConstrutorSucesso()
        {
            var controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            Assert.NotNull(controller);
        }

        [Fact]
        public async void ListarSucesso()
        {
            await _newsletterService.Criar(_newsletter);
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListarErro()
        {
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await _newsletterService.Criar(_newsletter);
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await _newsletterService.Criar(_newsletter);
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(999);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void BuscarErroZero()
        {
            await _newsletterService.Criar(_newsletter);
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarSucesso()
        {
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_newsletterCreateModel);
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
            var newsletterService = new NewsletterService(new DataContext(dbOptions));

            NewsletterController controller = new NewsletterController(newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_newsletterCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(null);
            Assert.IsType<BadRequestObjectResult>(result);            
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            var c = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await c.Post(_newsletterCreateModel);

            using (DataContext context = new DataContext(_dbOptions))
            {
                NewsletterService service = new NewsletterService(context);
                NewsletterController controller = new NewsletterController(service, _mapper, _appSettings, _seriLogMock.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Put(_newsletterUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(_newsletterUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            var c = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await c.Post(_newsletterCreateModel);

            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await _newsletterService.Criar(_newsletter);
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(999);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            await _newsletterService.Criar(_newsletter);
            NewsletterController controller = new NewsletterController(_newsletterService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        public void Dispose()
        {

            _connection.Close();
        }
    }
}