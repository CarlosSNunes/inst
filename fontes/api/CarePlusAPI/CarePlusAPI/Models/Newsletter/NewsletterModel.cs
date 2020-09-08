//===============================================================================
//Web API Newsletter
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Newsletter para uso do NEOCMS
//==============================================================================

using System;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Newsletter
{
    [ExcludeFromCodeCoverage]
    public class NewsletterModel
    {
        public int Id { get; set; }
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
