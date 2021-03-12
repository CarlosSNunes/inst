

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Perfil
{
    [ExcludeFromCodeCoverage]
    public class PerfilUpdateModel
    {
        [StringLength(100)]
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int? PerfilId { get; set; }
    }
}