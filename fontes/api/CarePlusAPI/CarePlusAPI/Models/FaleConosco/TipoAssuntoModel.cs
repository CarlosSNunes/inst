//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using System.Collections.Generic;

namespace Neotix.Neocms.CarePlusAPI.Models.FaleConosco
{
    public class TipoAssuntoModel
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public IList<AssuntoModel> Assunto { get; set; }
    }
}
