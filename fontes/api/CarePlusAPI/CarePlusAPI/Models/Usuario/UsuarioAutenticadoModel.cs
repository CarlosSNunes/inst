
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioAutenticadoModel
    {
        [Required]
        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}