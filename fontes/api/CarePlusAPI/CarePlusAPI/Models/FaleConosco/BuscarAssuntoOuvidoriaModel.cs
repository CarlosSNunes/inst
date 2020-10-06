using System.Collections.Generic;

namespace CarePlusAPI.Models.FaleConosco
{
    public class BuscarAssuntoOuvidoriaModel
    {
        public bool Sucesso { get; set; }
        public string Erros { get; set; }
        public string Mensagem { get; set; }
        public IList<AssuntoOuvidoriaModel> Dados { get; set; }
    }
}
