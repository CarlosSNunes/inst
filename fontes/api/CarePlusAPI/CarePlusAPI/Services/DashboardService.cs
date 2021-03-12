using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface IDashboardService
    {
        Task<int> TotalPostsBlog();
        Task<int> TotalUsuarios();
        Task<int> TotalBannersAtivos();
        Task<List<Post>> ListarPostsMaisLidos();
    }

    public class DashboardService : IDashboardService
    {
        private readonly DataContext Db;

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public DashboardService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar os posts mais lidos e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<List<Post>> ListarPostsMaisLidos()
        {
            try
            {
                List<Post> maisLidos = await Db.Set<Post>()
                                                  .AsNoTracking()
                                                  .Include(c => c.Categoria)
                                                  .Include("PostTag.Tag")
                                                  .OrderByDescending(p => p.Vizualizacoes)
                                                  .ThenBy(p => p.DataCadastro)
                                                  .Take(10)
                                                  .ToListAsync();

                if (maisLidos.Count == 0)
                    throw new AppException("Mais Lidos não encontrados");

                return maisLidos;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para retornar o numero de Banners ativos 
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<int> TotalBannersAtivos()
        {

            int bannersCount = await Db.Set<Banner>()
                                                .AsNoTracking()
                                                .Where(p => p.Ativo.Equals('1'))
                                                .CountAsync();


            return bannersCount;

        }

        public async Task<int> TotalPostsBlog()
        {
            try
            {
                int postsCount = await Db.Set<Post>()
                                        .AsNoTracking()
                                        .Where(p => p.Ativo.Equals('1')).CountAsync();


                return postsCount;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> TotalUsuarios()
        {
            try
            {
                int usersCount = await Db.Set<Usuario>().AsNoTracking()
                                                    .Where(p => !p.NomeUsuario.Equals(null))
                                                    .CountAsync();

                return usersCount;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}