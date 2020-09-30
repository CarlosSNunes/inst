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
using CarePlusAPI.Helpers;
using CarePlusAPI.Entities;
using CarePlusAPI.Models.Tag;
using CarePlusAPI.Services;
using CarePlusAPI.Controllers;

namespace CarePlusAPI.Tests.Controllers
{
    public class TagControllerTest : IDisposable
    {
        private readonly TagService TagService;
        private readonly IMapper Mapper;
        private readonly IOptions<AppSettings> AppSettings;
        private readonly DbContextOptions<DataContext> DbOptions;
        private readonly SqliteConnection Connection;
        private readonly IConfiguration Configuration;
        private readonly List<Tag> Tags = new List<Tag>
        {
            new Tag {
                Id = 1,
                Descricao = "ADM"
            },
            new Tag {
                Id = 2,
                Descricao = "Marketing"
            }
        };

        private readonly List<TagCreateModel> TagsCreateModel = new List<TagCreateModel>
        {
            new TagCreateModel {
                Descricao = "ADM"
            },
            new TagCreateModel {
                Descricao = "ADM"
            },
        };

        private readonly List<TagUpdateModel> TagsUpdateModel = new List<TagUpdateModel>
        {
            new TagUpdateModel {
                Id = 1,
                Descricao = "ADM"
            },
            new TagUpdateModel {
                Id = 2,
                Descricao = "Marketing"
            },
        };

        public TagControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            DbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(DbOptions))
                context.Database.EnsureCreated();

            TagService = new TagService(new DataContext(DbOptions));
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
        public void Construtor()
        {
            var result = new TagController(TagService, Mapper, AppSettings);
            Assert.NotNull(result);
        }

        [Fact]
        public async void GetSucesso()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByIdSucesso()
        {
            await TagService.Criar(Tags);
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            IActionResult result = await controller.GetById(1);
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void GetByIdErro()
        {
            await TagService.Criar(Tags);
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(999));
        }

        [Fact]
        public async void GetByIdErroZero()
        {
            await TagService.Criar(Tags);
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.GetById(0));
        }

        [Fact]
        public async void PostSucesso()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            IActionResult result = await controller.Post(TagsCreateModel);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void PostErroNulo()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(null));
        }

        [Fact]
        public async void PostErroVazio()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Post(new List<TagCreateModel>()));
        }

        [Fact]
        public async void PutSucesso()
        {
            await TagService.Criar(Tags);

            using (DataContext context = new DataContext(DbOptions))
            {
                TagService service = new TagService(context);
                TagController controller = new TagController(service, Mapper, AppSettings);
                IActionResult result = await controller.Put(TagsUpdateModel);
                Assert.IsType<OkResult>(result);
            }
        }

        [Fact]
        public async void PutErroNulo()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(null));
        }

        [Fact]
        public async void PutErroVazio()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Put(new List<TagUpdateModel>()));
        }

        [Fact]
        public async void DeleteSucesso()
        {
            await TagService.Criar(Tags);
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            IActionResult result = await controller.Delete(1);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async void DeleteErro()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(999));
        }

        [Fact]
        public async void DeleteErroZero()
        {
            TagController controller = new TagController(TagService, Mapper, AppSettings);
            await Assert.ThrowsAsync<AppException>(() => controller.Delete(0));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
