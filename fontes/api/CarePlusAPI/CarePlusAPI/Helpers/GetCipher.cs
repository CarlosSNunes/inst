using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public class GetCipher
    {
        protected static string CiphersPath;

        public GetCipher() {
            var value = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            string variableFile = string.Empty;

            if (value != null && value != "") {
                variableFile = $"appsettings.{value}.json";
            } else
            {
                variableFile = "appsettings.json";
            }

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(variableFile, optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            IConfigurationRoot configuration = builder.Build();

            IConfigurationSection appSettingsSection = configuration.GetSection("AppSettings");

            var appSettings = appSettingsSection.Get<AppSettings>();

            IOptions<AppSettings> _appSettings = Options.Create<AppSettings>(appSettings);

            CiphersPath = _appSettings.Value.CiphersPath;
        }

        protected virtual Tuple<string, string> Read ()
        {

            var text = File.ReadAllText(CiphersPath);

            var key = text.Substring(text.IndexOf("Chave="), text.IndexOf("\nVetor=")).Replace("Chave=", "");

            var iv = text.Replace($"{key}", "").Replace("\n", "").Replace("Chave=", "").Replace("Vetor=", "");

            return new Tuple<string, string>(key, iv);
        }


        public virtual string Decrypt(string info)
        {
            Tuple<string, string> infos = Read();

            byte[] keyBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item1);

            byte[] ivBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item2);

            byte[] encryptedInfo = Convert.FromBase64String(info);

            string decrytedInfo = ManagedAes.Decrypt(encryptedInfo, keyBytes, ivBytes);

            return decrytedInfo;
        }
    }
}
