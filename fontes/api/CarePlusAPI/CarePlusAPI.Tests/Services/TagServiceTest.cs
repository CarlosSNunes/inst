using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using Xunit;
using Moq;

namespace CarePlusAPI.Tests.Services
{
    public class TagServiceTest : IDisposable
    {
        private readonly TagService TagService;
        private readonly DbContextOptions<DataContext> Options;
        private readonly SqliteConnection Connection;
        private readonly Mock<IGetCipher> _getCipherMock = new Mock<IGetCipher>();
        private readonly List<Tag> Tags = new List<Tag>
        {
            new Tag {
                Id = 1,
                Descricao = "ADM"
            },
            new Tag {
                Id = 2,
                Descricao = "Marketing"
            },
        };

        public TagServiceTest()
        {
            _getCipherMock.Setup(s => s.Decrypt(It.IsAny<string>())).Returns("aaaaa");

            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            Options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(Options, _getCipherMock.Object))
                context.Database.EnsureCreated();

            TagService = new TagService(new DataContext(Options, _getCipherMock.Object));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await TagService.Criar(Tags);
            int offset = 1;
            int limit = 5;

            var result = await TagService.Listar(offset, limit);
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task BuscarErro()
        {
            await TagService.Criar(Tags);

            await Assert.ThrowsAsync<AppException>(() => TagService.Buscar(999));
        }

        [Fact]
        public async Task BuscarErroZero()
        {
            await Assert.ThrowsAsync<AppException>(() => TagService.Buscar(0));
        }

        [Fact]
        public async Task BuscarSucesso()
        {
            await TagService.Criar(Tags);

            var result = await TagService.Buscar(1);
            Assert.NotNull(result);
        }


        [Fact]
        public async Task CriarSucesso()
        {
            await TagService.Criar(Tags);
            return;
        }

        [Fact]
        public async Task CriarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => TagService.Criar(null));
        }

        [Fact]
        public async Task CriarErroVazio()
        {
            await Assert.ThrowsAsync<AppException>(() => TagService.Criar(new List<Tag>()));
        }

        [Fact]
        public async Task AtualizarSucesso()
        {
            await TagService.Criar(Tags);
            await TagService.Atualizar(Tags);
            return;
        }

        [Fact]
        public async Task AtualizarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => TagService.Atualizar(null));
        }

        [Fact]
        public async Task AtualizarErroVazio()
        {
            await Assert.ThrowsAsync<AppException>(() => TagService.Atualizar(new List<Tag>()));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            await TagService.Criar(Tags);
            await TagService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await TagService.Criar(Tags);
            await Assert.ThrowsAsync<AppException>(() => TagService.Excluir(999));
        }

        [Fact]
        public async Task ExcluirErroZero()
        {
            await TagService.Criar(Tags);
            await Assert.ThrowsAsync<AppException>(() => TagService.Excluir(0));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
