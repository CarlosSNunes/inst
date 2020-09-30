using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace CarePlusAPI.Models.FaleConosco
{
    public class ListaAnexoModel
    {
        public IList<IFormFile> Arquivo { get; set; }
    }
}
