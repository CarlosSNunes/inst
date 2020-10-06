
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Perfil
{
    [ExcludeFromCodeCoverage]
    public class PerfilCreateModel
    {
        [Required]
        public int? PerfilId { get; set; }
        [Required]
        [StringLength(100)]
        public string Descricao { get; set; }
    }
}