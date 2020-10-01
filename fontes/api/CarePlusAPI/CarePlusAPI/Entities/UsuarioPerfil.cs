using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_USUARIO_PERFIL")]
    public class UsuarioPerfil
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("USUARIO_ID")]
        public int UsuarioId { get; set; }
        [Column("PERFIL_ID")]
        public int PerfilId { get; set; }
        public virtual Usuario Usuario { get; set; }
        public virtual Perfil Perfil { get; set; }

    }
}