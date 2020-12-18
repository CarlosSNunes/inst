using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class ListaAnexoModel
    {
        public IList<IFormFile> Arquivo { get; set; }
    }
}
