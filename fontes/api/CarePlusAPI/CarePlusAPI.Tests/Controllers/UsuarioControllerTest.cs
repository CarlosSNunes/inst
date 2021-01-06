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
using CarePlusHomolog;
using System.Threading.Tasks;
using static CarePlusHomolog.PartnerServiceClient;

namespace CarePlusAPI.Tests.Controllers
{
    public class UsuarioControllerTest : IDisposable
    {
        private readonly UsuarioService _usuarioService;
        private readonly Mock<PartnerServiceClient> _partnerServiceClientMock;
        private readonly Mock<UsuarioService> usuarioServiceMock;
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
            NomeUsuario = "teste.careplus",
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
            NomeUsuario = "teste.careplus",
            Nome = "Thiago",
            Senha = "123",
            UsuarioRoot = '1',
            UsuarioPerfil = new List<PerfilCreateModel> {
                new PerfilCreateModel {
                    PerfilId = 1
                }
            }
        };

        private readonly UsuarioUpdateModel UsuarioUpdateModel = new UsuarioUpdateModel
        {
            NomeUsuario = "teste.careplus",
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
            NomeUsuario = "teste.careplus",
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

            _usuarioService = new UsuarioService(new DataContext(DbOptions), AppSettings, _getCipherMock.Object);

            _partnerServiceClientMock = new Mock<PartnerServiceClient>(EndpointConfiguration.SOAPEndPointPartner); ;

            usuarioServiceMock = new Mock<UsuarioService>(new DataContext(DbOptions), AppSettings, _getCipherMock.Object);

            usuarioServiceMock.Setup(us => us.ValidaUsuario("teste.careplus", "1234")).ReturnsAsync(true);

            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            Mapper = config.CreateMapper();
        }

        [Fact]
        public void ConstrutorSucesso()
        {
            var result = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListaSucesso()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await _usuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await _usuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(2);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void BuscarErroZero()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.GetById(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarSucesso()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(UsuarioCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            UsuarioCreateModel.Senha = "";
            IActionResult result = await controller.Post(UsuarioCreateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void CriarErroNulo()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Post(null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            await _usuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(1, UsuarioUpdateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void AtualizarErro()
        {
            await _usuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(2, UsuarioUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroZero()
        {

            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(0, UsuarioUpdateModel);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Put(1, null);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            await _usuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await _usuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(2);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            IActionResult result = await controller.Delete(0);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void AutenticarSucesso()
        {
            await _usuarioService.Criar(Usuario, "1234");
            UsuarioController controller = new UsuarioController(usuarioServiceMock.Object, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            UsuarioAutenticadoModel usuarioAutenticadoMock = UsuarioAutenticadoModel;
            usuarioAutenticadoMock.Senha = "1234";
            IActionResult result = await controller.Autenticar(usuarioAutenticadoMock);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void AutenticarErro()
        {
            Usuario usuarioAutenticaErro = Usuario;
            usuarioAutenticaErro.UsuarioRoot = '1';
            await _usuarioService.Criar(usuarioAutenticaErro, "123");
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
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
            UsuarioController controller = new UsuarioController(_usuarioService, Mapper, AppSettings, _seriLogMock.Object, _getCipherMock.Object);
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
