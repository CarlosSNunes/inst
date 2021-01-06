using System;
using System.ComponentModel;

namespace CarePlusAPI.Enums
{
    public enum OriginEnumerator
    {
        [Description("institucional")]
        institucional = 1,
        [Description("gerinstitucional")]
        gerinstitucional = 2
    }

    public static class OriginEnumExtension
    {
        public static string ToDescriptionString(this OriginEnumerator val)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[])val
               .GetType()
               .GetField(val.ToString())
               .GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attributes.Length > 0 ? attributes[0].Description : string.Empty;
        }
    }

}