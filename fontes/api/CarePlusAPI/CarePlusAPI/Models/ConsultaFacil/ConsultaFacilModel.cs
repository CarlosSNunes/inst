//===============================================================================
//Web API
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API para uso do NEOCMS
//==============================================================================

using Neotix.Neocms.CarePlusAPI.Entities;
using System.Collections.Generic;

namespace Neotix.Neocms.CarePlusAPI.Models.ConsultaFacil
{
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
