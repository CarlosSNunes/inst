
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioAutenticadoModel
    {
        [Required]
        public string NomeUsuario { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}