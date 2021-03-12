using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface IPerfilService
    {
        Task<List<Perfil>> Listar();
        Task<Perfil> Buscar(int id);
        Task Criar(List<Perfil> models);
        Task Atualizar(List<Perfil> models);
        Task Excluir(int id);
    }

    public class PerfilService : IPerfilService
    {
        private readonly DataContext Db;

        public PerfilService(DataContext db)
        {
            Db = db;
        }

        public async Task<List<Perfil>> Listar()
        {
            return await Db.Set<Perfil>().ToListAsync();
        }

        public async Task<Perfil> Buscar(int id)
        {
            if (id == 0)
                throw new AppException("O id do perfil não pode ser igual a 0");

            Perfil perfil = await Db.Set<Perfil>().FindAsync(id);

            if (perfil == null)
                throw new AppException("Perfil não encontrado");

            return perfil;
        }

        public async Task Criar(List<Perfil> models)
        {
            if (models == null || !models.Any())
                throw new AppException("Deve-se ter ao menos um perfil");

            await Db.Set<Perfil>().AddRangeAsync(models);
            await Db.SaveChangesAsync();
        }

        public async Task Atualizar(List<Perfil> models)
        {
            if (models == null || !models.Any())
                throw new AppException("Deve-se ter ao menos um perfil");

            Db.Set<Perfil>().UpdateRange(models);

            await Db.SaveChangesAsync();
        }

        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id do perfil não pode ser igual a 0");

            Perfil entity = await Db.Set<Perfil>().FindAsync(id);

            if (entity != null)
            {
                Db.Set<Perfil>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("Perfil não encontrado");
            }
        }
    }
}