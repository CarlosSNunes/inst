using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System;
using System.Threading.Tasks;
using Xunit;
using System.Collections.Generic;

namespace CarePlusAPI.Tests.Services
{
    public class BannerServiceTest : IDisposable
    {
        private readonly BannerService _bannerService;
        private readonly DbContextOptions<DataContext> Options;
        private readonly SqliteConnection _connection;
        private readonly Banner _banner = new Banner
        {
            DataCadastro = DateTime.Now,
            Descricao = "Campanha contra o cancer",
            NomeImagemDesktop = "",
            NomeImagemMobile = "",
            LinkExterno = '0',
            Rota = "/campanha/cancer",
            Titulo = "Faça seus exames",
            UsuarioId = 1,
            Area = "home",
            Ativo = '1'
        };

        private readonly List<Banner> _banners = new List<Banner>();
       

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


            // banner 1
            _banners.Add(new Banner
            {
                DataCadastro = DateTime.Now,
                Descricao = "Campanha contra o cancer",
                NomeImagemDesktop = "",
                NomeImagemMobile = "",
                LinkExterno = '0',
                Rota = "/campanha/cancer",
                Titulo = "Faça seus exames",
                UsuarioId = 1,
                Area = "home",
                Ativo = '1',
                Ordem = 0
            });

            // banner 2
            _banners.Add(new Banner
            {
                DataCadastro = DateTime.Now,
                Descricao = "Campanha contra o cancer",
                NomeImagemDesktop = "",
                NomeImagemMobile = "",
                LinkExterno = '0',
                Rota = "/campanha/cancer",
                Titulo = "Faça seus exames",
                UsuarioId = 1,
                Area = "home",
                Ativo = '1',
                Ordem = 1
            });

            // banner 3
            _banners.Add(new Banner
            {
                DataCadastro = DateTime.Now,
                Descricao = "Campanha contra o cancer",
                NomeImagemDesktop = "",
                NomeImagemMobile = "",
                LinkExterno = '0',
                Rota = "/campanha/cancer",
                Titulo = "Faça seus exames",
                UsuarioId = 1,
                Area = "home",
                Ativo = '1',
                Ordem = 2
            });

            // banner 4
            _banners.Add(new Banner
            {
                DataCadastro = DateTime.Now,
                Descricao = "Campanha contra o cancer",
                NomeImagemDesktop = "",
                NomeImagemMobile = "",
                LinkExterno = '0',
                Rota = "/campanha/cancer",
                Titulo = "Faça seus exames",
                UsuarioId = 1,
                Area = "home",
                Ativo = '1',
                Ordem = 3
            });
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _bannerService.Criar(_banner);

            int page = 0;
            int pageSize = 20;
            var result = await _bannerService.Listar(page, pageSize, null, null);
            Assert.NotEmpty(result.Item2);
        }


        [Fact]
        public async Task ListaSucessoAtivoEArea()
        {
            await _bannerService.Criar(_banner);

            int page = 0;
            int pageSize = 20;
            var result = await _bannerService.Listar(page, pageSize, '1', "home");
            Assert.NotEmpty(result.Item2);
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
        public async Task BuscaPorAreaSucesso()
        {
            await _bannerService.Criar(_banner);

            var result = await _bannerService.BuscarPorArea("home");
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task CriarSucesso()
        {
            await _bannerService.Criar(_banner);
            return;
        }


        [Fact]
        public async Task CriarInativoComMaisDe4Banners()
        {
            using (DataContext context = new DataContext(Options))
            {

                foreach (var banner in _banners)
                {
                    await context.Set<Banner>().AddAsync(banner);
                }

                await context.SaveChangesAsync();

                Banner bannerInativo = _banner;

                bannerInativo.Ativo = '0';
                bannerInativo.Ordem = 4;

                await _bannerService.Criar(_banner);
            }
            return;
        }


        [Fact]
        public async Task CriarInativoComNenhumBanner()
        {
            Banner bannerInativo = _banner;

            bannerInativo.Ativo = '0';

            await _bannerService.Criar(_banner);
            return;
        }


        [Fact]
        public async Task CriarAtivoComMaisDe4Banners()
        {
            using (DataContext context = new DataContext(Options))
            {
                foreach (var banner in _banners)
                {
                    await context.Set<Banner>().AddAsync(banner);
                }

                await context.SaveChangesAsync();

                Banner bannerAtivo = _banner;

                bannerAtivo.Ativo = '1';
                bannerAtivo.Ordem = 4;

                await _bannerService.Criar(bannerAtivo);
            }
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
            await _bannerService.Atualizar(_banner, false, false);
            return;
        }


        [Fact]
        public async Task AtualizarSucessoTrocandoDeOrdemComMaisDe4BannersAtivo()
        {
            using (DataContext context = new DataContext(Options))
            {
                List<Banner> bannersList = _banners;
                bannersList.Add(new Banner
                {
                    DataCadastro = DateTime.Now,
                    Descricao = "Campanha contra o cancer",
                    NomeImagemDesktop = "",
                    NomeImagemMobile = "",
                    LinkExterno = '0',
                    Rota = "/campanha/cancer",
                    Titulo = "Faça seus exames",
                    UsuarioId = 1,
                    Area = "home",
                    Ativo = '1',
                    Ordem = 4
                });

                bannersList.Add(new Banner
                {
                    DataCadastro = DateTime.Now,
                    Descricao = "Campanha contra o cancer",
                    NomeImagemDesktop = "",
                    NomeImagemMobile = "",
                    LinkExterno = '0',
                    Rota = "/campanha/cancer",
                    Titulo = "Faça seus exames",
                    UsuarioId = 1,
                    Area = "home",
                    Ativo = '1',
                    Ordem = 5
                });

                foreach (var banner in bannersList)
                {
                    await context.Set<Banner>().AddAsync(banner);
                }

                await context.SaveChangesAsync();

                await _bannerService.Atualizar(bannersList[5], true, true);
            }
            return;
        }


        [Fact]
        public async Task AtualizarSucessoTrocandoDeOrdemComMaisDe4BannersInativo()
        {
            using (DataContext context = new DataContext(Options))
            {
                List<Banner> bannersList = _banners;
                bannersList.Add(new Banner
                {
                    DataCadastro = DateTime.Now,
                    Descricao = "Campanha contra o cancer",
                    NomeImagemDesktop = "",
                    NomeImagemMobile = "",
                    LinkExterno = '0',
                    Rota = "/campanha/cancer",
                    Titulo = "Faça seus exames",
                    UsuarioId = 1,
                    Area = "home",
                    Ativo = '1',
                    Ordem = 4
                });

                foreach (var banner in bannersList)
                {
                    await context.Set<Banner>().AddAsync(banner);
                }

                await context.SaveChangesAsync();

                Banner bannerAtivo = _banner;

                bannerAtivo.Ativo = '0';
                bannerAtivo.Ordem = 5;

                await _bannerService.Criar(bannerAtivo);
                await _bannerService.Atualizar(bannerAtivo, false, true);
            }
            return;
        }


        [Fact]
        public async Task AtualizarSucessoTrocandoDeOrdemSemNenhumBannerInativo()
        {
            Banner bannerAtivo = _banner;

            bannerAtivo.Ativo = '0';
            bannerAtivo.Ordem = 0;

            await _bannerService.Criar(bannerAtivo);
            await _bannerService.Atualizar(bannerAtivo, false, true);
            return;
        }

        [Fact]
        public async Task AtualizarErro()
        {
            await _bannerService.Criar(_banner);
            await Assert.ThrowsAsync<AppException>(() => _bannerService.Atualizar(null, false, false));
        }


        [Fact]
        public async Task AtualizarDiversosSucesso()
        {
            using (DataContext context = new DataContext(Options))
            {
                List<Banner> bannersList = _banners;

                await context.SaveChangesAsync();

                await _bannerService.AtualizarDiversos(bannersList);
            }
            return;
        }

        [Fact]
        public async Task GetBannersInIdsSucesso()
        {
            using (DataContext context = new DataContext(Options))
            {
                List<Banner> bannersList = _banners;

                await context.SaveChangesAsync();

                List<int> ids = new List<int>();

                foreach (Banner banner in bannersList)
                {
                    ids.Add(banner.Id);
                }

                List<Banner> result = await _bannerService.GetBannersInIds("home", ids);
                Assert.IsType<List<Banner>>(result);
            }
            return;
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            using (DataContext context = new DataContext(Options))
            {
                List<Banner> bannersList = _banners;
                bannersList.Add(new Banner
                {
                    DataCadastro = DateTime.Now,
                    Descricao = "Campanha contra o cancer",
                    NomeImagemDesktop = "",
                    NomeImagemMobile = "",
                    LinkExterno = '0',
                    Rota = "/campanha/cancer",
                    Titulo = "Faça seus exames",
                    UsuarioId = 1,
                    Area = "home",
                    Ativo = '1',
                    Ordem = 4
                });

                foreach (var banner in bannersList)
                {
                    await context.Set<Banner>().AddAsync(banner);
                }

                await context.SaveChangesAsync();
            }

            await _bannerService.Excluir(5);
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
