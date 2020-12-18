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

        private readonly Post _post2 = new Post
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
            Titulo = "teste",
            CategoriaId = 2,
            Ativo = '1',
            Slug = "teste",
            Destaque = '1'
        };

        private readonly Post _post3 = new Post
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
            Titulo = "teste 1",
            CategoriaId = 2,
            Ativo = '1',
            Slug = "teste-1",
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
            await _postService.Criar(_post, null);

            var page = 0;
            var pageSize = 5;

            var result = await _postService.Listar(page, pageSize, null, null);
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task ListaSucessoAtivoOrigem()
        {
            await _postService.Criar(_post, null);

            var page = 0;
            var pageSize = 5;

            var result = await _postService.Listar(page, pageSize, '1', "institucional");
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task BuscarMaisLidos()
        {
            await _postService.Criar(_post, null);

            var page = 0;
            var pageSize = 5;

            var result = await _postService.BuscarMaisLidos(page, pageSize, '1', "institucional");
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task ListaPorTermoSucesso()
        {
            await _postService.Criar(_post, null);
            var page = 0;
            var pageSize = 5;

            string termo = "teste";

            var result = await _postService.BuscarPorTermo(termo, page, pageSize, null, "institucional");
            Assert.NotEmpty(result.Item2);
        }

        [Fact]
        public async Task ListaPorTermoErro()
        {
            try
            {
                var page = 0;
                var pageSize = 5;

                string termo = "teste";

                var result = await _postService.BuscarPorTermo(termo, page, pageSize, null, "institucional");
            }
            catch (Exception ex)
            {

                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task BuscarPorSlugHitSucesso()
        {
            await _postService.Criar(_post, null);

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
                await _postService.Criar(_post, null);
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task CriarErroNull()
        {
            await Assert.ThrowsAsync<AppException>(() => _postService.Criar(null, null));
        }

        [Fact]
        public async Task CriarSucessoSlugExistente()
        {
            try
            {
                using (DataContext context = new DataContext(Options))
                {
                    Post _createPost2 = _post2;
                    await context.Set<Post>().AddAsync(_createPost2);

                    await context.SaveChangesAsync();

                    Post _createPost3 = _post3;
                    await context.Set<Post>().AddAsync(_createPost3);

                    await context.SaveChangesAsync();


                    Post _createPost = _post;

                    _createPost.Titulo = "teste";
                    await _postService.Criar(_createPost, false);
                }
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
                await _postService.Criar(_post, null);
                await _postService.Atualizar(_post);
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task AtualizarPostNuloErro()
        {
            await Assert.ThrowsAsync<AppException>(() => _postService.Atualizar(null));
        }

        [Fact]
        public async Task AtualizarSucessoSlugExistente()
        {
            try
            {
                using (DataContext context = new DataContext(Options))
                {
                    Post _updatePost = _post;
                    await context.Set<Post>().AddAsync(_updatePost);

                    await context.SaveChangesAsync();

                    Post _updatePost2 = _post2;
                    await context.Set<Post>().AddAsync(_post2);

                    await context.SaveChangesAsync();

                    Post _updatePost3 = _post3;
                    await context.Set<Post>().AddAsync(_post3);

                    await context.SaveChangesAsync();

                    _updatePost.Titulo = "teste";
                    await _postService.Atualizar(_updatePost);
                }
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task BuscarPorCategoriaSucessoAtivoEOrigem()
        {
            try
            {
                await _postService.Criar(_post, false);
                await _postService.BuscarPorCategoria(1, 0, 50, '1', "institucional");
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }


        [Fact]
        public async Task BuscarPostsRelacionadosSucessoAtivoEOrigem()
        {
            try
            {
                await _postService.Criar(_post, false);
                await _postService.BuscarPostsRelacionados(1, 0, 50, "titulo-teste", '1', "institucional");
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task BuscarPorCategoriaErroIdZero()
        {
            await Assert.ThrowsAsync<AppException>(() => _postService.BuscarPorCategoria(0, 0, 50, null, null));
        }


        [Fact]
        public async Task BuscarPorTermoAtivo()
        {
            try
            {
                await _postService.Criar(_post, false);
                await _postService.BuscarPorTermo("teste", 0, 50, '1', "institucional");
                return;
            }
            catch (Exception ex)
            {
                Assert.Null(ex.Message);
            }
        }

        [Fact]
        public async Task BuscarPorTermoErroNull()
        {
            await Assert.ThrowsAsync<AppException>(() => _postService.BuscarPorTermo(null, 0, 50, '1', "institucional"));
        }

        [Fact]
        public async Task ExcluirSucesso()
        {
            try
            {
                await _postService.Criar(_post, null);
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
            await _postService.Criar(_post, null);
            await Assert.ThrowsAsync<AppException>(() => _postService.Excluir("test"));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
