using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_LOG_USUARIO_DESATIVADO")]
    public class LogUsuarioDesativado
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("ID_REQUISITANTE")]
        public int Id_Requisitante { get; set; }
        [Column("NOME_USUARIO")]
        public string NomeUsuario { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
    }
}