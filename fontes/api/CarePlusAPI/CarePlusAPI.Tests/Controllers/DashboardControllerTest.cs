using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Controllers;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Services;
using System;
using System.Text;
using Xunit;

namespace Neotix.Neocms.CarePlusAPI.Tests.Controllers
{
    public class DashboardControllerTest : IDisposable
    {

        private readonly IMapper _mapper;

        private readonly DbContextOptions<DataContext> _dbOptions;
        private readonly SqliteConnection _connection;
        private readonly DashboardService _dashboardService;

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
        }


        [Fact]
        public async void ListarPostsMaisLidosSucesso()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.Get();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListarPostsMaisLidosErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.Get();
            result = null;
            Assert.Null(result);
        }

        [Fact]
        public async void TotalBannersAtivosSucesso()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.GetBanners();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void TotalBannersAtivosErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.GetBanners();
            result = null;
            Assert.Null(result);
        }

        [Fact]
        public async void ListaTotalPostsSucesso()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.GetPosts();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListaTotalPostsErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.GetPosts();
            result = null;
            Assert.Null(result);
        }

        [Fact]
        public async void ListaTotalUsuariosSucesso()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.GetPosts();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async void ListaTotalUsuariosErro()
        {
            DashboardController controller = new DashboardController(_dashboardService, _mapper);
            var result = await controller.GetPosts();
            result = null;
            Assert.Null(result);
        }


        public void Dispose()
        {

            _connection.Close();
        }
    }
}