using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_REQUISICAO_USUARIO")]
    public class RequisicaoUsuario
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME")]
        public string Nome { get; set; }
        [Column("NOME_USUARIO")]
        public string NomeUsuario { get; set; }
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
