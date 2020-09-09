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
    public class TipoAssuntoFaleConoscoModel
    {
        public int CodigoMensagem { get; set; }
        public string Mensagem { get; set; }
        public IList<TipoAssuntoModel> TipoAssunto { get; set; }

    }
}
