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
        
        public virtual ICollection<UsuarioPerfil> UsuarioPerfil { get; set; }
    }
}