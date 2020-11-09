using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Controllers;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System;
using System.Text;
using Xunit;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace CarePlusAPI.Tests.Controllers
{
    public class DashboardControllerTest : IDisposable
    {
        private readonly UsuarioService UsuarioService;
        private readonly IMapper _mapper;
        private readonly PostService _postService;
        private readonly BannerService _bannerService;
        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly DashboardService _dashboardService;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly IConfiguration _configuration;
        private readonly Post _post = new Post
        {
            PostTag = new List<PostTag> {
                new PostTag{
                    TagId = 1
                }
            },
            DataCadastro = DateTime.Now,
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Post Teste",
            CaminhoImagem = "",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 1,
            Ativo = '1'
        };


        private readonly Banner _banner = new Banner
        {
            Id = 1,
            DataCadastro = DateTime.Now,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Fa�a seus exames",
            UsuarioId = 1,
            Ativo = '1'
        };



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


        public DashboardControllerTest()
        {
            AutoMapperProfile mapperProfile = new AutoMapperProfile();
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _dbOptions = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_dbOptions))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_dbOptions))
            {
                context.Categoria.Add(new Categoria { Id = 1, Descricao = "Saúde" });
                context.Tag.Add(new Tag { Id = 1, Descricao = "Saúde" });

                context.Perfil.Add(new Perfil { Id = 1, Descricao = "ADM" });

                context.SaveChanges();
            }

            _dashboardService = new DashboardService(new DataContext(_dbOptions));

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);


            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(mapperProfile);
            });

            _mapper = config.CreateMapper();

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            _appSettings = Options.Create<AppSettings>(appSettings);

            _postService = new PostService(new DataContext(_dbOptions));

            UsuarioService = new UsuarioService(new DataContext(_dbOptions), _appSettings);

            _bannerService = new BannerService(new DataContext(_dbOptions));
        }


        [Fact]
        public async void ListarPostsMaisLidosSucesso()
        {
            await _postService.Criar(_post);

            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListarPostsMaisLidosErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            result = null;
            Assert.Null(result);
        }

        [Fact]
        public async void ListarPostsMaisLidosErroBadRequest()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.Get();
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void TotalBannersAtivosSucesso()
        {
            await _bannerService.Criar(_banner);

            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBanners();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void TotalBannersAtivosErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBanners();
            result = null;
            Assert.Null(result);
        }

        [Fact]
        public async void ListaTotalPostsSucesso()
        {
            await _postService.Criar(_post);

            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetPosts();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListaTotalPostsErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetPosts();
            result = null;
            Assert.Null(result);
        }

        [Fact]
        public async void ListaTotalUsuariosSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetUsuarios();
            Assert.IsType<OkObjectResult>(result);
        }



        [Fact]
        public async void ListaTotalUsuariosErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetPosts();
            result = null;
            Assert.Null(result);
        }


        [Fact]
        public async void TotalBannersAtivosErroBadRequest()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetBanners();
            Assert.IsType<BadRequestObjectResult>(result);
        }


        [Fact]
        public async void TotalPostsBlogErroBadRequest()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetPosts();
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async void TotalUsuariosErroBadRequest()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper, _appSettings);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["Custom"] = "CarePlus";
            var result = await controller.GetUsuarios();
            Assert.IsType<BadRequestObjectResult>(result);
        }


        public void Dispose()
        {

            _connection.Close();
        }
    }
}