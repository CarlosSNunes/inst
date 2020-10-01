using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_NEWSLETTER")]
    public class Newsletter
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME_COMPLETO")]
        public string NomeCompleto { get; set; }
        [Column("EMAIL")]
        public string Email { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }

    }
}