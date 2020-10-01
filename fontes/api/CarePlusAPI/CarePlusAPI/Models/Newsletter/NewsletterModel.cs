
using System;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Models.Newsletter
{
    [ExcludeFromCodeCoverage]
    public class NewsletterModel
    {
        public int Id { get; set; }
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public DateTime DataCadastro { get; set; }
    }
}
