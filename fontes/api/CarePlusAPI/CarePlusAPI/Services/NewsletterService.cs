using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface INewsletterService
    {
        Task<List<Newsletter>> Listar();
        Task<Newsletter> Buscar(int id);
        Task Criar(Newsletter model);
        Task Atualizar(Newsletter model);
        Task Excluir(int id);
    }

    public class NewsletterService : INewsletterService
    {
        private readonly DataContext Db;

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public NewsletterService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos as Newsletter por data, da base.
        ///
        ///</summary>
        public async Task<List<Newsletter>> Listar()
        {
            List<Newsletter> filtroData = await Db.Set<Newsletter>()
                .AsNoTracking()
                .OrderByDescending(x => x.DataCadastro)
                .Take(4)
                .ToListAsync();

            if (filtroData.Count == 0)
                throw new AppException("newsletter não encontrado");

            return filtroData;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma Newsletter por Id.
        ///
        ///</summary>
        ///<param name="id">Id da Newsletter</param>
        public async Task<Newsletter> Buscar(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Newsletter banner = await Db.Set<Newsletter>().AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);

            if (banner == null)
                throw new AppException("newsletter não encontrado");

            return banner;
        }

        ///<summary>
        ///
        ///Esse método serve inserir uma Newsletter na base.
        ///
        ///</summary>
        ///<param name="newsletter">Model de Newsletter para ser inserido</param>
        public async Task Criar(Newsletter newsletter)
        {
            if (newsletter == null)
                throw new AppException("A newsletter não pode estar nulo");

            await Db.Set<Newsletter>().AddAsync(newsletter);
            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve atualizar uma Newsletter na base.
        ///
        ///</summary>
        ///<param name="newsletter">Model de Newsletter para ser atualizado</param>
        public async Task Atualizar(Newsletter newsletter)
        {
            if (newsletter == null)
                throw new AppException("A newsletter não pode estar nulo");

            Db.Set<Newsletter>().Update(newsletter);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve excluir uma Newsletter na base.
        ///
        ///</summary>
        ///<param name="id">Id do Newsletter a ser excluído</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Newsletter entity = await Db.Set<Newsletter>().FirstOrDefaultAsync(m => m.Id == id);

            if (entity != null)
            {
                Db.Set<Newsletter>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("newsletter não encontrado");
            }
        }

    }
}