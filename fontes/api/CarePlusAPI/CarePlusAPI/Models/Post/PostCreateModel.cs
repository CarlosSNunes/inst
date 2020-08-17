//===============================================================================
//Web API Post
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Post para uso do NEOCMS
//==============================================================================

using Microsoft.AspNetCore.Http;
using Neotix.Neocms.CarePlusAPI.Models.PostTag;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Post
{
    [ExcludeFromCodeCoverage]
    public class PostCreateModel
    {
        [Required]
        [StringLength(100)]
        public string Titulo { get; set; }
        [StringLength(100)]
        public string Subtitulo { get; set; }
        [Required]
        [StringLength(255)]
        public string DescricaoPrevia { get; set; }
        [Required]
        [StringLength(4000)]
        public string Descricao { get; set; }
        [Required]
        public DateTime DataPublicacao { get; set; }
        public DateTime? DataExpiracao { get; set; }
        public IFormFile Arquivo { get; set; }
        [StringLength(255)]
        public string CaminhoImagem { get; set; }
        [StringLength(255)]
        public string NomeImagem { get; set; }
        [Required]
        public char Destaque { get; set; }
        [Required]
        public char Ativo { get; set; }
        public int Vizualizacoes { get; set; }
        [Required]
        [StringLength(150)]
        public string TituloPaginaSEO { get; set; }
        [Required]
        [StringLength(200)]
        public string DescricaoPaginaSEO { get; set; }
        public int CategoriaId { get; set; }

        public List<PostTagCreateModel> PostTag { get; set; }
    }
}