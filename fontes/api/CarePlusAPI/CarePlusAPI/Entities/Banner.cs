using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_BANNER")]
    public class Banner
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("TITULO")]
        public string Titulo { get; set; }
        [Column("SUBTITULO")]
        public string Subtitulo { get; set; }
        [Column("DESCRICAO")]
        public string Descricao { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
        [Column("ROTA")]
        public string Rota { get; set; }
        [Column("LINK_EXTERNO")]
        public char LinkExterno { get; set; }
        [Column("LINK")]
        public string Link { get; set; }
        [Column("CAMINHO_DESKTOP")]
        public string CaminhoDesktop { get; set; }
        [Column("NOME_IMAGEM_DESKTOP")]
        public string NomeImagemDesktop { get; set; }
        [Column("CAMINHO_MOBILE")]
        public string CaminhoMobile { get; set; }
        [Column("NOME_IMAGEM_MOBILE")]
        public string NomeImagemMobile { get; set; }
        [Column("ATIVO")]
        public char Ativo { get; set; }

        [Column("AREA")]
        public string Area { get; set; }
        [Column("ORDEM")]
        public int Ordem { get; set; }
        [Column("TEMPO_EXIBICAO")]
        public int TempoExibicao { get; set; }

        [Column("USUARIO_ID")]
        public int UsuarioId { get; set; }
    }
}