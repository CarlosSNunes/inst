//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_PERFIL")]
    public class Perfil
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("DESCRICAO")]
        public string Descricao { get; set; }
        public virtual List<UsuarioPerfil> UsuarioPerfil { get; set; }
    }
}