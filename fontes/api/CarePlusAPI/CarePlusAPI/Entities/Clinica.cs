using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_CLINICA")]
    public class Clinica
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME")]
        public string Nome { get; set; }
        [Column("ESPECIALIDADE")]
        public string Especialidade { get; set; }
        [Column("FECHADA")]
        public char Fechada { get; set; }
        [Column("TELEFONE")]
        public string Telefone { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
        [Column("USUARIO_ID")]
        public int UsuarioId { get; set; }

        public virtual ICollection<EnderecoClinica> EnderecoClinica { get; set; }
        public virtual ICollection<HorarioClinica> HorarioClinica { get; set; }
    }
}
