using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Services;
using Xunit;

namespace Neotix.Neocms.CarePlusAPI.Tests.Services
{
    public class TagServiceTest : IDisposable
    {
        private readonly TagService TagService;
        private readonly DbContextOptions<DataContext> Options;
        private readonly SqliteConnection Connection;
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
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            Options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(Options))
                context.Database.EnsureCreated();

            TagService = new TagService(new DataContext(Options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await TagService.Criar(Tags);

            var result = await TagService.Listar();
            Assert.NotEmpty(result);
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
