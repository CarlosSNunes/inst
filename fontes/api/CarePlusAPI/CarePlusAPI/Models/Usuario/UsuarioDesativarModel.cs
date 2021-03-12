using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioDesativarModel
    {
        [Required]
        [StringLength(50)]
        public string NomeUsuario { get; set; }
    }
}
