//===============================================================================
//Web API Tag
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Tag para uso do NEOCMS
//==============================================================================

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Neotix.Neocms.CarePlusAPI.Services
{
    public interface ITagService
    {
        Task<List<Tag>> Listar();
        Task<Tag> Buscar(int id);
        Task Criar(List<Tag> model);
        Task Atualizar(List<Tag> model);
        Task Excluir(int id);
    }

    public class TagService : ITagService
    {
        private readonly DataContext Db;

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public TagService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todas as tags da base.
        ///
        ///</summary>
        public async Task<List<Tag>> Listar()
        {
            return await Db.Set<Tag>().ToListAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma tag por id.
        ///
        ///</summary>
        ///<param name="id">Id da tag</param>
        public async Task<Tag> Buscar(int id)
        {
            if (id == 0)
                throw new AppException("O id da tag não pode ser igual a 0");

            Tag tag = await Db.Set<Tag>().FindAsync(id);

            if (tag == null)
                throw new AppException("Tag não encontrada");

            return tag;
        }

        ///<summary>
        ///
        ///Esse método serve inserir tags na base.
        ///
        ///</summary>
        ///<param name="tags">Models de tags para serem inseridas</param>
        public async Task Criar(List<Tag> tags)
        {
            if (tags == null || !tags.Any())
                throw new AppException("Deve-se ter ao menos um tag");

            await Db.Set<Tag>().AddRangeAsync(tags);
            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve atualizar tags na base.
        ///
        ///</summary>
        ///<param name="produto">Models de tags para serem atualizadas</param>
        public async Task Atualizar(List<Tag> tags)
        {
            if (tags == null || !tags.Any())
                throw new AppException("Deve-se ter ao menos um tag");

            Db.Set<Tag>().UpdateRange(tags);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve excluir uma tag na base.
        ///
        ///</summary>
        ///<param name="id">Id da tag a ser excluída</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id da tag não pode ser igual a 0");

            Tag entity = await Db.Set<Tag>().FindAsync(id);

            if (entity != null)
            {
                Db.Set<Tag>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("Tag não encontrada");
            }
        }
    }
}