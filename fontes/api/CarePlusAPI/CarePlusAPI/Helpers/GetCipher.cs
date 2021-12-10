using Microsoft.Extensions.Options;
using System;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Helpers
{
    public interface IGetCipher {
        public string Decrypt(string info);
    }

    [ExcludeFromCodeCoverage]
    public class GetCipher : Cipher, IGetCipher
    {
        protected static string CiphersPath;
        private readonly AppSettings _appSettings;

        public GetCipher(
            IOptions<AppSettings> appSettings
            )
        {
            _appSettings = appSettings.Value;
            CiphersPath = _appSettings.CiphersPath;
        }

        public virtual string Decrypt(string info)
        {
            Tuple<string, string> infos = Read(CiphersPath);

            byte[] keyBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item1);

            byte[] ivBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item2);

            string decrytedInfo = ManagedAes.Decrypt(info, keyBytes, ivBytes);

            return decrytedInfo;
        }
    }
}
