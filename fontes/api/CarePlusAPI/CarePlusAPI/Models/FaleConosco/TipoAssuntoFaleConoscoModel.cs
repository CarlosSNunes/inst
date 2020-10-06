using System.Collections.Generic;

namespace CarePlusAPI.Models.FaleConosco
{
    public class TipoAssuntoFaleConoscoModel
    {
        public int CodigoMensagem { get; set; }
        public string Mensagem { get; set; }
        public IList<TipoAssuntoModel> TipoAssunto { get; set; }

    }
}
