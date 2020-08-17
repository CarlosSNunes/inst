//===============================================================================
//Web API Post
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Post para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.PostTag
{
    [ExcludeFromCodeCoverage]
    public class PostTagUpdateModel
    {
        [Required]
        public int? TagId { get; set; }
    }
}
