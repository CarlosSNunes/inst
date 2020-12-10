using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

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
