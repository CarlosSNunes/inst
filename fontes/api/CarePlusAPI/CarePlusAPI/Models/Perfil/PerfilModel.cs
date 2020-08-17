//===============================================================================
//Web API Perfil
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Perfil para uso do NEOCMS
//==============================================================================

using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Perfil
{
    [ExcludeFromCodeCoverage]
    public class PerfilModel
    {
        public int? Id { get; set; }
        public string Descricao { get; set; }
    }
}