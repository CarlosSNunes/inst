using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class TipoAssuntoFaleConoscoModel
    {
        public int CodigoMensagem { get; set; }
        public string Mensagem { get; set; }
        public IList<TipoAssuntoModel> TipoAssunto { get; set; }

    }
}
