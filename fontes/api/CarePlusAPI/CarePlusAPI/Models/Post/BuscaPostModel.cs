
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Post
{
    [ExcludeFromCodeCoverage]
    public class BuscaPostModel
    {
        public string Texto { get; set; }
        public int? CategoriaId { get; set; }
        public int? TagId { get; set; }
    }
}