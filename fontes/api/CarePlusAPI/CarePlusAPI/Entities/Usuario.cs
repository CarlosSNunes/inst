//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_USUARIO")]
    public class Usuario
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME")]
        public string Nome { get; set; }
        [Column("EMAIL")]
        public string Email { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
        [Column("SENHA_HASH")]
        public byte[] SenhaHash { get; set; }
        [Column("SENHA_SALT")]
        public byte[] SenhaSalt { get; set; }
        public List<UsuarioPerfil> UsuarioPerfil { get; set; }
    }
}