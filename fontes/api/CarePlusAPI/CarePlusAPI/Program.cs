using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI
{
    [ExcludeFromCodeCoverage]
    public class Program
    {
        protected Program() { }

        ///<summary>
        ///
        ///Esse método serve para iniciar a aplicação Web API
        ///
        ///</summary>
        ///<param name="args">Array de argumentos para iniciação da aplicação</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        ///<summary>
        ///
        ///Esse configuração de url e preparação para subir a aplicação
        ///
        ///</summary>
        ///<param name="args">Array de argumentos para iniciação da aplicação</param>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                        .UseUrls("https://localhost:4000");
                });
    }
}
