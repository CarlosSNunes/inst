
using Newtonsoft.Json;
using System;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Helpers
{
    [ExcludeFromCodeCoverage]
    public static class ErrorHandler
    {
        ///<summary>
        ///
        ///Esse método serve para tratar a mensagem de erro que será devolvida para quem fez a requisição
        ///
        ///</summary>
        ///<param name="exception">Exceção que ocorreu em tempo de execução</param>
        public static string TreatError(Exception exception)
        {
            string message = exception.InnerException?.Message ?? exception.Message;
            return JsonConvert.SerializeObject(new { message });
        }
    }
}