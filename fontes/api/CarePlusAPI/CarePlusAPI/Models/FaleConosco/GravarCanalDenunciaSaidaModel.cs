using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class GravarCanalDenunciaSaidaModel
    {
        public int CodigoMensagem { get; set; }
        public string Mensagem { get; set; }
        public bool Sucesso { get; set; }
    }
}
