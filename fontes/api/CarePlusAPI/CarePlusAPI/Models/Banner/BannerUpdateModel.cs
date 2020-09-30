using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Banner
{
    [ExcludeFromCodeCoverage]
    public class BannerUpdateModel
    {
        [Required]
        public int? Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Titulo { get; set; }
        [StringLength(100)]
        public string Subtitulo { get; set; }
        [StringLength(150)]
        [Required]
        public string Area { get; set; }
        public int TempoExibicao { get; set; }
        [StringLength(255)]
        public string Descricao { get; set; }
        [Required]
        [StringLength(100)]
        public string Rota { get; set; }
        [Required]
        public char LinkExterno { get; set; }
        [StringLength(255)]
        public string Link { get; set; }
        [Required]
        public char Ativo { get; set; }
        public IFormFile Arquivo { get; set; }
        public IFormFile ArquivoMobile { get; set; }
        [StringLength(255)]
        public string CaminhoDesktop { get; set; }
        [StringLength(255)]
        public string NomeImagemDesktop { get; set; }
        [StringLength(255)]
        public string CaminhoMobile { get; set; }
        [StringLength(255)]
        public string NomeImagemMobile { get; set; }
        public int Ordem { get; set; }

    }
}