using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.FaleConosco
{
    [ExcludeFromCodeCoverage]
    public class GravarFaleConoscoEntradaModel
    {
        public string Origem { get; set; }
        public string Token { get; set; }
        public int Assunto { get; set; }
        public string CPFCNPJ { get; set; }
        public string Certificado { get; set; }
        public int CodigoCarePlus { get; set; }
        public string Comentario { get; set; }
        public string DDDTelefone1 { get; set; }
        public string Telefone1 { get; set; }
        public string DDDTelefone2 { get; set; }
        public string Telefone2 { get; set; }
        public string Email { get; set; }
        public int IdTipo { get; set; }
        public string NomeContato { get; set; }
        public string TokenAutenticacao { get; set; }
        public string NomeEntidade { get; set; }
        public ListaAnexoModel LstAnexo { get; set; }

    }
}
