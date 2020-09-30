using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Newsletter
{
    [ExcludeFromCodeCoverage]
    public class NewsletterCreateModel
    {
        [StringLength(100)]
        [Required]
        public string NomeCompleto { get; set; }
        [StringLength(100)]
        [Required]
        public string Email { get; set; }
    }
}