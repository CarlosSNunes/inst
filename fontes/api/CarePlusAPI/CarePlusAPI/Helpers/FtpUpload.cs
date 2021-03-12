using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Net;
using System.Text;
using Microsoft.Extensions.Options;

namespace CarePlusAPI.Helpers
{

    public interface IFtpUpload
    {
        public void Upload(string filePath, string folder, string filename);
    }

    [ExcludeFromCodeCoverage]
    public class FtpUpload: IFtpUpload
    {
        protected static string ftpUser;
        protected static string ftpPassword;
        private readonly IGetCipher _getCipher;
        private readonly AppSettings _appSettings;

        public FtpUpload(
            IGetCipher getCipher,
            IOptions<AppSettings> appSettings
            )
        {
            _getCipher = getCipher;
            _appSettings = appSettings.Value;
        }


        public virtual void Upload(string filePath, string folder, string filename)
        {

            if (ftpUser == null && ftpPassword == null)
            {
                ftpUser = _getCipher.Decrypt(_appSettings.AssetsServerUser);
                ftpPassword = _getCipher.Decrypt(_appSettings.AssetsServerPass);
            }

            byte[] fileBytes = File.ReadAllBytes(filePath);


            // Get the object used to communicate with the server.
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create($"ftp://{_appSettings.AssetsServerIp}/{folder}/{filename}");
            request.Method = WebRequestMethods.Ftp.UploadFile;

            // This example assumes the FTP site uses anonymous logon.
            request.Credentials = new NetworkCredential(ftpUser, ftpPassword);
            request.UsePassive = true;
            request.UseBinary = true;

            request.ContentLength = fileBytes.Length;

            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(fileBytes, 0, fileBytes.Length);
            }

            using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }

            }
        }
    }
}
