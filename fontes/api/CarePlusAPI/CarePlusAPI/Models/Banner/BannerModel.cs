using System;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Banner
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
        public string NomeImagemDesktop { get; set; }        
        public string NomeImagemMobile { get; set; }
        public string NomeImagem { get; set; }
        public string NomeLink { get; set; }
        public char Ativo { get; set; }
        public string Area { get; set; }
        public int Ordem { get; set; }
        
        private int TempoExibicaoMilisegundos;
        public int TempoExibicao
        {
            get 
            { 
                return TempoExibicaoMilisegundos; 
            }
            set 
            { 
                TempoExibicaoMilisegundos = value * 1000; 
            }
        }

        public string CaminhoCompletoDesktop { get; set; }

        private string CaminhoCompletoDesktop_build;
        public string CaminhoDesktop
        {
            get 
            {
                return CaminhoCompletoDesktop_build; 
            }
            set 
            { 
                CaminhoCompletoDesktop_build = value;
                CaminhoCompletoDesktop = $"{CaminhoDesktop}/{NomeImagemDesktop}"; 
            }
        }

        public string CaminhoCompletoMobile { get; set; }
        private string CaminhoCompletoMobile_build;
        public string CaminhoMobile
        {
            get
            {
                return CaminhoCompletoMobile_build;
            }
            set
            {
                CaminhoCompletoMobile_build = value;
                CaminhoCompletoMobile = $"{CaminhoMobile}/{NomeImagemMobile}";
            }
        }


    }
}