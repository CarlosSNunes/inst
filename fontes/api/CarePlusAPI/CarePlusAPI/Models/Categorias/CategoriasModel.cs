using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Categorias
{
    [ExcludeFromCodeCoverage]
    public class CategoriasModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
    }
}
