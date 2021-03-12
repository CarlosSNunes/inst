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
        private readonly AppSettings _appSettings;

        public GetCipher(
            IOptions<AppSettings> appSettings
            )
        {
            _appSettings = appSettings.Value;
            CiphersPath = _appSettings.CiphersPath;
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
