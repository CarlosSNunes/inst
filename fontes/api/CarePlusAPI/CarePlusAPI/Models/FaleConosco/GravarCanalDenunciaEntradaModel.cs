﻿//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

namespace Neotix.Neocms.CarePlusAPI.Models.FaleConosco
{
    public class GravarCanalDenunciaEntradaModel
    {
        public string Origem { get; set; }
        public string Token { get; set; }        
        public string CPFCNPJ { get; set; }
        public string Certificado { get; set; }
        public string Mensagem { get; set; }       
        public string DDDTelefone { get; set; }
        public string Telefone { get; set; }
        public string DDDTelefoneCel { get; set; }
        public string TelefoneCel { get; set; }
        public string Email { get; set; }       
        public string NomeContato { get; set; }
        public string TokenAutenticacao { get; set; }       
        public ListaAnexoModel LstAnexo { get; set; }
    }
}
