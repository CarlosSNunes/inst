using System.Diagnostics.CodeAnalysis;
using System.IO;
using ImageMagick;

namespace CarePlusAPI.Helpers
{
    public interface ICompress
    {
        void CompressImage(string directoryName);
    }

    [ExcludeFromCodeCoverage]
    public class Compress: ICompress
    {
        public Compress()
        {
        }

        public virtual void CompressImage(string directoryName)
        {
            var fileInfo = new FileInfo(directoryName);

            var optimizer = new ImageOptimizer();
            optimizer.IgnoreUnsupportedFormats = true;
            optimizer.OptimalCompression = true;
            optimizer.LosslessCompress(fileInfo);

            fileInfo.Refresh();
        }
    }
}
