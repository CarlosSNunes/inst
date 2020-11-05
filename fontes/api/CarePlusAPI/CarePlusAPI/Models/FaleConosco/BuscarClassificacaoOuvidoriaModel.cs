using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class BuscarClassificacaoOuvidoriaModel
    {
        public bool Sucesso { get; set; }
        public string Erros { get; set; }
        public string Mensagem { get; set; }
        public IList<ClassificacaoOuvidoriaModel> Dados { get; set; }
    }
}
