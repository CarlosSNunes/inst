using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface IConsultaFacilService
    {
        Task<List<Clinica>> Listar();
        Task<List<Clinica>> BuscarPorData(DateTime data);
        Task<Clinica> BuscarPorId(int id);

        Task Criar(Clinica model);
        Task Atualizar(Clinica model);
        Task Excluir(int id);
    }
    [ExcludeFromCodeCoverage]
    public class ConsultaFacilService : IConsultaFacilService
    {
        private readonly DataContext Db;

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public ConsultaFacilService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos as Clinicas da base.
        ///
        ///</summary>
        public async Task<List<Clinica>> Listar()
        {
            return await Db.Set<Clinica>()
                                   .AsNoTracking()
                                   .Include("EnderecoClinica")
                                   .Include("HorarioClinica")
                                   .ToListAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um Clinica por Id.
        ///
        ///</summary>
        ///<param name="id">Id do Clinica</param>
        public async Task<Clinica> BuscarPorId(int id)
        {
            if (id == 0)
                throw new AppException("O id da Clinica não pode ser igual a 0");

            Clinica clinica = await Db.Set<Clinica>()
                                        .AsNoTracking()
                                        .Include("EnderecoClinica")
                                        .Include("HorarioClinica")
                                        .FirstOrDefaultAsync(n => n.Id == id);

            if (clinica == null)
                throw new AppException("Clinica não localizada");

            return clinica;
        }

        ///<summary>
        ///
        ///Esse método serve para inserir uma Clinica na base.
        ///
        ///</summary>
        ///<param name="clinica">Model de Clinica para ser inserido</param>
        public async Task Criar(Clinica clinica)
        {
            if (clinica == null)
                throw new AppException("A Clinica não pode estar nula");

            await Db.Set<Clinica>().AddAsync(clinica);
            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para atualizar um Clinica na base.
        ///
        ///</summary>
        ///<param name="clinica">Model de Clinica para ser atualizado</param>
        public async Task Atualizar(Clinica clinica)
        {
            if (clinica == null)
                throw new AppException("A Clinica não pode estar nulo");

            Db.Set<Clinica>().Update(clinica);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um Clinica na base.
        ///
        ///</summary>
        ///<param name="id">Id do Clinica a ser excluído</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id do Clinica não pode ser igual a 0");

            Clinica entity = await Db.Set<Clinica>()
                                        .Include("EnderecoClinica")
                                        .Include("HorarioClinica")
                                        .FirstOrDefaultAsync(n => n.Id == id);

            if (entity != null)
            {
                Db.Set<EnderecoClinica>().RemoveRange(entity.EnderecoClinica);
                Db.Set<HorarioClinica>().RemoveRange(entity.HorarioClinica);
                Db.Set<Clinica>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("Clinica não encontrada");
            }
        }

        /// <summary>
        /// Buscar uma clinica por data informada
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task<List<Clinica>> BuscarPorData(DateTime data)
        {
            if (string.IsNullOrWhiteSpace(data.ToString()))
                throw new AppException("A data não pode ser null");

            IQueryable<Clinica> query = Db.Set<Clinica>().AsQueryable();

            query = query.AsNoTracking()
                                    .OrderBy(c => c.DataCadastro)
                                    .Where(p => p.HorarioClinica.All(x => x.DataHoraInicio.Date.Equals(data) && x.DataHoraFim.Date <= data) && p.Fechada.Equals('1'));

            List<Clinica> clinicas = await query
                                            .Include("EnderecoClinica")
                                            .Include("HorarioClinica").ToListAsync();

            if (!clinicas.Any())
                throw new AppException("Clinicas não localizados");

            return clinicas;
        }
    }
}