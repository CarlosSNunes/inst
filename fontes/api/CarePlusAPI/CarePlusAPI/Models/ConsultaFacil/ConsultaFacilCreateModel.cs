//===============================================================================
//Web API
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using CarePlusAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarePlusAPI.Models.ConsultaFacil
{
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
