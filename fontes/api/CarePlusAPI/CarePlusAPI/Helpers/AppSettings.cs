//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================

using System.Diagnostics.CodeAnalysis;

namespace Neotix.Neocms.CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public class AppSettings
    {
        public string Secret { get; set; }
        public string PathToSave { get; set; }
        public string PathToGet { get; set; }
        public string PathToSaveMobile { get; set; }
        public string PathToGetMobile { get; set; }
        public string TinyPngKey { get; set; }
        public string WSPartnerToken { get; set; }
        public string WSPartnerLogin { get; set; }
        public string WSPartnerSenha { get; set; }
        public string AdministratorEmail { get; set; }
    }
}