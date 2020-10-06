using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
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
