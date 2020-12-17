
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
        [StringLength(50)]
        public string NomeUsuario { get; set; }

        public string Senha { get; set; }
        [Required]
        public List<Perfil.PerfilCreateModel> UsuarioPerfil { get; set; }
    }
}