using Microsoft.EntityFrameworkCore;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface ICategoriasService
    {
        Task<List<Categoria>> Listar();
        Task<Categoria> Buscar(int id);
        Task Criar(Categoria model);
        Task Atualizar(Categoria model);
        Task Excluir(int id);
    }

    public class CategoriasService : ICategoriasService
    {
        private readonly DataContext Db;

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public CategoriasService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todas as Categorias por data, da base.
        ///
        ///</summary>
        public async Task<List<Categoria>> Listar()
        {
            List<Categoria> filtro = await Db.Set<Categoria>()
                .AsNoTracking()
                .OrderByDescending(x => x.DataCadastro)
                .Take(4)
                .ToListAsync();

            return filtro;            
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma Categoria por Id.
        ///
        ///</summary>
        ///<param name="id">Id da Categoria</param>
        public async Task<Categoria> Buscar(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Categoria categoria = await Db.Set<Categoria>().AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);

            if (categoria == null)
                throw new AppException("Categoria não encontrada");

            return categoria;
        }

        ///<summary>
        ///
        ///Esse método serve inserir uma Categorias na base.
        ///
        ///</summary>
        ///<param name="categoria">Model de Categorias para ser inserido</param>
        public async Task Criar(Categoria categoria)
        {
            if (categoria == null)
                throw new AppException("A Categoria não pode estar nulo");

            await Db.Set<Categoria>().AddAsync(categoria);
            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve atualizar uma Categoria na base.
        ///
        ///</summary>
        ///<param name="categoria">Model de Categorias para ser atualizado</param>
        public async Task Atualizar(Categoria categoria)
        {
            if (categoria == null)
                throw new AppException("A Categoria não pode estar nulo");

            Db.Set<Categoria>().Update(categoria);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve excluir uma Categoria na base.
        ///
        ///</summary>
        ///<param name="id">Id da Categoria a ser excluído</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Categoria entity = await Db.Set<Categoria>().FirstOrDefaultAsync(m => m.Id == id);

            if (entity != null)
            {
                Db.Set<Categoria>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("Categoria não encontrada");
            }
        }
        
    }
}