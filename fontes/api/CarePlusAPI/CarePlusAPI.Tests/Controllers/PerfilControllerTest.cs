using AutoMapper;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Perfil;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using Xunit;

namespace CarePlusAPI.Tests.Controllers
{
    public class PerfilControllerTest : IDisposable
    {
        private readonly PerfilService PerfilService;
        private readonly IMapper Mapper;
        private readonly IOptions<AppSettings> AppSettings;
        private readonly DbContextOptions<DataContext> DbOptions;
        private readonly SqliteConnection Connection;
        private readonly Mock<SeriLog> _seriLogMock = new Mock<SeriLog>();
        private readonly IConfiguration Configuration;
        private readonly List<Perfil> Perfis = new List<Perfil>
        {
            new Perfil {
                Id = 1,
                Descricao = "ADM"
            },
            new Perfil {
                Id = 2,
                Descricao = "Marketing"
            }
        };

        private readonly List<PerfilCreateModel> PerfisCreateModel = new List<PerfilCreateModel>
        {
            new PerfilCreateModel {
                Descricao = "ADM"
            },
            new PerfilCreateModel {
                Descricao = "ADM"
            },
        };

        private readonly List<PerfilUpdateModel> PerfisUpdateModel = new List<PerfilUpdateModel>
        {
            new PerfilUpdateModel {
                PerfilId = 1,
                Descricao = "ADM"
            },
            new PerfilUpdateModel {
                PerfilId = 2,
                Descricao = "Marketing"
            },
        };

        public PerfilControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            DbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(DbOptions))
                context.Database.EnsureCreated();

            _seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

            PerfilService = new PerfilService(new DataContext(DbOptions));
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();

            IConfigurationSection appSettingsSection = Configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            AppSettings = Options.Create<AppSettings>(appSettings);

            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            Mapper = config.CreateMapper();
        }

        [Fact]
        public void Contrutor()
        {
            var controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            Assert.NotNull(controller);
        }

        [Fact]
        public async void GetSucesso()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByIdSucesso()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByIdErro()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(999);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void GetByIdErroZero()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void PostSucesso()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(PerfisCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void PostErro()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(new List<PerfilCreateModel>());
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void PostErroNulo()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void PutSucesso()
        {
            await PerfilService.Criar(Perfis);

            using (DataContext context = new DataContext(DbOptions))
            {
                PerfilService service = new PerfilService(context);
                PerfilController controller = new PerfilController(service, Mapper, AppSettings, _seriLogMock.Object);
                controller.ControllerContext = new ControllerContext();
                controller.ControllerContext.HttpContext = new DefaultHttpContext();
                controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
                IActionResult result = await controller.Put(PerfisUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void PutErro()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(new List<PerfilUpdateModel>());
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void PutErroNulo()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void DeleteSucesso()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void DeleteErro()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(999);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void DeleteErroZero()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings, _seriLogMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
