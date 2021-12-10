using System;
using System.IO;

namespace CarePlusAPI.Helpers
{
    public abstract class Cipher
    {
        protected static Tuple<string, string> KeyAndIv;

        protected virtual Tuple<string, string> Read(string ciphersPath)
        {
            if (KeyAndIv == null)
            {
                var text = File.ReadAllText(ciphersPath);

                var key = text.Substring(text.IndexOf("Chave="), text.IndexOf("\nVetor=")).Replace("Chave=", "").Replace("\r", "");

                var iv = text.Replace($"{key}", "").Replace("\n", "").Replace("Chave=", "").Replace("Vetor=", "").Replace("\r", "");

                KeyAndIv = new Tuple<string, string>(key, iv);
            }

            return KeyAndIv;
        }
    }
}
