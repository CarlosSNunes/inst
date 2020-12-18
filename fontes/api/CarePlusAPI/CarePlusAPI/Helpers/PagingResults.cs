using CarePlusAPI.Helpers.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public static class PagingResults
    {
        public static async Task<PagedResult<T>> GetPaged<T>(this IQueryable<T> query,
            int page, int pageSize) where T : class
        {
            var result = new PagedResult<T>();
            result.CurrentPage = page;
            result.PageSize = pageSize;
            result.RowCount = await query.CountAsync();

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            query = query.Skip(page).Take(pageSize);
            List<T> items = await query.ToListAsync();
            result.Results = items;

            return result;
        }
    }



}