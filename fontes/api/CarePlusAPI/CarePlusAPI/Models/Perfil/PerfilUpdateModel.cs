

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Perfil
{
    [ExcludeFromCodeCoverage]
    public class PerfilUpdateModel
    {
        [Required]
        public int? Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int? PerfilId { get; set; }
    }
}