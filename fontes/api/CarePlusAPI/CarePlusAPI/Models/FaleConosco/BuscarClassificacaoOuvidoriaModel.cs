using System.Collections.Generic;

namespace CarePlusAPI.Models.FaleConosco
{
    public class BuscarClassificacaoOuvidoriaModel
    {
        public bool Sucesso { get; set; }
        public string Erros { get; set; }
        public string Mensagem { get; set; }
        public IList<ClassificacaoOuvidoriaModel> Dados { get; set; }
    }
}
