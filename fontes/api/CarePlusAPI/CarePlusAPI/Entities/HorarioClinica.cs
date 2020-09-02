//===============================================================================
//Web API 
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade HorarioClinica para uso do NEOCMS
//==============================================================================

using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_HORARIO_CLINICA")]
    public class HorarioClinica
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("PERIODO")]
        public string Periodo { get; set; }
        [Column("DATA_HORA_INICIO")]
        public DateTime DataHoraInicio { get; set; }
        [Column("DATA_HORA_FIM")]
        public DateTime DataHoraFim { get; set; }

        [Column("CLINICA_ID")]
        public int ClinicaId { get; set; }
        public virtual Clinica Clinica { get; set; }
    }
}