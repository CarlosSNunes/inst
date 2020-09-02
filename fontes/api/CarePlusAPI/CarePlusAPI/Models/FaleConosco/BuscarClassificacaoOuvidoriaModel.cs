﻿//===============================================================================
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
    public class BuscarClassificacaoOuvidoriaModel
    {
        public bool Sucesso { get; set; }
        public string Erros { get; set; }
        public string Mensagem { get; set; }
        public IList<ClassificacaoOuvidoriaModel> Dados { get; set; }
    }
}
