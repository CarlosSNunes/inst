using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CarePlusAPI.Entities
{
    [ExcludeFromCodeCoverage]
    [Table("TB_USUARIO")]
    public class Usuario
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("NOME")]
        public string Nome { get; set; }
        [Column("EMAIL")]
        public string Email { get; set; }
        [Column("DATA_CADASTRO")]
        public DateTime DataCadastro { get; set; }
        [Column("SENHA_HASH")]
        public byte[] SenhaHash { get; set; }
        [Column("SENHA_SALT")]
        public byte[] SenhaSalt { get; set; }
        [Column("ATIVO")]
        public char Ativo { get; set; }

        public virtual ICollection<UsuarioPerfil> UsuarioPerfil { get; set; }

    }
}