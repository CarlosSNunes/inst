using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class BuscarAssuntoOuvidoriaModel
    {
        public bool Sucesso { get; set; }
        public string Erros { get; set; }
        public string Mensagem { get; set; }
        public IList<AssuntoOuvidoriaModel> Dados { get; set; }
    }
}
