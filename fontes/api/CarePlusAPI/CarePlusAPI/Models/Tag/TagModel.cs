
using System;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Tag
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