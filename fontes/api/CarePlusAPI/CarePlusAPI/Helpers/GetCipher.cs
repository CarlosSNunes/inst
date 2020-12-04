using System;
namespace CarePlusAPI.Helpers
{
    public class GetCipher
    {

        public static Tuple<string, string> read ()
        {
            var text = System.IO.File.ReadAllText(Startup.CiphersPath);

            var key = text.Substring(text.IndexOf("Chave="), text.IndexOf("\nVetor=")).Replace("Chave=", "");

            var iv = text.Replace($"{key}", "").Replace("\n", "").Replace("Chave=", "").Replace("Vetor=", "");

            return new Tuple<string, string>(key, iv);
        }


        public static string Decrypt(string info)
        {
            Tuple<string, string> infos = read();

            byte[] keyBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item1);

            byte[] ivBytes = System.Text.Encoding.ASCII.GetBytes(infos.Item2);

            byte[] encryptedInfo = Convert.FromBase64String(info);

            string decrytedInfo = ManagedAes.Decrypt(encryptedInfo, keyBytes, ivBytes);

            return decrytedInfo;
        }
    }
}
