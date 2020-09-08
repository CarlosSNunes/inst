//===============================================================================
//Web API Perfil
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Perfil para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Perfil
{
    [ExcludeFromCodeCoverage]
    public class PerfilCreateModel
    {
        [Required]
        public int? PerfilId { get; set; }
        [Required]
        [StringLength(100)]
        public string Descricao { get; set; }
    }
}