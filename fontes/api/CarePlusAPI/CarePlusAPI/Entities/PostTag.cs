//===============================================================================
//Web API Post
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Post para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_POST_TAG")]
    public class PostTag
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("POST_ID")]
        public int PostId { get; set; }
        [Column("TAG_ID")]
        public int TagId { get; set; }
        public virtual Post Post { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
