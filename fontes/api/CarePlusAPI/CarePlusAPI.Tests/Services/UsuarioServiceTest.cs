using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System.Threading.Tasks;
using Xunit;
using Microsoft.Data.Sqlite;
using CarePlusAPI.Entities;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Extensions.Options;
using Moq;
using CarePlusAPI.Models.Usuario;
using CarePlusAPI.Models.Perfil;

namespace CarePlusAPI.Tests.Services
{
    public class UsuarioServiceTest : IDisposable
    {
        private readonly UsuarioService UsuarioService;
        private readonly DbContextOptions<DataContext> _options;
        private readonly SqliteConnection Connection;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly Mock<IGetCipher> _getCipherMock = new Mock<IGetCipher>();
        private IConfiguration _configuration;


        private readonly Usuario Usuario = new Usuario
        {
            DataCadastro = DateTime.Now,
            NomeUsuario = "teste.careplus",
            Id = 1,
            Nome = "Thiago",
            UsuarioRoot = '1',
            UsuarioPerfil = new List<UsuarioPerfil>
            {
                new UsuarioPerfil
                {
                    Id = 1,
                    PerfilId = 1
                }
            }
        };

        private readonly UsuarioCreateModel _usuarioCreateModel = new UsuarioCreateModel
        {
            NomeUsuario = "teste.careplus",
            Nome = "Thiago",
            UsuarioRoot = '1',
            UsuarioPerfil = new List<PerfilCreateModel>
            {
                new PerfilCreateModel
                {
                    PerfilId = 3,
                    Descricao = "Vizualizador"
                }
            }
        };

        public UsuarioServiceTest()
        {
            _getCipherMock.Setup(s => s.Decrypt("aaaa")).Returns("aaaaa");

            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            _options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
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

            UsuarioService = new UsuarioService(new DataContext(_options, _getCipherMock.Object), _appSettings, _getCipherMock.Object);
        }

        [Fact]
        public async Task AutenticacaoErro()
        {
            string email = "teste.careplus";
            string senha = "123456";

            await UsuarioService.Criar(Usuario, "123");

            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Autenticar(email, senha));
        }

        [Fact]
        public async Task AutenticacaoSucesso()
        {
            string email = "teste.careplus";
            string senha = "123";

            await UsuarioService.Criar(Usuario, senha);

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
                NomeUsuario = "teste.carepluss",
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
        public async Task AtualizarNovosDadosNomeUsuarioExistente()
        {
            await UsuarioService.Criar(Usuario, "123");
            Usuario usuarioModel = new Usuario
            {
                DataCadastro = DateTime.Now,
                NomeUsuario = "teste.carepluss",
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
            Usuario usuarioNomeUsuarioRepetido = new Usuario
            {
                DataCadastro = DateTime.Now,
                NomeUsuario = "teste.carepluss",
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
            await Assert.ThrowsAsync<AppException>(() => UsuarioService.Atualizar(usuarioNomeUsuarioRepetido, "123"));
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

        [Fact]
        public async Task BuscarRequisicoesCadastroPorNomeUsuarioFalse()
        {
            bool requisicao = await UsuarioService.BuscarRequisicoesCadastroPorNomeUsuario("teste.careplus");
            Assert.Equal(requisicao, false);
            Assert.IsType<bool>(requisicao);
        }

        [Fact]
        public async Task BuscarRequisicoesCadastroPorNomeUsuarioTrue()
        {
            await UsuarioService.Criar(Usuario, "123");
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {

                context.RequisicaoUsuario.Add(new RequisicaoUsuario {
                    NomeUsuario = "teste.careplus",
                    Nome = "teste.careplus",
                    Token = "dfdfdf",
                    Sucesso = '0',
                    Expirado = '0',
                    DataCadastro = DateTime.Now
                });
                context.SaveChanges();
            }
            bool requisicao = await UsuarioService.BuscarRequisicoesCadastroPorNomeUsuario("teste.careplus");
            Assert.Equal(requisicao, true);
            Assert.IsType<bool>(requisicao);
        }


        [Fact]
        public async Task BuscarRequisicoesCadastro()
        {
            IList<RequisicaoUsuario> requisicoes = await UsuarioService.BuscarRequisicoesCadastro();
            Assert.IsType<List<RequisicaoUsuario>>(requisicoes);
        }

        [Fact]
        public async Task BuscarRequisicoesCadastroPendente()
        {
            Tuple<int, List<RequisicaoUsuario>> requisicoes = await UsuarioService.BuscarRequisicoesCadastroPendente(0, 10);
            Assert.IsType<Tuple<int, List<RequisicaoUsuario>>>(requisicoes);
        }

        [Fact]
        public async Task SalvarRequisicao()
        {
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {

                context.Perfil.Add(new Perfil
                {
                    Descricao = "Visualizador",
                    Prioridade = 3,
                });

                context.SaveChanges();
            }
            string requisicao = await UsuarioService.SalvarRequisicao(_usuarioCreateModel);
            Assert.IsType<string>(requisicao);
        }

        [Fact]
        public async Task SalvarRequisicaoErro()
        {
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {

                context.Perfil.Add(new Perfil
                {
                    Descricao = "Visualizador",
                    Prioridade = 3,
                });

                context.SaveChanges();

                context.RequisicaoUsuario.Add(new RequisicaoUsuario
                {
                    NomeUsuario = "teste.careplus",
                    Nome = "teste.careplus",
                    Token = "dfdfdf",
                    Sucesso = '0',
                    Expirado = '0',
                    DataCadastro = DateTime.Now,
                });
                context.SaveChanges();
            }
            Assert.ThrowsAsync<AppException>(() => UsuarioService.SalvarRequisicao(_usuarioCreateModel));
        }

        [Fact]
        public async Task SalvarRequisicaoNulo()
        {
            Assert.ThrowsAsync<AppException>(() => UsuarioService.SalvarRequisicao(null));
        }

        [Fact]
        public async Task ValidateTokenRequisition()
        {
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {

                context.Perfil.Add(new Perfil
                {
                    Descricao = "Visualizador",
                    Prioridade = 3,
                });

                context.SaveChanges();

                context.RequisicaoUsuario.Add(new RequisicaoUsuario
                {
                    NomeUsuario = "teste.careplus",
                    Nome = "teste.careplus",
                    Token = "dfdfdf",
                    Sucesso = '0',
                    Expirado = '0',
                    DataCadastro = DateTime.Now,
                });
                context.SaveChanges();
            }
            RequisicaoUsuario requisicao = await UsuarioService.ValidateTokenRequisition("dfdfdf");
            Assert.IsType<RequisicaoUsuario>(requisicao);
        }


        [Fact]
        public async Task ValidateTokenRequisitionErro()
        {
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {

                context.Perfil.Add(new Perfil
                {
                    Descricao = "Visualizador",
                    Prioridade = 3,
                });

                context.SaveChanges();
            }
            Assert.ThrowsAsync<AppException>(() => UsuarioService.ValidateTokenRequisition("dfdfdf"));
        }

        [Fact]
        public async Task ValidateTokenRequisitionNulo()
        {
            Assert.ThrowsAsync<AppException>(() => UsuarioService.ValidateTokenRequisition(null));
        }

        [Fact]
        public async Task RemoveRequisition()
        {
            await UsuarioService.Criar(Usuario, "123");
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {

                context.RequisicaoUsuario.Add(new RequisicaoUsuario
                {
                    NomeUsuario = "teste.careplus",
                    Nome = "teste.careplus",
                    Token = "dfdfdf",
                    Sucesso = '0',
                    Expirado = '0',
                    DataCadastro = DateTime.Now
                });
                context.SaveChanges();
            }
            RequisicaoUsuario requisicao = await UsuarioService.RemoveRequisition("dfdfdf");
            Assert.IsType<RequisicaoUsuario>(requisicao);
        }

        [Fact]
        public async Task RemoveRequisitioNulo()
        {
            Assert.ThrowsAsync<AppException>(() => UsuarioService.RemoveRequisition(null));
        }


        [Fact]
        public async Task RemoveRequisitioNotFound()
        {
            Assert.ThrowsAsync<AppException>(() => UsuarioService.RemoveRequisition("sddfsf"));
        }

        [Fact]
        public async Task ListarAcoesDesativacaoUsuariosSucesso()
        {
            await UsuarioService.ListarAcoesDesativacaoUsuarios();
        }

        [Fact]
        public async Task InativarUsuarioSucesso()
        {
            using (DataContext context = new DataContext(_options, _getCipherMock.Object))
            {
                context.Usuario.Add(Usuario);
                await context.SaveChangesAsync();
            }


            await UsuarioService.InativarUsuario(Usuario.NomeUsuario, Usuario.Id);
        }

        [Fact]
        public async Task InativarUsuarioErro()
        {
            Assert.ThrowsAsync<AppException>(() => UsuarioService.InativarUsuario(Usuario.NomeUsuario, Usuario.Id));
        }

        [Fact]
        public async Task InativarUsuarioNulo()
        {
            Assert.ThrowsAsync<AppException>(() => UsuarioService.InativarUsuario(null, Usuario.Id));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
