using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Usuario;
using CarePlusHomolog;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using static CarePlusHomolog.PartnerServiceClient;

namespace CarePlusAPI.Services
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
        Task EnviarEmailConfirmacao(Usuario user);
        Task<bool> ValidaUsuario(string email, string senha);
        Task EnviarEmail(UsuarioCreateModel usuarioAutenticadoModel, string token);
        Task<string> SalvarRequisicao(UsuarioCreateModel usuarioAutenticadoModel);
        Task<RequisicaoUsuario> ValidateTokenRequisition(string token);
        Task<IList<RequisicaoUsuario>> BuscarRequisicoesCadastro();
        Task<IList<RequisicaoUsuario>> BuscarRequisicoesCadastroPendente();
        Task<IList<LogUsuarioDesativado>> ListarAcoesDesativacaoUsuarios();
        Task InativarUsuario(string userEmail, int idUserRequest);
    }
    [ExcludeFromCodeCoverage]
    public class UsuarioService : IUsuarioService
    {
        private readonly DataContext Context;
        private readonly AppSettings _appSettings;
        private readonly EndpointConfiguration _endpointConfiguration;
        private readonly PartnerServiceClient _partnerServiceClient;

        public UsuarioService(DataContext context, IOptions<AppSettings> appSettings)
        {
            _endpointConfiguration = EndpointConfiguration.SOAPEndPointPartner;

            _partnerServiceClient = new PartnerServiceClient(_endpointConfiguration);

            Context = context;
            _appSettings = appSettings.Value;
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

            Usuario usuario = await Context.Set<Usuario>().AsNoTracking().Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(x => x.Email == email);

            if (usuario == null)
            {
                return usuario;
            }

            if (!VerificarSenha(senha, usuario.SenhaHash, usuario.SenhaSalt))
                throw new AppException("Usuário e/ou senha incorretos");

            return usuario;
        }

        ///<summary>
        ///
        /// ///Esse método serve para listar todos os usuários da base.
        ///
        ///</summary>
        public async Task<List<Usuario>> Listar()
        {
            return await Context.Set<Usuario>().Include("UsuarioPerfil.Perfil").Where(x => x.Ativo == '1').AsNoTracking().ToListAsync();
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

            Usuario usuario = await Context.Set<Usuario>().Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
                throw new AppException("Usuario não encontrado");

            return usuario;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma lista de usuários que pediram requisição ao sistema. 
        ///
        ///</summary>        
        public async Task<IList<RequisicaoUsuario>> BuscarRequisicoesCadastro()
        {
            IList<RequisicaoUsuario> req = await Context.RequisicaoUsuario.ToListAsync();

            if (req == null)
                throw new AppException("Usuarios não encontrados");

            return req;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma lista de usuários que pediram requisição ao sistema e ainda está pendente. 
        ///
        /// ///</summary>        
        public async Task<IList<RequisicaoUsuario>> BuscarRequisicoesCadastroPendente()
        {
            IList<RequisicaoUsuario> req = await Context.RequisicaoUsuario.Where(x => x.Sucesso == '0' && x.Expirado == '0').AsNoTracking().ToListAsync();

            if (req == null)
                throw new AppException("Usuarios não encontrados");

            return req;
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

            return Context.Set<Usuario>().Any(u => u.Id == id);
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

            if (await Context.Set<Usuario>().AnyAsync(x => x.Email == model.Email))
                throw new AppException($"Email {model.Email} ja utilizado");

            CriarSenha(senha, out byte[] senhaHash, out byte[] senhaSalt);

            model.SenhaHash = senhaHash;
            model.SenhaSalt = senhaSalt;
            model.Ativo = '1';

            await Context.Set<Usuario>().AddAsync(model);

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

            Usuario usuario = await Context.Set<Usuario>().FindAsync(model.Id);

            if (usuario == null)
                throw new AppException("Usuário não encontrado!");

            if (!string.IsNullOrWhiteSpace(model.Email) && model.Email != usuario.Email)
            {
                if (await Context.Set<Usuario>().AnyAsync(x => x.Email == model.Email))
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

            Context.Set<Usuario>().Update(usuario);
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

            Usuario user = await Context.Set<Usuario>().Include("UsuarioPerfil").FirstOrDefaultAsync(u => u.Id == id);

            if (user != null)
            {
                Context.Set<UsuarioPerfil>().RemoveRange(user.UsuarioPerfil);
                Context.Set<Usuario>().Remove(user);
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
        public static void CriarSenha(string senha, out byte[] senhaHash, out byte[] senhaSalt)
        {
            System.Security.Cryptography.HMACSHA512 hmac = new System.Security.Cryptography.HMACSHA512();
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
        [ExcludeFromCodeCoverage]
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

            List<UsuarioPerfil> perfis = await Context.Set<UsuarioPerfil>().Where(b => b.UsuarioId == id).ToListAsync();
            Context.RemoveRange(perfis);
        }

        ///<summary>
        ///
        ///Esse método serve para enviar o email de confirmação de cadastro do usuario
        ///
        ///</summary>
        ///<param name="usuario">Id do usuário</param>
        public async Task EnviarEmailConfirmacao(Usuario usuario)
        {
            if (usuario == null || usuario.Id == 0)
                throw new AppException("O usuário cadastrado está como nulo ou não foi encontrado");

            string token = Logar().Result;

            WSParametroEmail email = new WSParametroEmail()
            {
                Assunto = "",
                Para = usuario.Email,
                CopiaOculta = "rafael.henrique@neotix.com.br",
                Corpo = $"Bem vindo {usuario.Nome}!!",
                CodigoTipoEmail = 1,
                Token = token
            };

            await _partnerServiceClient.EnviarEmailAsync(email);

            return;

        }

        ///<summary>
        ///
        ///Esse método serve para consumir o método Logar do WS Partner e obter um token       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [ExcludeFromCodeCoverage]
        private async Task<string> Logar()
        {
            try
            {
                string decryptedToken = GetCipher.Decrypt(_appSettings.WSPartnerToken);
                string decryptedLogin = GetCipher.Decrypt(_appSettings.WSPartnerLogin);
                string decryptedPass = GetCipher.Decrypt(_appSettings.WSPartnerSenha);
                LoginPartnerOut loginPartnerOut = new LoginPartnerOut()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = decryptedToken,
                    Login = decryptedLogin,
                    Senha = decryptedPass,
                    TokenTransacao = ""
                };

                var result = await _partnerServiceClient.LogarAsync(loginPartnerOut);

                var token = result.LoginPartner.TokenTransacao;

                return token;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para consumir o método Logar do WS Partner e obter um token       
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<bool> ValidaUsuario(string email, string senha)
        {
            try
            {
                LoginADOut loginADOut = new LoginADOut()
                {
                    Email = email,
                    Senha = senha
                };

                var result = await _partnerServiceClient.ValidarLoginADAsync(loginADOut, 0);

                if (result.CodigoMensagem == 0)
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task EnviarEmail(UsuarioCreateModel usuarioAutenticadoModel, string token)
        {
            try
            {
                string auth = Logar().Result;

                WSParametroEmail parametroEmail = new WSParametroEmail()
                {
                    Token = auth,
                    Para = _appSettings.AdministratorEmail,
                    Copia = "",
                    CopiaOculta = "",
                    Assunto = $"Requisição de Cadastro de Usuario - {usuarioAutenticadoModel.Email}",
                    Corpo = $"A URL para o novo cadastro é:  http://localhost:9090/Usuario/valida-requisicao/{token}",
                    CodigoTipoEmail = 0,
                    ListaAnexosPorByte = new AnexoByte[0]

                };

                await _partnerServiceClient.EnviarEmailAsync(parametroEmail);

                return;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<string> SalvarRequisicao(UsuarioCreateModel usuario)
        {
            if (usuario == null)
                throw new AppException("O usuário não pode estar nulo");

            try
            {
                RequisicaoUsuario rq = new RequisicaoUsuario()
                {
                    UsuarioNome = usuario.Nome,
                    UsuarioEmail = usuario.Email,
                    UsuarioSenha = usuario.Senha,
                    Token = Guid.NewGuid().ToString(),
                    Sucesso = '0'
                };

                await Context.RequisicaoUsuario.AddAsync(rq);
                await Context.SaveChangesAsync();

                return rq.Token;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<RequisicaoUsuario> ValidateTokenRequisition(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new AppException("O token não pode estar nulo ou vazio");

            try
            {
                var requisicao = await Context.RequisicaoUsuario.Where(x => x.Token == token && x.Expirado == '0' && x.Sucesso == '0').FirstOrDefaultAsync();

                if (requisicao != null)
                {

                    requisicao.Expirado = '1';
                    Context.RequisicaoUsuario.Update(requisicao);
                    await Context.SaveChangesAsync();


                    //await Criar(new Usuario() { Nome = requisicao.UsuarioNome, Email = requisicao.UsuarioEmail }, requisicao.UsuarioSenha);

                    return requisicao;
                }
                else
                {
                    throw new AppException("Requisição não encontrada no banco de dados ou token ja utilizado");
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        ///<summary>
        ///
        ///Esse método serve para listar Log de inativação de usuário
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        public async Task<IList<LogUsuarioDesativado>> ListarAcoesDesativacaoUsuarios()
        {
            IList<LogUsuarioDesativado> listaRequisicoes = await Context.LogUsuarioDesativado.ToListAsync();

            if (listaRequisicoes == null)
                throw new AppException("Requisicoes de desativação não encontradas");


            return listaRequisicoes;
        }

        /// <summary>
        /// Esse método serve para inativar um usuário
        /// </summary>
        /// <param name="userEmail"></param>
        /// <returns></returns>
        public async Task InativarUsuario(string userEmail, int idUserRequest)
        {
            if (string.IsNullOrWhiteSpace(userEmail))
                throw new AppException("O e-mail do usuário não pode estar vazio.");

            Usuario usuario = await Context.Set<Usuario>().Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(u => u.Email == userEmail);

            if (usuario == null)
                throw new AppException("Usuario não encontrado");

            usuario.Ativo = '0';

            Context.Set<Usuario>().Update(usuario).Property(x => x.Ativo).IsModified = true;

            LogUsuarioDesativado logUsr = new LogUsuarioDesativado()
            {        
                Id_Requisitante = idUserRequest,
                Email = userEmail,
                DataCadastro = DateTime.Now
            };

            await Context.LogUsuarioDesativado.AddAsync(logUsr);
            await Context.SaveChangesAsync();

        }
    }
}