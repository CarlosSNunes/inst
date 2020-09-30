
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioCreateModel
    {
        [StringLength(100)]
        [Required]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }
        [Required]
        public List<Perfil.PerfilCreateModel> UsuarioPerfil { get; set; }
    }
}