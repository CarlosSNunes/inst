using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Serialization;

namespace CarePlusAPI.Helpers
{
    [Serializable]
    [ExcludeFromCodeCoverage]
    public class AppException : Exception
    {
        public AppException()
        {
        }

        public AppException(string message)
            : base(message)
        {
        }

        public AppException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected AppException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}