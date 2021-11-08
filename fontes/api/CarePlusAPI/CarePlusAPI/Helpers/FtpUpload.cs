using System.Diagnostics.CodeAnalysis;
using System.IO;
using CarePlus.Dotnet.Ftp;
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
        private readonly ISetCipher _setCipher;
        private readonly AppSettings _appSettings;

        public FtpUpload(
            IGetCipher getCipher,
            ISetCipher setCipher,
            IOptions<AppSettings> appSettings
            )
        {
            _getCipher = getCipher;
            _setCipher = setCipher;
            _appSettings = appSettings.Value;
        }


        public virtual void Upload(string filePath, string remotePath, string filename)
        {
            if (ftpUser == null && ftpPassword == null)
            {
                ftpUser = _getCipher.Decrypt(_appSettings.AssetsServerUser);
                ftpPassword = _getCipher.Decrypt(_appSettings.AssetsServerPass);
            }

            byte[] fileBytes = File.ReadAllBytes(filePath);

            FtpInfo ftpInfo = new FtpInfo
            {
               UserName = ftpUser,
               Password = ftpPassword,
               HostName = _appSettings.AssetsServerIp,
               RemoteFilePath = remotePath,
               RemoteFileName = filename,
               Ssl = true,
               AuthTls = false,
               Port = 990,
               PassiveMode = true,
               FileBytes = fileBytes
            };

            Ftp ftp = new Ftp(ftpInfo);
            ftp.UploadData();
        }
    }
}
