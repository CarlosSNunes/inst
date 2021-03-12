using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Categorias
{
    [ExcludeFromCodeCoverage]
    public class CategoriasUpdateModel
    {
        [Required]
        public int Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Titulo { get; set; }
        [StringLength(100)]
        [Required]
        public string Descricao { get; set; }
    }
}