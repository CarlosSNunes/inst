//===============================================================================
//Web API Post
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Post para uso do NEOCMS
//==============================================================================

using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Models.Post
{
    [ExcludeFromCodeCoverage]
    public class BuscaPostModel
    {
        public string Texto { get; set; }
        public int? CategoriaId { get; set; }
        public int? TagId { get; set; }
    }
}