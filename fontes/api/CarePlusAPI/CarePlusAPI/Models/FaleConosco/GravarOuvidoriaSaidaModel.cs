using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class GravarOuvidoriaSaidaModel
    {
        public int Protocolo { get; set; }
        public string Erros { get; set; }
        public bool Sucesso { get; set; }
    }
}
