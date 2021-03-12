using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class GravarFaleConoscoSaidaModel
    {
        public int CodigoMensagem { get; set; }
        public string Mensagem { get; set; }
        public bool Sucesso { get; set; }
    }
}
