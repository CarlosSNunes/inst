
using CarePlusAPI.Models.Perfil;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string NomeUsuario { get; set; }
        public char Ativo { get; set; }
        public List<PerfilModel> UsuarioPerfil { get; set; }
    }
}