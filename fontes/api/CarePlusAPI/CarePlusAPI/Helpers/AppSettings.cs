using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public class AppSettings
    {
        public string Secret { get; set; }
        public string PathToSave { get; set; }
        public string VirtualPath { get; set; }
        public string PathToGet { get; set; }
        public string UrlDefault { get; set; }
        public string PostImageRelativePathDefault { get; set; }
        public string PathToSaveMobile { get; set; }
        public string PathToGetMobile { get; set; }
        public string WSPartnerToken { get; set; }
        public string WSPartnerLogin { get; set; }
        public string WSPartnerSenha { get; set; }
        public string WSPartnerURL { get; set; }
        public string WSPartnerURLHTTPS { get; set; }
        public string CiphersPath { get; set; }
        public string AdministratorEmail { get; set; }
        public string SeqUrl { get; set; }
        public string SeqTokenAdmin { get; set; }
        public string SeqTokenInst { get; set; }
        public string SeqTokenAPI { get; set; }
        public string CMSUrl { get; set; }
        public string AssetsServerUrl { get; set; }
        public bool HasAssetsServer { get; set; }
        public string AssetsServerIp { get; set; }
        public string AssetsServerUser { get; set; }
        public string AssetsServerPass { get; set; }
        public string OracleExpressDatabase { get; set; }
    }
}