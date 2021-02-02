using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace CarePlusAPI.Helpers
{
    public interface IGetCipher {
        public string Decrypt(string info);
    }

    [ExcludeFromCodeCoverage]
    public class GetCipher: IGetCipher
    {
        protected static string CiphersPath;
        protected static Tuple<string, string> KeyAndIv;

        public GetCipher()
        {
            var value = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT");

            string variableFile = string.Empty;

            if (value != null && value != "")
            {
                variableFile = $"appsettings.{value}.json";
            }
            else
            {
                variableFile = "appsettings.json";
            }

            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
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
            if (KeyAndIv == null)
            {
                var text = File.ReadAllText(CiphersPath);

                var key = text.Substring(text.IndexOf("Chave="), text.IndexOf("\nVetor=")).Replace("Chave=", "").Replace("\r", "");

                var iv = text.Replace($"{key}", "").Replace("\n", "").Replace("Chave=", "").Replace("Vetor=", "").Replace("\r", "");

                KeyAndIv = new Tuple<string, string>(key, iv);
            }

            return KeyAndIv;
        }


        public virtual string Decrypt(string info)
        {
            Tuple<string, string> infos = Read();

            byte[] keyBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item1);

            byte[] ivBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item2);

            string decrytedInfo = ManagedAes.Decrypt(info, keyBytes, ivBytes);

            return decrytedInfo;
        }
    }
}
