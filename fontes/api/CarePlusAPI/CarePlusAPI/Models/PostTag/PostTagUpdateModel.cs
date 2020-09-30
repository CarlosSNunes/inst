

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.PostTag
{
    [ExcludeFromCodeCoverage]
    public class PostTagUpdateModel
    {
        [Required]
        public int? TagId { get; set; }
    }
}
