//===============================================================================
//Web API Newsletter
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Newsletter para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Newsletter
{
    [ExcludeFromCodeCoverage]
    public class NewsletterCreateModel
    {
        [StringLength(100)]
        [Required]
        public string NomeCompleto { get; set; }
        [StringLength(100)]
        [Required]
        public string Email { get; set; }
    }
}