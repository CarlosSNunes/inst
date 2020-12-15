using Xunit;
using System;
using CarePlusAPI.Helpers;
using CarePlusAPI.Controllers;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Services;
using CarePlusAPI.Entities;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Extensions.Options;
using AutoMapper;
using CarePlusAPI.Models.Usuario;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CarePlusAPI.Models.Perfil;
using Microsoft.AspNetCore.Http;
using Moq;

namespace CarePlusAPI.Tests.Controllers
{
    public class UsuarioControllerTest : IDisposable
    {
        private readonly UsuarioService UsuarioService;
        private readonly IMapper Mapper;
        private readonly IOptions<AppSettings> AppSettings;
        private readonly DbContextOptions<DataContext> DbOptions;
        private readonly SqliteConnection Connection;
        private readonly Mock<SeriLog> _seriLogMock = new Mock<SeriLog>();
        private readonly Mock<GetCipher> _getCipherMock = new Mock<GetCipher>();
        private SeriLog seriLog;
        private readonly IConfiguration Configuration;
        private readonly Usuario Usuario = new Usuario
        {
            DataCadastro = DateTime.Now,
            Email = "thiago@email.com",
            Id = 1,
            Nome = "Thiago",
            UsuarioPerfil = new List<UsuarioPerfil>
            {
                new UsuarioPerfil
                {
                    Id = 1,
                    PerfilId = 1
                }
            }
        };

        private readonly UsuarioCreateModel UsuarioCreateModel = new UsuarioCreateModel
        {
            Email = "thiago@email.com",
            Nome = "Thiago",
            Senha = "123",
            UsuarioPerfil = new List<PerfilCreateModel> {
                new PerfilCreateModel {
                    PerfilId = 1
                }
            }
        };

        private readonly UsuarioUpdateModel UsuarioUpdateModel = new UsuarioUpdateModel
        {
            Email = "thiago@email.com",
            Nome = "Thiago",
            Senha = "123",
            UsuarioPerfil = new List<PerfilUpdateModel> {
                new PerfilUpdateModel {
                    PerfilId = 1
                }
            }
        };

        private readonly UsuarioAutenticadoModel UsuarioAutenticadoModel = new UsuarioAutenticadoModel
        {
            Email = "thiago@email.com",
            Senha = "123"
        };

        public UsuarioControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            _seriLogMock.Setup(s => s.Log(EnumLogType.Error, "aaaa", "CarePlus"));

            DbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(DbOptions))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(DbOptions))
            {
                context.Perfil.Add(new Perfil { Id = 1, Descricao = "ADM" });
                context.SaveChanges();
            }

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();

            IConfigurationSection appSettingsSection = Configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            AppSettings = Options.Create<AppSettings>(appSettings);

            _getCipherMock.Setup(s => s.Decrypt(AppSettings.Value.Secret)).Returns("SECRET API CAREPLUS TESTE");

            UsuarioService = new UsuarioService(new DataContext(DbOptions), AppSettings, _getCipherMock.Object);

            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            Mapper = config.CreateMapper();
        }

        [Fact]
        public void ConstrutorSucesso()
        {
            var result = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListaSucesso()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(2);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void BuscarErroZero()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarSucesso()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(UsuarioCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            UsuarioCreateModel.Senha = "     ";
            IActionResult result = await controller.Post(UsuarioCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(1, UsuarioUpdateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void AtualizarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(2, UsuarioUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroZero()
        {

            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(0, UsuarioUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(1, null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(2);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AutenticarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Autenticar(UsuarioAutenticadoModel);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void AutenticarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            UsuarioAutenticadoModel.Senha = "12345645665";
            IActionResult result = await controller.Autenticar(UsuarioAutenticadoModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AutenticarErroNulo()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Autenticar(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
