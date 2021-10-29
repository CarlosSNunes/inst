using Microsoft.Extensions.Options;
using System;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Helpers
{
    public interface ISetCipher
    {
        public string Encrypt(string info);
    }

    [ExcludeFromCodeCoverage]
    public class SetCipher : Cipher, ISetCipher
    {
        protected static string CiphersPath;
        private readonly AppSettings _appSettings;

        public SetCipher(
            IOptions<AppSettings> appSettings
            )
        {
            _appSettings = appSettings.Value;
            CiphersPath = _appSettings.CiphersPath;
        }

        public virtual string Encrypt(string info)
        {
            Tuple<string, string> infos = Read(CiphersPath);

            byte[] keyBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item1);

            byte[] ivBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item2);

            string encrytedInfo = ManagedAes.Encrypt(info, keyBytes, ivBytes);

            return encrytedInfo;
        }
    }
}
