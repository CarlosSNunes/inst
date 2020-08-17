using Xunit;
using System;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Extensions.Options;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Models.Perfil;
using Neotix.Neocms.CarePlusAPI.Services;
using Neotix.Neocms.CarePlusAPI.Controllers;

namespace Neotix.Neocms.CarePlusAPI.Tests.Controllers
{
    public class PerfilControllerTest : IDisposable
    {
        private readonly PerfilService PerfilService;
        private readonly IMapper Mapper;
        private readonly IOptions<AppSettings> AppSettings;
        private readonly DbContextOptions<DataContext> DbOptions;
        private readonly SqliteConnection Connection;
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
                Id = 1,
                Descricao = "ADM"
            },
            new PerfilUpdateModel {
                Id = 2,
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
            var result = new PerfilController(PerfilService, Mapper, AppSettings);
            Assert.NotNull(result);
        }

        [Fact]
        public async void GetSucesso()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByIdSucesso()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByIdErro()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(999));
        }

        [Fact]
        public async void GetByIdErroZero()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
        }

        [Fact]
        public async void PostSucesso()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            IActionResult result = await controller.Post(PerfisCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void PostErro()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(new List<PerfilCreateModel>()));
        }

        [Fact]
        public async void PostErroNulo()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null));
        }

        [Fact]
        public async void PutSucesso()
        {
            await PerfilService.Criar(Perfis);

            using (DataContext context = new DataContext(DbOptions))
            {
                PerfilService service = new PerfilService(context);
                PerfilController controller = new PerfilController(service, Mapper, AppSettings);
                IActionResult result = await controller.Put(PerfisUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void PutErro()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(new List<PerfilUpdateModel>()));
        }

        [Fact]
        public async void PutErroNulo()
        {
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
        }

        [Fact]
        public async void DeleteSucesso()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void DeleteErro()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(999));
        }

        [Fact]
        public async void DeleteErroZero()
        {
            await PerfilService.Criar(Perfis);
            PerfilController controller = new PerfilController(PerfilService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
