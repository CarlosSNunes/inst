using CarePlusAPI.Entities;
using CarePlusAPI.Enums;
using CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface IPostService
    {
        Task<Tuple<int, List<Post>>> Listar(int page, int pageSize, char? ativo, string? origem);
        Task<Tuple<int, List<Post>>> BuscarMaisLidos(int page, int pageSize, char? ativo, string? origem);
        Task<Tuple<int, List<Post>>> BuscarPostsRelacionados(int id, int page, int pageSize, string slug, char? ativo, string? origem);
        Task<Tuple<int, List<Post>>> BuscarPorCategoria(int id, int page, int pageSize, char? ativo, string? origem);
        Task<Tuple<int, List<Post>>> BuscarPorTermo(string term, int page, int pageSize, char? ativo, string? origem);
        Task<Post> BuscarPorSlug(string slug);
        Task<Post> BuscarPorSlugHit(string slug);

        Task Criar(Post model, bool? duplication);
        Task Atualizar(Post model);
        Task Excluir(string slug);
    }

    public class PostService : IPostService
    {
        private readonly DataContext Db;

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public PostService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos os Post da base.
        ///
        ///</summary>
        public async Task<Tuple<int, List<Post>>> Listar(int page, int pageSize, char? ativo, string origem)
        {
            IQueryable<Post> query = Db.Post.AsQueryable();

            query = query.AsNoTracking();
                    

            if (ativo != null)
            {
                query = (IOrderedQueryable<Post>)query.Where(p => p.Ativo == ativo);
            }

            if (origem != null && origem == OriginEnumerator.institucional.ToDescriptionString())
                {
                query = (IOrderedQueryable<Post>)query.Where(
                    p => p.DataPublicacao <= DateTime.Now
                    || (p.DataExpiracao != null && p.DataExpiracao > DateTime.Now && p.DataPublicacao >= DateTime.Now)
                );
            }

            query = query
                .Include("Categoria")
                .Include("PostTag.Tag")
                .OrderByDescending(p => p.Destaque)
                .ThenByDescending(p => p.DataCadastro);

            var count = await query.CountAsync();

            var result = await PagingResults.GetPaged<Post>(query, page, pageSize);

            return new Tuple<int, List<Post>>(count, result.Results);
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um Post por Id.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        public async Task<Post> BuscarPorSlug(string slug)
        {
            if (string.IsNullOrWhiteSpace(slug))
                throw new AppException("O slug do Post não pode ser estar vazio");

            Post post = await Db.Set<Post>()
                                        .AsNoTracking()
                                        .Include("Categoria")
                                        .Include("PostTag.Tag")
                                        .FirstOrDefaultAsync(n => n.Slug == slug);

            if (post == null)
                throw new AppException("Post não localizado");

            return post;
        }


        ///<summary>
        ///
        ///Esse método serve para buscar um Post pelo slug, pode retornal null ou um post, e é utilizado vara validar a criação de um novo post pelo slug.
        ///
        ///</summary>
        ///<param name="slug">Slug do Post</param>
        public async Task<Post> BuscarPorSlugCriacao(string slug)
        {

            Post post = await Db.Set<Post>()
                                        .AsNoTracking()
                                        .Include("Categoria")
                                        .Include("PostTag.Tag")
                                        .FirstOrDefaultAsync(n => n.Slug.Equals(slug));

            return post;
        }

            ///<summary>
            ///
            ///Esse método serve para inserir um Post na base.
            ///
            ///</summary>
            ///<param name="post">Model de Post para ser inserido</param>
            public async Task Criar(Post post, bool? duplication)
        {
            if (post == null)
                throw new AppException("O Post não pode estar nulo");

            if (post.Destaque == '1')
            {
                var destaques = await VerificaDestaque();

                await AtualizaDestaque(destaques);
            }

            post.Slug = GeraSlug(post.Titulo);

            var numero = 1;
            var postExistente = await BuscarPorSlugCriacao(post.Slug);

            if (postExistente != null)
            {
                while(postExistente != null)
                {
                    var titulo = $"{post.Titulo} {numero}";
                    post.Slug = GeraSlug(titulo);
                    postExistente = await BuscarPorSlugCriacao(post.Slug);
                    if (postExistente != null)
                    {
                        numero++;
                    }
                }
            }

            if (duplication != null)
            {
                post.Titulo = $"[Duplicado] - {post.Titulo}";
            }

            await Db.Set<Post>().AddAsync(post);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para atualizar um Post na base.
        ///
        ///</summary>
        ///<param name="post">Model de Post para ser atualizado</param>
        public async Task Atualizar(Post post)
        {
            if (post == null)
                throw new AppException("O Post não pode estar nulo");

            await ExcluirTags(post.Id);

            post.Slug = GeraSlug(post.Titulo);

            var numero = 1;
            var postExistente = await BuscarPorSlugCriacao(post.Slug);

            if (postExistente != null && postExistente.Id != post.Id)
            {
                while (postExistente != null && postExistente.Id != post.Id)
                {
                    var titulo = $"{post.Titulo} {numero}";
                    post.Slug = GeraSlug(titulo);
                    postExistente = await BuscarPorSlugCriacao(post.Slug);
                    if (postExistente != null && postExistente.Id != post.Id)
                    {
                        numero++;
                    }
                }
            }

            Db.Set<Post>().Update(post);

            await Db.SaveChangesAsync();
        }

        public async Task<Tuple<int, List<Post>>> BuscarPorCategoria(int id, int page, int pageSize, char? ativo, string? origem)
        {
            if (id == 0)
                throw new AppException("O id da categoria não pode ser igual a 0");

            IQueryable<Post> query = Db.Set<Post>().AsQueryable();

            query = query.AsNoTracking()
                                    .Where(p =>
                                    p.CategoriaId == id);

            if (ativo != null)
            {
                query = query.Where(p => p.Ativo == ativo);
            }

            if (origem != null && origem == OriginEnumerator.institucional.ToDescriptionString())
            {
                query = query.Where(
                    p => p.DataPublicacao <= DateTime.Now
                    || (p.DataExpiracao != null && p.DataExpiracao > DateTime.Now && p.DataPublicacao >= DateTime.Now)
                );
            }

            query = query.OrderBy(c => c.DataCadastro)
                .Include("Categoria")
                .Include("PostTag.Tag");

            var count = await query.CountAsync();

            var result = await PagingResults.GetPaged<Post>(query, page, pageSize);

            return new Tuple<int, List<Post>>(count, result.Results);
        }

        public async Task<Tuple<int, List<Post>>> BuscarPostsRelacionados(int id, int page, int pageSize, string slug, char? ativo, string? origem)
        {

            IQueryable<Post> query = Db.Set<Post>().AsQueryable();

            query = query.AsNoTracking()
                                    .Where(p =>
                                    p.CategoriaId == id
                                    && p.Slug != slug);

            if (ativo != null)
            {
                query.Where(p => p.Ativo == ativo);
            }

            if (origem != null && origem == OriginEnumerator.institucional.ToDescriptionString())
            {
                query.Where(
                    p => p.DataPublicacao <= DateTime.Now
                    || (p.DataExpiracao != null && p.DataExpiracao > DateTime.Now && p.DataPublicacao >= DateTime.Now)
                );
            }

            query = query.OrderBy(c => c.DataCadastro)
                .Include("Categoria")
                .Include("PostTag.Tag");

            var count = await query.CountAsync();

            var result = await PagingResults.GetPaged<Post>(query, page, pageSize);

            return new Tuple<int, List<Post>>(count, result.Results);
        }

        public async Task<Tuple<int, List<Post>>> BuscarPorTermo(string term, int page, int pageSize, char? ativo, string? origem)
        {
            if (string.IsNullOrWhiteSpace(term))
                throw new AppException("O termo não pode estar vazio");

            IQueryable<Post> query = Db.Set<Post>().AsQueryable();


            query = query.AsNoTracking()
                                    .Where(x => x.Titulo.Contains(term)
                                    || x.Subtitulo.Contains(term)
                                    || x.DescricaoPaginaSEO.Contains(term)
                                    || x.TituloPaginaSEO.Contains(term)
                                    || x.DescricaoPrevia.Contains(term)
                                    || x.Slug.Contains(term));


            if (ativo != null)
            {
                query = (IOrderedQueryable<Post>)query.Where(p => p.Ativo == ativo);
            }

            if (origem != null && origem == OriginEnumerator.institucional.ToDescriptionString())
            {
                query = (IOrderedQueryable<Post>)query.Where(
                    p => p.DataPublicacao <= DateTime.Now
                    || (p.DataExpiracao != null && p.DataExpiracao > DateTime.Now && p.DataPublicacao >= DateTime.Now)
                );
            }

            query = query.Include("Categoria")
                                .Include("PostTag.Tag")
                                .OrderBy(c => c.DataCadastro);

            var count = await query.CountAsync();

            var result = await PagingResults.GetPaged<Post>(query, page, pageSize);

            return new Tuple<int, List<Post>>(count, result.Results);
        }

        public async Task<Tuple<int, List<Post>>> BuscarMaisLidos(int page, int pageSize, char? ativo, string? origem)
        {
            IQueryable<Post> query = Db.Set<Post>().AsQueryable();

            if (ativo != null)
            {
                query = (IOrderedQueryable<Post>)query.Where(p => p.Ativo == ativo);
            }

            if (origem != null && origem == OriginEnumerator.institucional.ToDescriptionString())
            {
                query = (IOrderedQueryable<Post>)query.Where(
                    p => p.DataPublicacao <= DateTime.Now
                    || (p.DataExpiracao != null && p.DataExpiracao > DateTime.Now && p.DataPublicacao >= DateTime.Now)
                );
            }

            query = query.AsNoTracking()
                            .Include("Categoria")
                            .Include("PostTag.Tag")
                            .OrderByDescending(p => p.Vizualizacoes)
                            .ThenBy(p => p.DataCadastro);


            var count = await query.CountAsync();

            var result = await PagingResults.GetPaged<Post>(query, page, pageSize);

            return new Tuple<int, List<Post>>(count, result.Results);
        }

        public async Task<Post> BuscarPorSlugHit(string slug)
        {
            if (string.IsNullOrWhiteSpace(slug))
                throw new AppException("O slug do Post não pode estar vazio.");

            Post post = await Db.Set<Post>()
                                        .AsNoTracking()
                                        .Include("Categoria")
                                        .Include("PostTag.Tag")
                                        .FirstOrDefaultAsync(n => n.Slug == slug);

            if (post == null)
                throw new AppException("Post não localizado");

            post.Vizualizacoes++;
            await RegistraHit(post);

            return post;
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um Post na base.
        ///
        ///</summary>
        ///<param name="id">Id do Post a ser excluído</param>
        public async Task Excluir(string slug)
        {

            Post entity = await Db.Set<Post>()
                                        .FirstOrDefaultAsync(n => n.Slug == slug);

            int id = entity != null ? entity.Id : 0;

            if (entity != null)
            {
                Db.Set<Post>().Remove(entity);

                await ExcluirTags(id);
                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("Post não encontrado");
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir as tags de um post na base.
        ///
        ///</summary>
        ///<param name="id">Id do post a ser excluído</param>
        private async Task ExcluirTags(int id)
        {
            List<PostTag> tags = await Db.PostTag.Where(b => b.PostId == id).ToListAsync();
            Db.RemoveRange(tags);
        }

        ///<summary>
        ///
        ///Esse método serve para registrar as vizualizaões um Post na base.
        ///
        ///</summary>
        ///<param name="post">Model de Post para ser atualizado</param>
       
        private async Task RegistraHit(Post post)
        {

            DetachLocal(x => x.Id == post.Id);

            Db.Set<Post>().Update(post).Property(x => x.Vizualizacoes).IsModified = true;

            await Db.SaveChangesAsync();
        }

        private void DetachLocal(Func<Post, bool> func)
        {
            var local = Db.Set<Post>().Local.Where(func).FirstOrDefault();

            if (local != null)
            {
                Db.Entry(local).State = EntityState.Detached;
            }
        }

        /// <summary>
        /// Esse método serve para verifciar se já existe um post com destaque na base.
        /// </summary>
        /// <returns></returns>
        private async Task<IList<Post>> VerificaDestaque()
        {
            IQueryable<Post> query = Db.Set<Post>()
                                               .AsQueryable()
                                               .AsNoTracking()
                                               .Where(p => p.Destaque.Equals('1'));

            return await query.ToListAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para registrar as vizualizaões um Post na base.
        ///
        ///</summary>
        ///<param name="posts">Model de Post para ser atualizado</param>
        [ExcludeFromCodeCoverage]
        private async Task AtualizaDestaque(IList<Post> posts)
        {

            foreach (var post in posts)
            {
                post.Destaque = '0';
            }

            Db.Set<Post>().UpdateRange(posts);

            await Db.SaveChangesAsync();
        }

        /// <summary>
        /// Esse método serve para gerar string Slug
        /// </summary>
        /// <param name="slug"></param>
        /// <returns></returns>
        private static string GeraSlug(string slug)
        {
            string str = RemoveAcentuacao(slug).ToLower();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim
            str = Regex.Replace(str, @"\s", "-"); // hyphens  

            return str;
        }
       
        private static string RemoveAcentuacao(string txt)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(txt);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }
       
    }
}