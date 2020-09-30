using System.Collections.Generic;

namespace CarePlusAPI.Models.FaleConosco
{
    public class TipoAssuntoModel
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public IList<AssuntoModel> Assunto { get; set; }
    }
}
