using Neotix.Neocms.CarePlusAPI.Helpers;
using Neotix.Neocms.CarePlusAPI.Services;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Data.Sqlite;
using Neotix.Neocms.CarePlusAPI.Entities;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Extensions.Options;

namespace Neotix.Neocms.CarePlusAPI.Tests.Services
{
    public class UsuarioServiceTest : IDisposable
    {
        private readonly UsuarioService UsuarioService;
        private readonly DbContextOptions<DataContext> _options;
        private readonly SqliteConnection Connection;
        private readonly IOptions<AppSettings> _appSettings;
        private IConfiguration _configuration;


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

        public UsuarioServiceTest()
        {
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            _options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(_options))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_options))
            {
                context.Perfil.Add(new Perfil { Id = 1, Descricao = "ADM" });
                context.SaveChanges();
            }

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            IConfigurationSection appSettingsSection = _configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();
            
            _appSettings = Options.Create<AppSettings>(appSettings);

            UsuarioService = new UsuarioService(new DataContext(_options), _appSettings);
        }

        [Fact]
        public async Task AutenticacaoErro()
        {
            string email = "thiago@email.com";
            string senha = "123456";

            await UsuarioService.Criar(Usuario, "123");

            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Autenticar(email, senha));
        }

        [Fact]
        public async Task AutenticacaoSucesso()
        {
            string email = "thiago@email.com";
            string senha = "123";

            await UsuarioService.Criar(Usuario, "123");

            var result = await UsuarioService.Autenticar(email, senha);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task AutenticacaoEmailNulo()
        {
            string email = null;
            string senha = "123";

            await UsuarioService.Criar(Usuario, "123");

            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Autenticar(email, senha));
        }

        [Fact]
        public async Task AutenticacaoSenhaNula()
        {
            string email = "thiago@email.com";
            string senha = null;

            await UsuarioService.Criar(Usuario, "123");

            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Autenticar(email, senha));
        }

        [Fact]
        public async Task ListaNaoVazia()
        {
            await UsuarioService.Criar(Usuario, "123");

            var result = await UsuarioService.Listar();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task BuscaErro()
        {
            await UsuarioService.Criar(Usuario, "123");

            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Buscar(999));
        }

        [Fact]
        public async Task BuscaErroZero()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Buscar(0));
        }

        [Fact]
        public async Task BuscaSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");

            var result = await UsuarioService.Buscar(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task ValidarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");

            var result = UsuarioService.Validar(1);
            Assert.True(result);
        }

        [Fact]
        public async Task ValidarErro()
        {
            await UsuarioService.Criar(Usuario, "123");

            var result = UsuarioService.Validar(2);
            Assert.False(result);
        }

        [Fact]
        public void ValidarErroZero()
        {
            Assert.Throws<AppException>(() => UsuarioService.Validar(0));
        }

        [Fact]
        public async Task CriarUsuarioNovo()
        {
            var result = await UsuarioService.Criar(Usuario, "123");
            Assert.NotNull(result);
        }

        [Fact]
        public async Task CriarUsuarioNovoSenhaVazia()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Criar(Usuario, null));
        }
        [Fact]
        public async Task CriarUsuarioNovoUsuarioNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Criar(null, "123"));
        }

        [Fact]
        public async Task CriarUsuarioNovoSenhaApenasEspaco()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Criar(Usuario, "     "));
        }

        [Fact]
        public async Task CriarUsuarioExistente()
        {
            await UsuarioService.Criar(Usuario, "123");
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Criar(Usuario, "123"));
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await UsuarioService.Criar(Usuario, "123");
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Atualizar(new Usuario(), "123"));
        }

        [Fact]
        public async Task AtualizarErroNulo()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Atualizar(null, "123"));
        }

        [Fact]
        public async Task IsAtualizarSucesso()
        {
            await UsuarioService.Criar(Usuario, "123");
            await UsuarioService.Atualizar(Usuario, "123");
            return;
        }

        [Fact]
        public async Task AtualizarNovosDados()
        {
            await UsuarioService.Criar(Usuario, "123");
            Usuario usuarioModel = new Usuario
            {
                DataCadastro = DateTime.Now,
                Email = "wendel@email.com",
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
            await UsuarioService.Atualizar(usuarioModel, "123");
            return;
        }

        [Fact]
        public async Task AtualizarNovosDadosEmailExistente()
        {
            await UsuarioService.Criar(Usuario, "123");
            Usuario usuarioModel = new Usuario
            {
                DataCadastro = DateTime.Now,
                Email = "wendel@email.com",
                Id = 2,
                Nome = "Wendel",
                UsuarioPerfil = new List<UsuarioPerfil>
                {
                    new UsuarioPerfil
                    {
                        Id = 2,
                        PerfilId = 1
                    }
                }
            };
            await UsuarioService.Criar(usuarioModel, "123");
            Usuario usuarioEmailRepetido = new Usuario
            {
                DataCadastro = DateTime.Now,
                Email = "wendel@email.com",
                Id = 1,
                Nome = "Wendel",
                UsuarioPerfil = new List<UsuarioPerfil>
                {
                    new UsuarioPerfil
                    {
                        Id = 1,
                        PerfilId = 1
                    }
                }
            };
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Atualizar(usuarioEmailRepetido, "123"));
        }

        [Fact]
        public async Task ExcluirExiste()
        {
            await UsuarioService.Criar(Usuario, "123");
            await UsuarioService.Excluir(1);
            return;
        }

        [Fact]
        public async Task ExcluirNaoExiste()
        {
            await UsuarioService.Criar(Usuario, "123");
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Excluir(2));
        }

        [Fact]
        public async Task ExcluirIdZero()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Excluir(0));
        }

        [Fact]
        public async Task ExcluirPerfisIdZero()
        {
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.ExcluirPerfis(0));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
