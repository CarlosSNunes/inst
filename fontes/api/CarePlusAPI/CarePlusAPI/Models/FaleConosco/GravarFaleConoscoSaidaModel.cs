//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

namespace Neotix.Neocms.CarePlusAPI.Models.FaleConosco
{
    public class GravarFaleConoscoSaidaModel
    {
        public int CodigoMensagem { get; set; }
        public string Mensagem { get; set; }
        public bool Sucesso { get; set; }
    }
}
