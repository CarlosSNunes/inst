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
            CategoriaId = 1
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
                context.Categoria.Add(new Categoria { Id = 1, Descricao = "Saúde" });
                context.Tag.Add(new Tag { Id = 1, Descricao = "Saúde" });

                context.SaveChanges();
            }

            _postService = new PostService(new DataContext(Options));
        }

        [Fact]
        public async Task ListaSucesso()
        {
            await _postService.Criar(_post);

            var result = await _postService.Listar();
            Assert.NotEmpty(result);
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
                await _postService.Excluir(1);
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
            await Assert.ThrowsAsync<AppException>(() => _postService.Excluir(999));
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
