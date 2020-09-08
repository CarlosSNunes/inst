//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================


using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Usuario
{
    [ExcludeFromCodeCoverage]
    public class UsuarioUpdateModel
    {
        [StringLength(100)]
        public string Nome { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Senha { get; set; }
        [Required]
        public List<Perfil.PerfilUpdateModel> UsuarioPerfil { get; set; }
    }
}