using CarePlusAPI.Entities;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.ConsultaFacil
{
    [ExcludeFromCodeCoverage]
    public class ConsultaFacilModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Especialidade { get; set; }
        public IList<EnderecoClinica> EnderecoClinica { get; set; }
        public IList<HorarioClinica> HorarioClinica { get; set; }
        public char Fechada { get; set; }
        public string Telefone { get; set; }
    }
}
