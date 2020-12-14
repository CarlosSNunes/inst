using System.Diagnostics.CodeAnalysis;
using System.IO;
using ImageMagick;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public class Compress
    {
        public Compress()
        {
        }

        public static void CompressImage(string directoryName)
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
