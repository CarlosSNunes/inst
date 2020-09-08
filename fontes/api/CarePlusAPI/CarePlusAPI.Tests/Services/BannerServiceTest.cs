using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Services;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Neotix.Neocms.CarePlusAPI.Tests.Services
{
    public class BannerServiceTest : IDisposable
    {
        private readonly BannerService _bannerService;
        private readonly DbContextOptions<DataContext> Options;
        private readonly SqliteConnection _connection;
        private readonly Banner _banner = new Banner
        {
            Id = 1,
            DataCadastro = DateTime.Now,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
            UsuarioId = 1,
        };

        public BannerServiceTest()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            Options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(Options))
                context.Database.EnsureCreated();

            _bannerService = new BannerService(new DataContext(Options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _bannerService.Criar(_banner);

            var result = await _bannerService.Listar();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task BuscaErro()
        {
            await _bannerService.Criar(_banner);

            await Assert.ThrowsAsync<AppException>(() => _bannerService.Buscar(999));
        }

        [Fact]
        public async Task BuscaErroZero()
        {
            await _bannerService.Criar(_banner);

            await Assert.ThrowsAsync<AppException>(() => _bannerService.Buscar(0));
        }

        [Fact]
        public async Task BuscaSucesso()
        {
            await _bannerService.Criar(_banner);

            var result = await _bannerService.Buscar(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task CriarSucesso()
        {
            await _bannerService.Criar(_banner);
            return;
        }

        [Fact]
        public async Task CriarErro()
        {
            await Assert.ThrowsAsync<AppException>(() => _bannerService.Criar(null));
        }

        [Fact]
        public async Task AtualizarSucesso()
        {
            await _bannerService.Criar(_banner);
            await _bannerService.Atualizar(_banner);
            return;
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await _bannerService.Criar(_banner);
            await Assert.ThrowsAsync<AppException>(() => _bannerService.Atualizar(null));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            await _bannerService.Criar(_banner);
            await _bannerService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await _bannerService.Criar(_banner);
            await Assert.ThrowsAsync<AppException>(() => _bannerService.Excluir(999));
        }

        [Fact]
        public async Task ExcluirErroZero()
        {
            await _bannerService.Criar(_banner);
            await Assert.ThrowsAsync<AppException>(() => _bannerService.Excluir(0));
        }

        public void Dispose()
        {
            _connection.Close();
        }
    }
}
