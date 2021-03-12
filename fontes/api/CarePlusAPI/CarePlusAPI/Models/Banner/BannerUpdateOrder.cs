using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Banner
{
    [ExcludeFromCodeCoverage]
    public class AreaUpdateOrder
    {
        [Required]
        public BannerUpdateOrder Area { get; set; }
    }

    [ExcludeFromCodeCoverage]
    public class BannerUpdateOrder
    {
        [Required]
        public string AreaName { get; set; }

        [Required]
        [MinLength(1)]
        public List<BannerOrder> Banners { get; set; }
    }
}
