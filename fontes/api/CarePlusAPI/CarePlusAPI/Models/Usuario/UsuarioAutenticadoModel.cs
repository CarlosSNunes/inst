
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioAutenticadoModel
    {
        [Required]
        [StringLength(50)]
        public string NomeUsuario { get; set; }

        public string Senha { get; set; }
    }
}