using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Helpers.Paging
{
    [ExcludeFromCodeCoverage]
    public class PagedResult<T> : PagedResultBase where T : class
    {
        public List<T> Results { get; set; }

        public PagedResult()
        {
            Results = new List<T>();
        }
    }
}
