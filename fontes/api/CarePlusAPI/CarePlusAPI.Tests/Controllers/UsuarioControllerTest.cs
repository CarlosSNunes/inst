using Xunit;
using System;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Controllers;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Services;
using Neotix.Neocms.CarePlusAPI.Entities;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Extensions.Options;
using AutoMapper;
using Neotix.Neocms.CarePlusAPI.Models.Usuario;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Neotix.Neocms.CarePlusAPI.Models.Perfil;

namespace Neotix.Neocms.CarePlusAPI.Tests.Controllers
{
    public class UsuarioControllerTest : IDisposable
    {
        private readonly UsuarioService UsuarioService;
        private readonly IMapper Mapper;
        private readonly IOptions<AppSettings> AppSettings;
        private readonly DbContextOptions<DataContext> DbOptions;
        private readonly SqliteConnection Connection;
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

            UsuarioService = new UsuarioService(new DataContext(DbOptions));
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
        public void ConstrutorSucesso()
        {
            var result = new UsuarioController(UsuarioService, Mapper, AppSettings);
            Assert.NotNull(result);
        }

        [Fact]
        public async void ListaSucesso()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void BuscarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(2));
        }

        [Fact]
        public async void BuscarErroZero()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
        }

        [Fact]
        public async void CriarSucesso()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            IActionResult result = await controller.Post(UsuarioCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void CriarErro()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            UsuarioCreateModel.Senha = "     ";
            await Assert.ThrowsAsync<AppException>(() => controller.Post(UsuarioCreateModel));
        }

        [Fact]
        public async void CriarErroNulo()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null));
        }

        [Fact]
        public async void AtualizarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            IActionResult result = await controller.Put(1, UsuarioUpdateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void AtualizarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(2, UsuarioUpdateModel));
        }

        [Fact]
        public async void AtualizarErroZero()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(0, UsuarioUpdateModel));
        }

        [Fact]
        public async void AtualizarErroNulo()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(1, null));
        }

        [Fact]
        public async void ExcluirSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void ExcluirErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(2));
        }

        [Fact]
        public async void ExcluirErroZero()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
        }

        [Fact]
        public async void AutenticarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            IActionResult result = await controller.Autenticar(UsuarioAutenticadoModel);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void AutenticarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            UsuarioAutenticadoModel.Senha = "12345645665";
            await Assert.ThrowsAsync<AppException>(() => controller.Autenticar(UsuarioAutenticadoModel));
        }

        [Fact]
        public async void AutenticarErroNulo()
        {
            UsuarioController controller = new UsuarioController(UsuarioService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Autenticar(null));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
