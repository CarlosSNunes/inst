using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_TAG")]
    public class Tag
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("DESCRICAO")]
        public string Descricao { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
        [Column("USUARIO_ID")]
        public int UsuarioId { get; set; }

        public virtual ICollection<PostTag> PostTag { get; set; }
    }
}