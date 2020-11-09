using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CarePlusAPI.Services
{
    public interface IBannerService
    {
        Task<List<Banner>> Listar();
        Task<List<Banner>> ListarPorOrdem();
        Task<List<Banner>> BuscarPorArea(string area);
        Task<Banner> Buscar(int id);
        Task Criar(Banner model);
        Task Atualizar(Banner model);
        Task Excluir(int id);
        Task<Tuple<string, string>> SalvaImagem(string pathTosave, IFormFile arquivo);
    }

    public class BannerService : IBannerService
    {
        private readonly DataContext Db;
        private readonly AppSettings _appSettings = new AppSettings();

        ///<summary>
        ///
        ///Esse método serve para atribuir os objetos recebidos para injeção de depencia
        ///para os atributos da classe
        ///
        ///</summary>
        ///<param name="db">Contexto do banco de dados</param>
        public BannerService(DataContext db)
        {
            Db = db;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos os Banners por data, da base.
        ///
        ///</summary>
        public async Task<List<Banner>> Listar()
        {
            List<Banner> filtroData = await Db.Set<Banner>()
                .AsNoTracking()
                .OrderByDescending(x => x.DataCadastro)
                .Take(4)
                .ToListAsync();

            return filtroData;

            //return await Db.Set<Banner>().ToListAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos os Banners por Ordem, da base.
        ///
        ///</summary>
        public async Task<List<Banner>> ListarPorOrdem()
        {
            List<Banner> filtroOrdem = await Db.Set<Banner>()
                .AsNoTracking()
                .Where(x => x.Ativo.Equals('1'))
                .OrderByDescending(x => x.Ordem)
                .Take(4)
                .ToListAsync();

            return filtroOrdem;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um banner por Area, da base.
        ///
        ///</summary>
        ///<param name="area">Area do banner</param>
        public async Task<List<Banner>> BuscarPorArea(string area)
        {
            if (string.IsNullOrEmpty(area))
                throw new AppException("O area não pode ser igual a null ou empty");

            List<Banner> listaBanner = await Db.Set<Banner>()
                .AsNoTracking()
                .Where(x => x.Ativo.Equals('1') && x.Area == area )
                .OrderByDescending(x => x.DataCadastro)
                .Take(4)
                .ToListAsync();

            if (listaBanner == null)
                throw new AppException("banner não encontrado");

            return listaBanner;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um banner por Id.
        ///
        ///</summary>
        ///<param name="id">Id do banner</param>
        public async Task<Banner> Buscar(int id)
        {
            try
            {
                if (id == 0)
                    throw new AppException("O id não pode ser igual a 0");

                Banner banner = await Db.Set<Banner>().AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);

                if (banner == null)
                    throw new AppException("banner não encontrado");

                return banner;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve inserir um banner na base.
        ///
        ///</summary>
        ///<param name="banner">Model de banner para ser inserido</param>
        public async Task Criar(Banner banner)
        {
            if (banner == null)
                throw new AppException("O banner não pode estar nulo");

            await Db.Set<Banner>().AddAsync(banner);
            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve atualizar um banner na base.
        ///
        ///</summary>
        ///<param name="banner">Model de banner para ser atualizado</param>
        public async Task Atualizar(Banner banner)
        {
            if (banner == null)
                throw new AppException("O banner não pode estar nulo");

            Db.Set<Banner>().Update(banner);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve excluir um banner na base.
        ///
        ///</summary>
        ///<param name="id">Id do banner a ser excluído</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id não pode ser igual a 0");

            Banner entity = await Db.Set<Banner>().FirstOrDefaultAsync(m => m.Id == id);

            if (entity != null)
            {
                Db.Set<Banner>().Remove(entity);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("banner não encontrado");
            }
        }

        /// <summary>
        /// Método para criação de imagens em seus respectivos diretorios.
        /// </summary>
        /// <param name="pathTosave"></param>        
        /// <param name="arquivo"></param>
        /// <returns></returns>
        public async Task<Tuple<string, string>> SalvaImagem(string pathTosave, IFormFile arquivo)
        {
            string fileName = string.Empty;
            string path = string.Empty;
            string directoryName = string.Empty;

            try
            {
                var file = arquivo;

                var folderName = pathTosave;
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Replace("\"", " ").Trim().ToLower().Replace(" ", "_");
                    directoryName = Path.Combine(pathToSave, fileName);

                    if (!Directory.Exists(pathToSave))
                        Directory.CreateDirectory(pathToSave);

                    using (var stream = new FileStream(directoryName, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return new Tuple<string, string>(fileName, pathTosave);
            }
            catch (System.Exception ex)
            {
                if (File.Exists(path))
                    File.Delete(path);

                throw ex;
            }
        }
    }
}