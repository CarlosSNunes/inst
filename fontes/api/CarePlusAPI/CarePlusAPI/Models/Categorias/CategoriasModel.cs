//===============================================================================
//Web API Categorias
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Categorias para uso do NEOCMS
//==============================================================================

using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Categorias
{
    [ExcludeFromCodeCoverage]
    public class CategoriasModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
    }
}
