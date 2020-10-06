

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Tag
{
    [ExcludeFromCodeCoverage]
    public class TagCreateModel
    {
        [Required]
        [StringLength(100)]
        public string Descricao { get; set; }
    }
}