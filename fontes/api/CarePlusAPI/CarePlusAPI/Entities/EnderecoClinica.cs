//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade EnderecoClinica para uso do NEOCMS
//==============================================================================

using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_ENDERECO_CLINICA")]
    public class EnderecoClinica
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("LOGRADOURO")]
        public string Logradouro { get; set; }
        [Column("NUMERO")]
        public string Numero { get; set; }
        [Column("COMPLEMENTO")]
        public string Complemento { get; set; }
        [Column("BAIRRO")]
        public string Bairro { get; set; }
        [Column("MUNICIPIO")]
        public string Municipio { get; set; }
        [Column("CIDADE")]
        public string Cidade { get; set; }
        [Column("ESTADO")]
        public string Estado { get; set; }

        [Column("CLINICA_ID")]
        public int ClinicaId { get; set; }
        public virtual Clinica Clinica{ get; set; }
    }
}
