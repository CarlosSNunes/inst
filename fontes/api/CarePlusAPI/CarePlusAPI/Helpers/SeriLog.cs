using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Serilog;
using Serilog.Core;
using System.Diagnostics.CodeAnalysis;
using System.IO;

namespace CarePlusAPI.Helpers
{
    public interface ISeriLog
    {
        void Log(EnumLogType logtype, object message, string origem);
    }

    [ExcludeFromCodeCoverage]
    public class SeriLog: ISeriLog
    {
        private readonly AppSettings _appSettings;
        private readonly IGetCipher _getCipher;

        public SeriLog(
            IOptions<AppSettings> appSettings,
            IGetCipher getCipher
            )
        {
            _appSettings = appSettings.Value;
            _getCipher = getCipher;
        }

        public SeriLog()
        {
        }


        public virtual void Log(EnumLogType logtype, object message, string origem)
        {
            var tag = "";
            switch (origem)
            {
                case "institucional":
                    tag = _getCipher.Decrypt(_appSettings.SeqTokenInst);
                    break;
                case "instadministrativo":
                    tag = _getCipher.Decrypt(_appSettings.SeqTokenAdmin);
                    break;
                default:
                    tag = _getCipher.Decrypt(_appSettings.SeqTokenAPI);
                    break;
            }

            var levelSwitch = new LoggingLevelSwitch();
            Serilog.Log.Logger = new LoggerConfiguration()
                          .WriteTo.Console()
                          .WriteTo.Seq(_appSettings.SeqUrl,
                               apiKey: tag, controlLevelSwitch: levelSwitch)
                          .CreateLogger();

            var jObjectLog = "";


            if (message != null)
            {
                jObjectLog = JsonConvert.SerializeObject(message);
            }
            else
            {
                jObjectLog = JsonConvert.SerializeObject(new { Mensagem = "O valor para log está nulo." });
            }

            switch (logtype)
            {
                case EnumLogType.Debug:
                    Serilog.Log.Debug(jObjectLog);
                    break;
                case EnumLogType.Information:
                    Serilog.Log.Information(jObjectLog);
                    break;
                case EnumLogType.Warning:
                    Serilog.Log.Warning(jObjectLog);
                    break;
                case EnumLogType.Error:
                    Serilog.Log.Error(jObjectLog);
                    break;
                case EnumLogType.Fatal:
                    Serilog.Log.Fatal(jObjectLog);
                    break;
                case EnumLogType.Verbose:
                    Serilog.Log.Verbose(jObjectLog);
                    break;
                default:
                    Serilog.Log.Information(jObjectLog);
                    break;
            }

            Serilog.Log.CloseAndFlush();
        }

    }
}

