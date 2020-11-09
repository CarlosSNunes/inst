using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_POST")]
    public class Post
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("TITULO")]
        public string Titulo { get; set; }
        [Column("SUBTITULO")]
        public string Subtitulo { get; set; }
        [Column("DESCRICAO")]
        public string Descricao { get; set; }
        [Column("DESCRICAO_PREVIA")]
        public string DescricaoPrevia { get; set; }
        [Column("DATA_PUBLICACAO")]
        public DateTime DataPublicacao { get; set; }
        [Column("DATA_EXPIRACAO")]
        public DateTime? DataExpiracao { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
        [Column("CAMINHO_IMAGEM")]
        public string CaminhoImagem { get; set; }
        [Column("NOME_IMAGEM")]
        public string NomeImagem { get; set; }
        [Column("DESTAQUE")]
        public char Destaque { get; set; }
        [Column("ATIVO")]
        public char Ativo { get; set; }
        [Column("VIZUALIZACOES")]
        public int Vizualizacoes { get; set; }
        [Column("TITULO_PAGINA_SEO")]
        public string TituloPaginaSEO { get; set; }
        [Column("DESCRICAO_PAGINA_SEO")]
        public string DescricaoPaginaSEO { get; set; }
        [Column("SLUG")]
        public string Slug { get; set; }

        [Column("CATEGORIA_ID")]
        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; }

        public virtual ICollection<PostTag> PostTag { get; set; }
    }
}