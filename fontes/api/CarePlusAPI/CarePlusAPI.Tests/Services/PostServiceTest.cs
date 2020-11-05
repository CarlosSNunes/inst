using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CarePlusAPI.Tests.Services
{
    public class PostServiceTest : IDisposable
    {
        private readonly PostService _postService;
        private readonly DbContextOptions<DataContext> Options;
        private readonly SqliteConnection Connection;
        private readonly Post _post = new Post
        {
            PostTag = new List<PostTag> {
                new PostTag{
                    TagId = 3
                }
            },
            DataCadastro = DateTime.Now,
            DataExpiracao = DateTime.Now.AddDays(7),
            DataPublicacao = DateTime.Now.AddDays(1),
            DescricaoPrevia = "Post Teste",
            CaminhoImagem = "",
            Subtitulo = "Subtitulo teste",
            Titulo = "Titulo teste",
            CategoriaId = 2,
            Ativo = '1',
            Slug = "post-teste",
            Destaque = '1' 
        };

        public PostServiceTest()
        {
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            Options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(Connection)
                    .Options;

            using (DataContext context = new DataContext(Options))
                context.Database.EnsureCreated();

            using (DataContext context = new DataContext(Options))
            {
                context.Categoria.Add(new Categoria { Id = 2, Descricao = "Saúde" });
                context.Tag.Add(new Tag { Id = 3, Descricao = "Saúde" });
                // context.Entry(new Categoria { Id = 2, CategoriaDescricao = "Saúde" }).State = EntityState.Detached;
                // context.Entry(new Tag { Id = 1, Descricao = "Saúde" }).State = EntityState.Detached;

                context.SaveChanges();
            }

            _postService = new PostService(new DataContext(Options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _postService.Criar(_post);

            var page = 1;
            var pageSize = 5;

            var result = await _postService.Listar(page, pageSize);
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task BuscarMaisLidos()
        {
            await _postService.Criar(_post);

            var page = 1;
            var pageSize = 5;

            var result = await _postService.BuscarMaisLidos(page, pageSize);
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task BuscarMaisLidosErro()
        {
            try
            {

                var page = 1;
                var pageSize = 5;

                var result = await _postService.BuscarMaisLidos(page, pageSize);

            }
            catch (Exception ex)
            {

                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task ListaPorTermoSucesso()
        {
            await _postService.Criar(_post);
            var page = 1;
            var pageSize = 5;

            string termo = "teste";

            var result = await _postService.BuscarPorTermo(termo, page, pageSize);
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task ListaPorTermoErro()
        {
            try
            {
                var page = 1;
                var pageSize = 5;

                string termo = "teste";

                var result = await _postService.BuscarPorTermo(termo, page, pageSize);
            }
            catch (Exception ex)
            {

                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task BuscarPorSlugHitSucesso()
        {
            await _postService.Criar(_post);

            string slug = "titulo-teste";

            var result = await _postService.BuscarPorSlugHit(slug);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task BuscarPorSlugHitErroPostNull()
        {
            string slug = "titulo-teste";
            await Assert.ThrowsAsync<AppException>(() => _postService.BuscarPorSlugHit(slug));
        }

        [Fact]
        public async Task BuscarPorSlugHitNull()
        {
            string slug = "";
            await Assert.ThrowsAsync<AppException>(() => _postService.BuscarPorSlugHit(slug));
        }

        [Fact]
        public async Task CriarSucesso()
        {
            try
            {
                await _postService.Criar(_post);
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }


        [Fact]
        public async Task AtualizarSucesso()
        {
            try
            {
                await _postService.Criar(_post);
                await _postService.Atualizar(_post);
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            try
            {
                await _postService.Criar(_post);
                await _postService.Excluir("titulo-teste");
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task ExcluirErro()
        {
            await _postService.Criar(_post);
            await Assert.ThrowsAsync<AppException>(() => _postService.Excluir("test"));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
