//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================

using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Neotix.Neocms.CarePlusAPI.Models.Perfil;

namespace Neotix.Neocms.CarePlusAPI.Models.Usuario
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