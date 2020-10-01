using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CarePlusAPI.Tests.Services
{
    public class NewsletterServiceTest : IDisposable
    {
        private readonly SqliteConnection _connection;
        private readonly DbContextOptions<DataContext> _options;
        private readonly NewsletterService _newsletterService;
        private readonly Newsletter _news = new Newsletter
        {
            Id = 1,
            NomeCompleto = "Teste1",
            Email = "teste1@teste1.com",
            DataCadastro = DateTime.Now
        };

        public NewsletterServiceTest()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_options))
                context.Database.EnsureCreated();

            _newsletterService = new NewsletterService(new DataContext(_options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _newsletterService.Criar(_news);

            var result = await _newsletterService.Listar();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task BuscarErro()
        {
            await _newsletterService.Criar(_news);

            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Buscar(999));
        }

        [Fact]
        public async Task BuscarErroZero()
        {
            await _newsletterService.Criar(_news);

            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Buscar(0));
        }

        [Fact]
        public async Task BuscarSucesso()
        {
            await _newsletterService.Criar(_news);

            var result = await _newsletterService.Buscar(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task CriarSucesso()
        {
            await _newsletterService.Criar(_news);
            return;
        }

        [Fact]
        public async Task CriarErro()
        {
            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Criar(null));
        }

        [Fact]
        public async Task CriarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Criar(null));
        }

        [Fact]
        public async Task AtualizarSucesso()
        {
            await _newsletterService.Criar(_news);
            await _newsletterService.Atualizar(_news);
            return;
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await _newsletterService.Criar(_news);
            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Atualizar(null));
        }

        [Fact]
        public async Task AtualizarErroNulo()
        {
            await _newsletterService.Criar(_news);
            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Atualizar(null));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            await _newsletterService.Criar(_news);
            await _newsletterService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await _newsletterService.Criar(_news);
            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Excluir(999));
        }

        [Fact]
        public async Task ExcluirErroZero()
        {
            await _newsletterService.Criar(_news);
            await Assert.ThrowsAsync<AppException>(() => _newsletterService.Excluir(0));
        }
        public void Dispose()
        {
            _connection.Close();
        }
    }
}