//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Clinica para uso do NEOCMS
//==============================================================================
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_REQUISISAO_USUARIO")]
    public class RequisicaoUsuario
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("USUARIO_NOME")]
        public string UsuarioNome { get; set; }
        [Column("USUARIO_EMAIL")]
        public string UsuarioEmail { get; set; }
        [Column("USUARIO_SENHA")]
        public string UsuarioSenha { get; set; }
        [Column("TOKEN")]
        public string Token { get; set; }
        [Column("SUCESSO")]
        public char Sucesso { get; set; }
        [Column("EXPIRADO")]
        public char Expirado { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
    }
}
