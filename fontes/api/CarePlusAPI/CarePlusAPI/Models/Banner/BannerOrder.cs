using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Banner
{
    [ExcludeFromCodeCoverage]
    public class BannerOrder
    {
        [Required]
        public int BannerId { get; set; }
        public char? Ativo { get; set; }
        public int Ordem { get; set; }
    }
}
