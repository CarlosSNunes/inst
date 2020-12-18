using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class TipoAssuntoModel
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public IList<AssuntoModel> Assunto { get; set; }
    }
}
