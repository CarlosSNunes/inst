//===============================================================================
//Web API Tag
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Tag para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Tag
{
    [ExcludeFromCodeCoverage]
    public class TagUpdateModel
    {
        [Required]
        public int? Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Descricao { get; set; }
    }
}