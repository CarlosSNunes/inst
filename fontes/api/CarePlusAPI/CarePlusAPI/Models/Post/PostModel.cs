
using CarePlusAPI.Models.Tag;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Post
{
    [ExcludeFromCodeCoverage]
    public class PostModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Subtitulo { get; set; }
        public string DescricaoPrevia { get; set; }
        public DateTime DataPublicacao { get; set; }
        public DateTime? DataExpiracao { get; set; }
        public DateTime DataCadastro { get; set; }
        public string CaminhoImagem { get; set; }
        public string NomeImagem { get; set; }
        public char Destaque { get; set; }
        public char Ativo { get; set; }
        public int Vizualizacoes { get; set; }
        public string TituloPaginaSEO { get; set; }
        public string DescricaoPaginaSEO { get; set; }
        public int CategoriaId { get; set; }
        public string Categoria { get; set; }
        public virtual List<TagModel> PostTag { get; set; }
    }
}