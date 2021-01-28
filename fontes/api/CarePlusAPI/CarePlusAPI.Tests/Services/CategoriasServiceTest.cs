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
    public class CategoriasServiceTest : IDisposable
    {
        private readonly SqliteConnection _connection;
        private readonly DbContextOptions<DataContext> _options;
        private readonly CategoriasService _categoriasService;
        private readonly Categoria _categoria = new Categoria
        {
            Id = 1,
            Titulo = "Teste1",
            Descricao = "DescricaoTeste1",
            DataCadastro = DateTime.Now
        };

        public CategoriasServiceTest()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_options))
                context.Database.EnsureCreated();

            _categoriasService = new CategoriasService(new DataContext(_options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _categoriasService.Criar(_categoria);
            int offset = 0;
            int limit = 2;
            var result = await _categoriasService.Listar(offset, limit);
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task BuscarErro()
        {
            await _categoriasService.Criar(_categoria);

            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Buscar(999));
        }

        [Fact]
        public async Task BuscarErroZero()
        {
            await _categoriasService.Criar(_categoria);

            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Buscar(0));
        }

        [Fact]
        public async Task BuscarSucesso()
        {
            await _categoriasService.Criar(_categoria);

            var result = await _categoriasService.Buscar(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task CriarSucesso()
        {
            await _categoriasService.Criar(_categoria);
            return;
        }

        [Fact]
        public async Task CriarErro()
        {
            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Criar(null));
        }

        [Fact]
        public async Task CriarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Criar(null));
        }

        [Fact]
        public async Task AtualizarSucesso()
        {
            await _categoriasService.Criar(_categoria);
            await _categoriasService.Atualizar(_categoria);
            return;
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await _categoriasService.Criar(_categoria);
            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Atualizar(null));
        }

        [Fact]
        public async Task AtualizarErroNulo()
        {
            await _categoriasService.Criar(_categoria);
            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Atualizar(null));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            await _categoriasService.Criar(_categoria);
            await _categoriasService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await _categoriasService.Criar(_categoria);
            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Excluir(999));
        }

        [Fact]
        public async Task ExcluirErroZero()
        {
            await _categoriasService.Criar(_categoria);
            await Assert.ThrowsAsync<AppException>(() => _categoriasService.Excluir(0));
        }
        public void Dispose()
        {
            _connection.Close();
        }
    }
}