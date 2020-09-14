//===============================================================================
//Web API Post
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Post para uso do NEOCMS
//==============================================================================

using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Neotix.Neocms.CarePlusAPI.Services
{
    public interface IPostService
    {
        Task<List<Post>> Listar();
        Task<List<Post>> BuscarMaisLidos();
        Task<List<Post>> BuscarPorCategoria(int id);
        Task<Post> BuscarPorId(int id);
        Task<Post> BuscarPorIdHit(int id);

        Task Criar(Post model);
        Task Atualizar(Post model);
        Task Excluir(int id);
        //Task ExcluirTags(int id);
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
        public async Task<List<Post>> Listar()
        {
            return await Db.Set<Post>()
                                   .AsNoTracking()
                                   .Include(c => c.Categoria)
                                   .Include("PostTag.Tag")
                                   .OrderByDescending(p => p.Destaque)
                                   .ThenBy(p => p.DataCadastro)
                                   .ToListAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um Post por Id.
        ///
        ///</summary>
        ///<param name="id">Id do Post</param>
        public async Task<Post> BuscarPorId(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            Post post = await Db.Set<Post>()
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(n => n.Id == id);

            if (post == null)
                throw new AppException("Post não localizado");

            return post;
        }

        ///<summary>
        ///
        ///Esse método serve para inserir um Post na base.
        ///
        ///</summary>
        ///<param name="post">Model de Post para ser inserido</param>
        public async Task Criar(Post post)
        {
            if (post == null)
                throw new AppException("O Post não pode estar nulo");

            if (post.Destaque == '1')
            {
                var destaques = await VerificaDestaque();

                await AtualizaDestaque(destaques);
            }

            post.Slug = GeraSlug(post.Titulo);

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

            Db.Set<Post>().Update(post);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um Post na base.
        ///
        ///</summary>
        ///<param name="id">Id do Post a ser excluído</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            Post entity = await Db.Set<Post>()
                                        .FirstOrDefaultAsync(n => n.Id == id);

            if (entity != null)
            {
                Db.Set<Post>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("Post não encontrado");
            }
        }

        public async Task<List<Post>> BuscarPorCategoria(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            IQueryable<Post> query = Db.Set<Post>().AsQueryable();


            query = query.AsNoTracking()
                                    .OrderBy(c => c.DataCadastro)
                                    .Where(p => p.CategoriaId == id && p.Ativo.Equals('1'));

            if (query == null)
                throw new AppException("Posts não localizados");

            return await query.ToListAsync();
        }

        public async Task<List<Post>> BuscarMaisLidos()
        {
            IQueryable<Post> query = Db.Set<Post>().AsQueryable();


            query = query.AsNoTracking()
                                    .OrderByDescending(p => p.Vizualizacoes)
                                    .ThenBy(p => p.DataCadastro)
                                    .Where(p => p.Ativo.Equals('1'));

            if (query == null)
                throw new AppException("Posts não localizados");

            return await query.ToListAsync();
        }

        public async Task<Post> BuscarPorIdHit(int id)
        {
            if (id == 0)
                throw new AppException("O id do Post não pode ser igual a 0");

            Post post = await Db.Set<Post>()
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(n => n.Id == id);

            if (post == null)
                throw new AppException("Post não localizado");

            post.Vizualizacoes++;
            await RegistraHit(post);

            return post;
        }

        ///<summary>
        ///
        ///Esse método serve para registrar as vizualizaões um Post na base.
        ///
        ///</summary>
        ///<param name="post">Model de Post para ser atualizado</param>
        private async Task RegistraHit(Post post)
        {
            if (post == null)
                throw new AppException("O Post não pode estar nulo");

            Db.Set<Post>().Update(post).Property(x => x.Vizualizacoes).IsModified = true;

            await Db.SaveChangesAsync();
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
        private async Task AtualizaDestaque(IList<Post> posts)
        {
            if (posts == null)
                throw new AppException("Lista de Post não pode estar nulo");

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
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens  

            return str;
        }

        private static string RemoveAcentuacao(string txt)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(txt);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um post na base.
        ///
        ///</summary>
        ///<param name="id">Id do post a ser excluído</param>
        public async Task ExcluirTags(int id)
        {
            if (id == 0)
                throw new AppException("O id do post não pode ser igual a 0");

            List<PostTag> tags = await Db.PostTag.Where(b => b.PostId == id).ToListAsync();
            Db.RemoveRange(tags);
        }
    }
}