//===============================================================================
//Web API Banner
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Banner para uso do NEOCMS
//==============================================================================

using System;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Banner
{
    [ExcludeFromCodeCoverage]
    public class BannerModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Subtitulo { get; set; }
        public string Descricao { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Rota { get; set; }
        public char LinkExterno { get; set; }
        public string Link { get; set; }
        public string CaminhoDesktop { get; set; }
        public string NomeImagemDesktop { get; set; }
        public string CaminhoMobile { get; set; }
        public string NomeImagemMobile { get; set; }
        public string NomeImagem { get; set; }
        public char Ativo { get; set; }
        public string Area { get; set; }
        public int Ordem { get; set; }
        public int TempoExibicao { get; set; }
    }
}