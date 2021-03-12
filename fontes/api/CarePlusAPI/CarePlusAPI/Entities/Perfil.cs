using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_PERFIL")]
    public class Perfil
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("DESCRICAO")]
        public string Descricao { get; set; }
        [Column("PRIORIDADE")]
        public int Prioridade { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }

        public virtual ICollection<UsuarioPerfil> UsuarioPerfil { get; set; }
    }
}