using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarePlusAPI.Models.Banner
{
    public class AreaUpdateOrder
    {
        [Required]
        public BannerUpdateOrder Area { get; set; }
    }

    public class BannerUpdateOrder
    {
        [Required]
        public string AreaName { get; set; }

        [Required]
        [MinLength(1)]
        public List<BannerOrder> Banners { get; set; }
    }
}
