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
        Task<Tuple<int, List<Banner>>> Listar(int page, int pageSize, char? ativo, string? area);
        Task<List<Banner>> ListarPorOrdem();
        Task<List<Banner>> BuscarPorArea(string area);
        Task<Banner> Buscar(int id);
        Task Criar(Banner model);
        Task Atualizar(Banner model, bool reorderBanners, bool activeChanged);
        Task AtualizarDiversos(List<Banner> banners);
        Task<List<Banner>> GetBannersInIds(string area, List<int> ids);
        Task Excluir(int id);
    }

    public class BannerService : IBannerService
    {
        private readonly DataContext Db;

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
        public async Task<Tuple<int, List<Banner>>> Listar(int page, int pageSize, char? ativo, string? area)
        {
            try
            {
                IQueryable<Banner> query = Db.Banner.AsQueryable();
                query = query
                    .AsNoTracking();

                if (ativo != null)
                {
                    query = (IOrderedQueryable<Banner>)query.Where(b => b.Ativo == ativo);
                }

                if (area != null)
                {
                    query = (IOrderedQueryable<Banner>)query.Where(b => b.Area == area);
                }

                query = query.OrderBy(x => x.Ordem);

                var count = await query.CountAsync();
                var result = await PagingResults.GetPaged<Banner>(query, page, pageSize);
                return new Tuple<int, List<Banner>>(count, result.Results);

            }
            catch (Exception ex)
            {
                throw ex;
            }
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
                .OrderBy(x => x.Ordem)
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
                throw new AppException("O area não pode ser igual a 'null' ou 'empty'");

            List<Banner> listaBanner = await Db.Set<Banner>()
                .AsNoTracking()
                .Where(x => x.Ativo.Equals('1') && x.Area == area)
                .OrderBy(x => x.Ordem)
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

            if (banner.Ativo.ToString() == "1")
            {
                List<Banner> banners = await Db.Set<Banner>().AsNoTracking().Where(b => b.Area.Equals(banner.Area)).ToListAsync();

                banners.ForEach(banner =>
                {
                    banner.Ordem = banner.Ordem + 1;

                    if (banner.Ordem > 3)
                    {
                        banner.Ativo = '0';
                    }
                });

                Db.Set<Banner>().UpdateRange(banners);

                banner.Ordem = 0;
            } else
            {
                Banner lastBanner = await Db.Set<Banner>().AsNoTracking().Where(b => b.Area.Equals(banner.Area)).OrderByDescending(B => B.Ordem).FirstOrDefaultAsync();

                if (lastBanner != null)
                {
                    banner.Ordem = lastBanner.Ordem + 1;
                } else
                {
                    banner.Ordem = 0;
                }
            }

            await Db.Set<Banner>().AddAsync(banner);

            await Db.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve atualizar um banner na base.
        ///
        ///</summary>
        ///<param name="banner">Model de banner para ser atualizado</param>
        public async Task Atualizar(Banner banner, bool reorderBanners, bool activeChanged)
        {
            if (banner == null)
                throw new AppException("O banner não pode estar nulo");

            await changeBannersOrder(banner, reorderBanners, activeChanged);

            Db.Set<Banner>().Update(banner);

            await Db.SaveChangesAsync();
        }


        ///<summary>
        ///
        ///Esse método serve reordenar os banners na base
        ///
        ///</summary>
        ///<param name="banner">Model de banner para ser atualizado</param>
        ///<param name="reorderBanners">Caso verdadeiro significa que o parâmetro "Ativo" do banner era '0' e agora está como '1', então adicionamos este banner em primeiro lugar na lista e descemos os demais uma casa para baixo, caso o contrario nós deixamos o seguinte banner em ultimo na ordem e realizamos reordenamos todos os demais banners</param>
        ///<param name="activeChanged">Parâmetro para verificar se houve alguma mudança no parâmetro "ativo" da model de banner</param>
        private async Task changeBannersOrder (Banner banner, bool reorderBanners, bool activeChanged)
        {
            List<Banner> banners = new List<Banner>();

            int order = 0;

            if (activeChanged == true)
            {
                banners = await Db.Set<Banner>().AsNoTracking().Where(b => b.Area.Equals(banner.Area) && b.Id != banner.Id).OrderBy(b => b.Ordem).ToListAsync();

                if (reorderBanners)
                {
                    order = 1;
                    banners.ForEach(b =>
                    {
                        b.Ordem = order;

                        if (b.Ordem > 3)
                        {
                            b.Ativo = '0';
                        }

                        order = order + 1;
                    });

                    Db.Set<Banner>().UpdateRange(banners);

                    await Db.SaveChangesAsync();

                    banner.Ordem = 0;
                }
                else if (reorderBanners == false)
                {
                    order = 0;
                    banners.ForEach(b =>
                    {
                        b.Ordem = order;

                        if (b.Ordem > 3)
                        {
                            b.Ativo = '0';
                        }

                        order = order + 1;
                    });

                    Db.Set<Banner>().UpdateRange(banners);

                    await Db.SaveChangesAsync();

                    Banner lastBanner = await Db.Set<Banner>().AsNoTracking().Where(b => b.Area.Equals(banner.Area)).OrderByDescending(B => B.Ordem).FirstOrDefaultAsync();

                    if (lastBanner != null)
                    {
                        banner.Ordem = lastBanner.Ordem + 1;
                    }
                    else
                    {
                        banner.Ordem = 0;
                    }

                }
            }
        }

        ///<summary>
        ///
        ///Esse método serve atualizar um banner na base.
        ///
        ///</summary>
        ///<param name="banner">Model de banner para ser atualizado</param>
        public async Task AtualizarDiversos(List<Banner> banners)
        {
            Db.Set<Banner>().UpdateRange(banners);

            await Db.SaveChangesAsync();
        }


        ///<summary>
        ///
        ///Esse método serve para pegar os banners que possuem os ids solicitados
        ///
        ///</summary>
        ///<param name="ids">Ids dos banners</param>
        public async Task<List<Banner>> GetBannersInIds(string area, List<int> ids)
        {
            List<Banner> banners = await Db.Set<Banner>().AsQueryable().AsNoTracking().Where(b => (b.Area == area) && ids.Contains(b.Id)).ToListAsync();

            return banners;
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

                List<Banner> banners = await Db.Set<Banner>().AsNoTracking().Where(b => b.Area.Equals(entity.Area)).OrderBy(b => b.Ordem).ToListAsync();

                var index = 0;

                banners.ForEach(banner =>
                {
                    banner.Ordem = index;
                    index++;
                });

                Db.Set<Banner>().UpdateRange(banners);

                await Db.SaveChangesAsync();
            }
            else
            {
                throw new AppException("banner não encontrado");
            }
        }
    }
}