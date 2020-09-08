//===============================================================================
//Web API Categorias
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Categorias para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Categorias
{
    [ExcludeFromCodeCoverage]
    public class CategoriasCreateModel
    {
        [StringLength(100)]
        [Required]
        public string Titulo { get; set; }
        [StringLength(100)]
        [Required]
        public string Descricao { get; set; }
    }
}