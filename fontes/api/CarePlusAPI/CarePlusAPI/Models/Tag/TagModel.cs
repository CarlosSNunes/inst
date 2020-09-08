//===============================================================================
//Web API Tag
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Tag para uso do NEOCMS
//==============================================================================

using System;
using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Tag
{
    [ExcludeFromCodeCoverage]
    public class TagModel
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}