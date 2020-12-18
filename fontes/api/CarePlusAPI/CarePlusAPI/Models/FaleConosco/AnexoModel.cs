using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class AnexoModel
    {
        public string FileBytes { get; set; } // base64 em string do arquivo
        public string FileName { get; set; }
    }
}
