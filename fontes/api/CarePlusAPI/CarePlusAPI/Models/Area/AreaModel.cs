using CarePlusAPI.Models.Banner;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace CarePlusAPI.Models.Area
{
    [ExcludeFromCodeCoverage]
    public class AreaModelUpdate
    {
        [Required]
        [StringLength(100)]
        public string AreaName { get; set; }
        public IList<BannerOrder> Banners{ get; set; }
    }
}
