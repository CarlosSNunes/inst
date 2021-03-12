using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_CATEGORIA")]
    public class Categoria
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("TITULO")]
        public string Titulo { get; set; }
        [Column("DESCRICAO")]
        public string Descricao { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

    }
}