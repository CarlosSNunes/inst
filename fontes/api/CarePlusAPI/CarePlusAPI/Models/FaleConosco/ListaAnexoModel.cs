//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Neotix.Neocms.CarePlusAPI.Models.FaleConosco
{
    public class ListaAnexoModel
    {
        public IList<IFormFile> Arquivo { get; set; }
    }
}
