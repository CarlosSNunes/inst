using System.ComponentModel.DataAnnotations;

namespace CarePlusAPI.Models.Usuario
{
    public class UsuarioDesativarModel
    {
        [Required]
        [StringLength(50)]
        public string NomeUsuario { get; set; }
    }
}
