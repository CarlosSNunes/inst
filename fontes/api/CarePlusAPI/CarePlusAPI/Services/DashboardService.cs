//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using Microsoft.EntityFrameworkCore;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Neotix.Neocms.CarePlusAPI.Services
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
            List<Post> maisLidos = await Db.Set<Post>()
                                                .AsNoTracking()
                                                .Include(c => c.Categoria)
                                                .Include("PostTag.Tag")
                                                .OrderByDescending(p => p.Vizualizacoes)
                                                .ThenBy(p => p.DataCadastro)
                                                .Take(10)
                                                .ToListAsync();

            if (maisLidos == null)
                throw new AppException("Mais Lidos não encontrados");

            return maisLidos;
        }

        ///<summary>
        ///
        ///Esse método serve para retornar o numero de Banners ativos 
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<int> TotalBannersAtivos()
        {
            IQueryable<Banner> query = Db.Set<Banner>()
                                                .AsNoTracking()
                                                .Where(p => p.Ativo.Equals('1'));

            var totalBanner = await query.ToListAsync();

            if (totalBanner == null)
                throw new AppException("Banners não encontrados");

            return totalBanner.Count;
        }

        public async Task<int> TotalPostsBlog()
        {
            IQueryable<Post> query = Db.Set<Post>()
                                                .AsNoTracking()
                                                .Include(c => c.Categoria)
                                                .Include("PostTag.Tag")
                                                .Where(p => p.Ativo.Equals('1'));

            var totalPostsBlog = await query.ToListAsync();

            if (totalPostsBlog == null)
                throw new AppException("Posts não encontrados");

            return totalPostsBlog.Count;
        }

        public async Task<int> TotalUsuarios()
        {
            IQueryable<Usuario> query = Db.Set<Usuario>().AsNoTracking()
                                                .Where(p => !p.Email.Equals(null));



            var totalUsuarios = await query.ToListAsync();

            if (totalUsuarios == null)
                throw new AppException("Usuários não encontrados");

            return totalUsuarios.Count;
        }
    }
}