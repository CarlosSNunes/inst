//===============================================================================
//Web API Usuario
//
//===============================================================================
//Copyright (C) 2020-2020 Neotix
//Todos direitos reservados.
//Web API da entidade Usuario para uso do NEOCMS
//==============================================================================

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Neotix.Neocms.CarePlusAPI.Entities;
using Neotix.Neocms.CarePlusAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Neotix.Neocms.CarePlusAPI.Services
{
    public interface IUsuarioService
    {
        Task<Usuario> Autenticar(string email, string senha);
        Task<List<Usuario>> Listar();
        Task<Usuario> Buscar(int id);
        bool Validar(int id);
        Task<Usuario> Criar(Usuario model, string senha);
        Task Atualizar(Usuario model, string senha = null);
        Task Excluir(int id);
        Task ExcluirPerfis(int id);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly DataContext Context;

        public UsuarioService(DataContext context)
        {
            Context = context;
        }

        ///<summary>
        ///
        ///Esse método serve para autenticar um usuário através do usuário e senha
        ///
        ///</summary>
        ///<param name="email">Email do usuário</param>
        ///<param name="senha">Senha do usuário</param>
        public async Task<Usuario> Autenticar(string email, string senha)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new AppException("O email é de preenchimento obrigatório");

            if (string.IsNullOrWhiteSpace(senha))
                throw new AppException("A senha é de preenchimento obrigatório");

            Usuario usuario = await Context.Usuario.Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(x => x.Email == email);

            if (usuario == null || !VerificarSenha(senha, usuario.SenhaHash, usuario.SenhaSalt))
                throw new AppException("Usuário e/ou senha incorretos");

            return usuario;
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos os usuários da base.
        ///
        ///</summary>
        public async Task<List<Usuario>> Listar()
        {
            return await Context.Usuario.Include("UsuarioPerfil.Perfil").ToListAsync();
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um usuário por Id.
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        public async Task<Usuario> Buscar(int id)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            Usuario usuario = await Context.Usuario.Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
                throw new AppException("Usuario não encontrado");

            return usuario;
        }

        ///<summary>
        ///
        ///Esse método serve para validar um usuário por Id.
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        public bool Validar(int id)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            return Context.Usuario.Any(u => u.Id == id);
        }

        ///<summary>
        ///
        ///Esse método serve inserir um usuário na base.
        ///
        ///</summary>
        ///<param name="model">Model de usuário para ser inserido</param>
        ///<param name="senha">Senha do usuário para ser criptografada</param>
        public async Task<Usuario> Criar(Usuario model, string senha)
        {
            if (model == null)
                throw new AppException("O usuário não pode estar nulo");

            if (string.IsNullOrWhiteSpace(senha))
                throw new AppException("A senha tem que estar preenchida");

            if (await Context.Usuario.AnyAsync(x => x.Email == model.Email))
                throw new AppException($"Email {model.Email} ja utilizado");

            CriarSenha(senha, out byte[] senhaHash, out byte[] senhaSalt);

            model.SenhaHash = senhaHash;
            model.SenhaSalt = senhaSalt;

            await Context.Usuario.AddAsync(model);
            await Context.SaveChangesAsync();

            return model;
        }

        ///<summary>
        ///
        ///Esse método serve atualizar um usuário na base.
        ///
        ///</summary>
        ///<param name="model">Model de usuário para ser atualizado</param>
        ///<param name="senha">Senha do usuário para ser criptografada</param>
        public async Task Atualizar(Usuario model, string senha = null)
        {
            if (model == null)
                throw new AppException("O usuário não pode estar nulo");

            Usuario usuario = await Context.Usuario.FindAsync(model.Id);

            if (usuario == null)
                throw new AppException("Usuário não encontrado!");

            if (!string.IsNullOrWhiteSpace(model.Email) && model.Email != usuario.Email)
            {
                if (await Context.Usuario.AnyAsync(x => x.Email == model.Email))
                    throw new AppException($"Email { model.Email } ja utilizado");

                usuario.Email = model.Email;
            }

            if (!string.IsNullOrWhiteSpace(model.Nome))
                usuario.Nome = model.Nome;

            if (!string.IsNullOrWhiteSpace(senha))
            {
                CriarSenha(senha, out byte[] senhaHash, out byte[] senhaSalt);

                usuario.SenhaHash = senhaHash;
                usuario.SenhaSalt = senhaSalt;
            }

            await ExcluirPerfis(model.Id);

            usuario.UsuarioPerfil = model.UsuarioPerfil;

            Context.Usuario.Update(usuario);
            await Context.SaveChangesAsync();
        }

        ///<summary>
        ///
        ///Esse método serve excluir um usuário na base.
        ///
        ///</summary>
        ///<param name="id">Id do usuário a ser excluído</param>
        public async Task Excluir(int id)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            Usuario user = await Context.Usuario.Include("UsuarioPerfil").FirstOrDefaultAsync(u => u.Id == id);

            if (user != null)
            {
                Context.UsuarioPerfil.RemoveRange(user.UsuarioPerfil);
                Context.Usuario.Remove(user);
                await Context.SaveChangesAsync();
            }
            else
                throw new AppException("Usuario não encontrado!");
        }

        ///<summary>
        ///
        ///Esse método serve para criar uma nova sernha criptografada.
        ///
        ///</summary>
        ///<param name="senha">Senha a ser criptografada</param>
        ///<param name="senhaHash">Array de byte do hash da senha criada</param>
        ///<param name="senhaSalt">Array de byte do salt da senha criada</param>
        private static void CriarSenha(string senha, out byte[] senhaHash, out byte[] senhaSalt)
        {
            using System.Security.Cryptography.HMACSHA512 hmac = new System.Security.Cryptography.HMACSHA512();
            senhaSalt = hmac.Key;
            senhaHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(senha));
        }

        ///<summary>
        ///
        ///Esse método serve para verificar uma sernha criptografada.
        ///
        ///</summary>
        ///<param name="senha">Senha a ser verificada</param>
        ///<param name="senhaHash">Array de byte do hash da senha a ser verificada</param>
        ///<param name="senhaSalt">Array de byte do salt da senha a ser verificada</param>
        private static bool VerificarSenha(string senha, byte[] senhaHash, byte[] senhaSalt)
        {
            using (System.Security.Cryptography.HMACSHA512 hmac = new System.Security.Cryptography.HMACSHA512(senhaSalt))
            {
                byte[] computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(senha));

                for (int i = 0; i < computedHash.Length; i++)
                    if (computedHash[i] != senhaHash[i])
                        return false;
            }

            return true;
        }

        ///<summary>
        ///
        ///Esse método serve para excluir os perfis vinculados ao id do usuário
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        public async Task ExcluirPerfis(int id)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            List<UsuarioPerfil> perfis = await Context.UsuarioPerfil.Where(b => b.UsuarioId == id).ToListAsync();
            Context.RemoveRange(perfis);
        }
    }
}