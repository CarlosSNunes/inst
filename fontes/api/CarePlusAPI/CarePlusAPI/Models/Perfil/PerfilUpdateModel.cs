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
    public class PerfilUpdateModel
    {
        [Required]
        public int? Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int? PerfilId { get; set; }
    }
}