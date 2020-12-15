using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Categorias;
using CarePlusAPI.Services;
using System;
using System.IO;
using Xunit;
using Microsoft.AspNetCore.Http;
using Moq;

namespace CarePlusAPI.Tests.Controllers
{
    public class CategoriasControllerTest : IDisposable
    {
      private readonly CategoriasService _categoriasService;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly IConfiguration _configuration;
        private readonly Mock<SeriLog> _seriLogMock = new Mock<SeriLog>();
        private readonly Categoria _categorias = new Categoria
        {
            Id = 1,
            Titulo = "TituloTeste",
            Descricao = "DescricaoTeste",
            DataCadastro = DateTime.Now
        };

        private readonly CategoriasCreateModel _categoriasCreateModel = new CategoriasCreateModel
        {
            Titulo = "TituloTeste",
            Descricao = "DescricaoTeste"            
        };

        private readonly CategoriasUpdateModel _categoriasUpdateModel = new CategoriasUpdateModel
        {
            Id = 1,
            Titulo = "TituloTeste",
            Descricao = "DescricaoTeste" 
        };

        public CategoriasControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            _seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            _categoriasService = new CategoriasService(new DataContext(_dbOptions));
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
            var result = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListarSucesso()
        {
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            int page = 1;
            int pageSize = 5;
            var result = await controller.Get(page, pageSize);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await _categoriasService.Criar(_categorias);
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await _categoriasService.Criar(_categorias);
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(999);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void BuscarErroZero()
        {
            await _categoriasService.Criar(_categorias);
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarSucesso()
        {
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_categoriasCreateModel);
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
            var categoriasService = new CategoriasService(new DataContext(dbOptions));

            CategoriasController controller = new CategoriasController(categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(_categoriasCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null));
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            var c = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await c.Post(_categoriasCreateModel);

            using (DataContext context = new DataContext(_dbOptions))
            {
                CategoriasService service = new CategoriasService(context);
                CategoriasController controller = new CategoriasController(service, _mapper, _appSettings, _seriLogMock.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Put(_categoriasUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void AtualizarErro()
        {
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(_categoriasUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            var c = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            c.ControllerContext = new ControllerContext();
            c.ControllerContext.HttpContext = new DefaultHttpContext();
            c.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            await c.Post(_categoriasCreateModel);

            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await _categoriasService.Criar(_categorias);
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(999);
            Assert.IsType<BadRequestObjectResult>(result);            
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            await _categoriasService.Criar(_categorias);
            CategoriasController controller = new CategoriasController(_categoriasService, _mapper, _appSettings, _seriLogMock.Object);
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