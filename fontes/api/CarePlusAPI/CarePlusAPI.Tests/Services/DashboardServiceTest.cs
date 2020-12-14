using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CarePlusAPI.Tests.Services
{
    public class DashboardServiceTest : IDisposable
    {
        private readonly DashboardService _dashboardService;
        private readonly DbContextOptions<DataContext> _options;
        private readonly SqliteConnection _connection;
        private readonly UsuarioService _usuarioService;
        private readonly BannerService _bannerService;
        private readonly PostService _postService;
        private readonly IConfiguration _configuration;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly Post _post = new Post
        {
            Id = 1,
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
            Vizualizacoes = 5,
            CategoriaId = 1,
            Ativo = '1',
            DescricaoPaginaSEO = "dafsfa",
            Destaque = '0',
            NomeImagem = "asdfas",
            TituloPaginaSEO = "afsdafdf"
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
            Ativo = '1'
        };

        public DashboardServiceTest()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            _options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(_connection)
                    .Options;

            using (DataContext context = new DataContext(_options))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(_options))
            {
                context.Categoria.Add(new Categoria { Id = 1, Descricao = "Saúde" });
                context.Tag.Add(new Tag { Id = 1, Descricao = "Saúde" });

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


            _dashboardService = new DashboardService(new DataContext(_options));

            _postService = new PostService(new DataContext(_options));

            _usuarioService = new UsuarioService(new DataContext(_options), _appSettings);

            _bannerService = new BannerService(new DataContext(_options));

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        }

        [Fact]
        public async Task ListarPostsMaisLidosSucesso()
        {
            await _postService.Criar(_post, null);

            var result = await _dashboardService.ListarPostsMaisLidos();
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task ListarPostsMaisLidosErro()
        {
            try
            {
                var result = await _dashboardService.ListarPostsMaisLidos();
            }
            catch (Exception ex)
            {

                Assert.NotNull(ex.Message);
            }
        }

        [Fact]
        public async Task TotalBannersAtivosSucesso()
        {

            await _bannerService.Criar(_banner);

            var result = await _dashboardService.TotalBannersAtivos();
            Assert.True(result > 0);
        }

        [Fact]
        public async Task TotalBannersAtivosErro()
        {
            try
            {
                var result = await _dashboardService.TotalBannersAtivos();

            }
            catch (Exception ex)
            {

                Assert.NotNull(ex.Message);
            }
        }

        [Fact]
        public async Task ListaTotalPostsSucesso()
        {
            await _postService.Criar(_post, null);

            var result = await _dashboardService.TotalPostsBlog();
            Assert.NotEqual(0, result);
        }

        [Fact]
        public async Task ListaTotalPostsErro()
        {
            try
            {
                var result = await _dashboardService.TotalPostsBlog();
            }
            catch (Exception ex)
            {
                Assert.NotNull(ex.Message);
            }
        }

        [Fact]
        public async Task ListaTotalUsuariosSucesso()
        {

            await _usuarioService.Criar(Usuario, "123");

            var result = await _dashboardService.TotalUsuarios();
            Assert.True(result > 0);
        }


        [Fact]
        public async Task ListaTotalUsuariosErro()
        {
            try
            {
                var result = await _dashboardService.TotalUsuarios();
            }
            catch (Exception ex)
            {

                Assert.NotNull(ex.Message);
            }
        }

        public void Dispose()
        {
            _connection.Close();
        }
    }
}
