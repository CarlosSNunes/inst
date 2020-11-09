using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class GravarOuvidoriaEntradaModel
    {
        public string Origem { get; set; }
        public string Token { get; set; }
        public string Certificado { get; set; }
        public int DDDTelefoneCelular { get; set; }
        public int TelefoneCelular { get; set; }
        public int DDDTelefoneResidencial { get; set; }
        public int TelefoneResidencial { get; set; }
        public string Email { get; set; }
        public int IdAssunto { get; set; }
        public int IdClassificacao { get; set; }
        public string Mensagem { get; set; }
        public string Nome { get; set; }
        public long CPF { get; set; }
        public string ProtocoloAtendimento { get; set; }
        public ListaAnexoModel Anexo { get; set; }
    }
}
