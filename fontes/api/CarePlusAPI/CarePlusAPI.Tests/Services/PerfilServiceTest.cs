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
    public class PerfilServiceTest : IDisposable
    {
        private readonly PerfilService PerfilService;
        private readonly DbContextOptions<DataContext> Options;
        private readonly SqliteConnection Connection;
        private readonly List<Perfil> Perfis = new List<Perfil>
        {
            new Perfil {
                Id = 1,
                Descricao = "ADM"
            },
            new Perfil {
                Id = 2,
                Descricao = "Marketing"
            },
        };
        private readonly Mock<IGetCipher> _getCipherMock = new Mock<IGetCipher>();

        public PerfilServiceTest()
        {
            _getCipherMock.Setup(s => s.Decrypt(It.IsAny<string>())).Returns("aaaaa");

            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            Options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(Options, _getCipherMock.Object))
                context.Database.EnsureCreated();

            PerfilService = new PerfilService(new DataContext(Options, _getCipherMock.Object));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await PerfilService.Criar(Perfis);

            var result = await PerfilService.Listar();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task BuscarErro()
        {
            await PerfilService.Criar(Perfis);

            await Assert.ThrowsAsync<AppException>(() => PerfilService.Buscar(999));
        }

        [Fact]
        public async Task BuscarErroZero()
        {
            await PerfilService.Criar(Perfis);

            await Assert.ThrowsAsync<AppException>(() => PerfilService.Buscar(0));
        }

        [Fact]
        public async Task BuscarSucesso()
        {
            await PerfilService.Criar(Perfis);

            var result = await PerfilService.Buscar(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task CriarSucesso()
        {
            await PerfilService.Criar(Perfis);
            return;
        }

        [Fact]
        public async Task CriarErro()
        {
            await Assert.ThrowsAsync<AppException>(() => PerfilService.Criar(new List<Perfil>()));
        }

        [Fact]
        public async Task CriarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => PerfilService.Criar(null));
        }

        [Fact]
        public async Task AtualizarSucesso()
        {
            await PerfilService.Criar(Perfis);
            await PerfilService.Atualizar(Perfis);
            return;
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await PerfilService.Criar(Perfis);
            await Assert.ThrowsAsync<AppException>(() => PerfilService.Atualizar(new List<Perfil>()));
        }

        [Fact]
        public async Task AtualizarErroNulo()
        {
            await PerfilService.Criar(Perfis);
            await Assert.ThrowsAsync<AppException>(() => PerfilService.Atualizar(null));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            await PerfilService.Criar(Perfis);
            await PerfilService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await PerfilService.Criar(Perfis);
            await Assert.ThrowsAsync<AppException>(() => PerfilService.Excluir(999));
        }

        [Fact]
        public async Task ExcluirErroZero()
        {
            await PerfilService.Criar(Perfis);
            await Assert.ThrowsAsync<AppException>(() => PerfilService.Excluir(0));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
