//===============================================================================
//Web API Newsletter
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Banner para uso do NEOCMS
//==============================================================================

using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_NEWSLETTER")]
    public class Newsletter
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME_COMPLETO")]
        public string NomeCompleto { get; set; }
        [Column("EMAIL")]
        public string Email { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }

    }
}