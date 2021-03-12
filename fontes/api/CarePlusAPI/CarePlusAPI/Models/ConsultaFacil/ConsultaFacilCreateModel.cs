using CarePlusAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.ConsultaFacil
{
    [ExcludeFromCodeCoverage]
    public class ConsultaFacilCreateModel
    {
        [Required]
        [StringLength(150)]
        public string Nome { get; set; }
        [Required]
        [StringLength(150)]
        public string Especialidade { get; set; }
        [Required]
        public IList<EnderecoClinica> EnderecoClinica { get; set; }
        [Required]
        public IList<HorarioClinica> HorarioClinica { get; set; }
        [Required]
        public char Fechada { get; set; }
        [Required]
        public string Telefone { get; set; }

    }
}
