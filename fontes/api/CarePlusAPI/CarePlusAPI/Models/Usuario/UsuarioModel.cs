
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using CarePlusAPI.Models.Perfil;

namespace CarePlusAPI.Models.Usuario
{
  [ExcludeFromCodeCoverage]
  public class UsuarioModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public List<PerfilModel> UsuarioPerfil { get; set; }
    }
}