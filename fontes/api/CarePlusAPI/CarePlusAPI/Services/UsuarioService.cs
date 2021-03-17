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
        Task<Usuario> BuscarPorNomeUsuario(string id);
        bool Validar(int id);
        Task<Usuario> Criar(Usuario model, string senha);
        Task Atualizar(Usuario model, string senha = null);
        Task<WSRetornoLoginPartner> LogarSite(string login, string senha = null);
        Task Excluir(int id);
        Task ExcluirPerfis(int id);
        Task EnviarEmailConfirmacao(Usuario user);
        Task<bool> ValidaUsuario(string nomeUsuario, string senha);
        Task EnviarEmail(UsuarioCreateModel usuarioAutenticadoModel, string token);
        Task<string> SalvarRequisicao(UsuarioCreateModel usuarioAutenticadoModel);
        Task<RequisicaoUsuario> ValidateTokenRequisition(string token);
        Task<RequisicaoUsuario> RemoveRequisition(string token);
        Task<IList<RequisicaoUsuario>> BuscarRequisicoesCadastro();
        Task<bool> BuscarRequisicoesCadastroPorNomeUsuario(string nomeUsuario);
        Task<Tuple<int, List<RequisicaoUsuario>>> BuscarRequisicoesCadastroPendente(int offset, int limit);
        Task<IList<LogUsuarioDesativado>> ListarAcoesDesativacaoUsuarios();
        Task InativarUsuario(string nomeUsuario, int idUserRequest);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly DataContext Context;
        private readonly AppSettings _appSettings;
        private readonly PartnerServiceClient _partnerServiceClient;
        private readonly EndpointConfiguration _endpointConfiguration;
        private readonly IGetCipher _getCipher;

        public UsuarioService(DataContext context, IOptions<AppSettings> appSettings, IGetCipher getCipher)
        {
            _endpointConfiguration = EndpointConfiguration.SOAPEndPointPartner;

            _partnerServiceClient = new PartnerServiceClient(_endpointConfiguration, appSettings.Value);

            Context = context;
            _appSettings = appSettings.Value;
            _getCipher = getCipher;
        }

        ///<summary>
        ///
        ///Esse método serve para autenticar um usuário através do usuário e senha
        ///
        ///</summary>
        ///<param name="nomeUsuario">] Nome de usuário do usuário</param>
        ///<param name="senha">Senha do usuário</param>
        public async Task<Usuario> Autenticar(string nomeUsuario, string senha)
        {
            if (string.IsNullOrWhiteSpace(nomeUsuario))
                throw new AppException("O nome de usuário é de preenchimento obrigatório");

            if (string.IsNullOrWhiteSpace(senha))
                throw new AppException("A senha é de preenchimento obrigatório");

            Usuario usuario = await Context.Set<Usuario>().AsNoTracking().Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(x => x.NomeUsuario == nomeUsuario);

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
            return await Context.Set<Usuario>().Include("UsuarioPerfil.Perfil").AsNoTracking().ToListAsync();
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
        ///Esse método serve para buscar um usuário por nome de usuário.
        ///
        ///</summary>
        ///<param name="nomeUsuario">Nome unico do usuário</param>
        public async Task<Usuario> BuscarPorNomeUsuario(string nomeUsuario) => await Context.Set<Usuario>().Include("UsuarioPerfil.Perfil").FirstOrDefaultAsync(u => u.NomeUsuario == nomeUsuario);

        ///<summary>
        ///
        ///Esse método serve para buscar uma lista de usuários que pediram requisição ao sistema. 
        ///
        ///</summary>        
        public async Task<bool> BuscarRequisicoesCadastroPorNomeUsuario(string numeUsuario)
        {
            RequisicaoUsuario req = await Context.RequisicaoUsuario.Where(ru => ru.NomeUsuario == numeUsuario && ru.Sucesso == '0' && ru.Expirado == '0').FirstOrDefaultAsync();

            if (req == null)
                return false;

            return true;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma lista de usuários que pediram requisição ao sistema. 
        ///
        ///</summary>        
        public async Task<IList<RequisicaoUsuario>> BuscarRequisicoesCadastro()
        {
            IList<RequisicaoUsuario> req = await Context.RequisicaoUsuario.ToListAsync();

            return req;
        }

        ///<summary>
        ///
        ///Esse método serve para buscar uma lista de usuários que pediram requisição ao sistema e ainda está pendente. 
        ///
        /// ///</summary>        
        public async Task<Tuple<int, List<RequisicaoUsuario>>> BuscarRequisicoesCadastroPendente(int offset, int limit)
        {

            var query = Context.RequisicaoUsuario.Where(x => x.Sucesso == '0' && x.Expirado == '0').AsNoTracking();

            var result = await PagingResults.GetPaged<RequisicaoUsuario>(query, offset, limit);


            int count = await query.CountAsync();

            return new Tuple<int, List<RequisicaoUsuario>>(count, result.Results);
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

            if (model.UsuarioRoot == '1' && (senha == null || senha == ""))
                throw new AppException("A senha não pode estar nula");

            if (await Context.Set<Usuario>().AnyAsync(x => x.NomeUsuario == model.NomeUsuario))
                throw new AppException($"Nome de usuário {model.NomeUsuario} ja utilizado");

            if (model.UsuarioRoot == '1')
            {
                CriarSenha(senha, out byte[] senhaHash, out byte[] senhaSalt);

                model.SenhaHash = senhaHash;
                model.SenhaSalt = senhaSalt;
            }


            model.Ativo = '1';

            Usuario userToSave = new Usuario
            {
                Nome = model.Nome,
                NomeUsuario = model.NomeUsuario,
                SenhaHash = model.SenhaHash,
                SenhaSalt = model.SenhaSalt,
                Ativo = model.Ativo,
                UsuarioRoot = model.UsuarioRoot
            };

            await Context.Set<Usuario>().AddAsync(userToSave);

            await Context.SaveChangesAsync();

            UsuarioPerfil profileToSave = new UsuarioPerfil
            {
                PerfilId = model.UsuarioPerfil.FirstOrDefault().PerfilId,
                UsuarioId = userToSave.Id
            };

            await Context.Set<UsuarioPerfil>().AddAsync(profileToSave);

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

            if (!string.IsNullOrWhiteSpace(model.NomeUsuario) && model.NomeUsuario != usuario.NomeUsuario)
            {
                if (await Context.Set<Usuario>().AnyAsync(x => x.NomeUsuario == model.NomeUsuario))
                    throw new AppException($"Nome de usuário { model.NomeUsuario } ja utilizado");

                usuario.NomeUsuario = model.NomeUsuario;
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

            if (usuario.Ativo == '0' && model.Ativo == '1')
            {
                usuario.Ativo = model.Ativo;
            }

            usuario.Ativo = model.Ativo;

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
            // TODO ver com o gustavo o que deverá ser feito neste caso.
            WSParametroEmail email = new WSParametroEmail()
            {
                Assunto = "",
                Para = usuario.NomeUsuario,
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
                string decryptedToken = _getCipher.Decrypt(_appSettings.WSPartnerToken);
                string decryptedLogin = _getCipher.Decrypt(_appSettings.WSPartnerLogin);
                string decryptedPass = _getCipher.Decrypt(_appSettings.WSPartnerSenha);
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
        ///Esse método serve para consumir o método Logar do WS Partner e obter um token para o Site       
        ///
        ///</summary>
        [ExcludeFromCodeCoverage]
        public virtual async Task<WSRetornoLoginPartner> LogarSite(string login, string senha)
        {
            try
            {
                string decryptedToken = _getCipher.Decrypt(_appSettings.WSPartnerToken);

                LoginPartnerOut loginPartnerOut = new LoginPartnerOut()
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = decryptedToken,
                    Login = login,
                    Senha = senha,
                    TokenTransacao = ""
                };

                var result = await _partnerServiceClient.LogarAsync(loginPartnerOut);
           
                return result;
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
        public virtual async Task<bool> ValidaUsuario(string nomeUsuario, string senha)
        {
            try
            {

                string auth = Logar().Result;

                LoginADOut loginADOut = new LoginADOut()
                {
                    Email = nomeUsuario,
                    Senha = senha
                };

                WSFiltro filtro = new WSFiltro
                {
                    Origem = WebServiceOrigem.Partner,
                    Token = auth,
                };

                var result = await _partnerServiceClient.ValidarLoginADAsync(filtro, loginADOut, 60);

                if (result.CodigoMensagem != 200)
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
                    Assunto = $"Requisição de Cadastro de Usuario - {usuarioAutenticadoModel.NomeUsuario}",
                    Corpo = $"A URL para o novo cadastro é:  {_appSettings.CMSUrl}/neocms/usuarios/{token}",
                    CodigoTipoEmail = 1359,
                    ListaAnexosPorByte = new AnexoByte[0]

                };

                WSRetornoEnvioEmail result = await _partnerServiceClient.EnviarEmailAsync(parametroEmail);

                if (!result.Sucesso)
                {
                    RequisicaoUsuario requisicaoUsuario = await Context.Set<RequisicaoUsuario>()
                                                                    .AsNoTracking()
                                                                    .Where(ru =>
                                                                    ru.NomeUsuario == usuarioAutenticadoModel.NomeUsuario
                                                                    && ru.Sucesso == '0'
                                                                    && ru.Expirado == '0')
                                                                    .FirstOrDefaultAsync();

                    if (requisicaoUsuario != null)
                    {
                        Context.Set<RequisicaoUsuario>().Remove(requisicaoUsuario);

                        await Context.SaveChangesAsync();
                    }
                    throw new AppException("Falha no envio do E-mail");
                }

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
                RequisicaoUsuario requisicaoExistente = await Context.Set<RequisicaoUsuario>().AsNoTracking().Where(rq => rq.NomeUsuario == usuario.NomeUsuario && rq.Sucesso == '0' && rq.Expirado == '0').FirstOrDefaultAsync();

                if (requisicaoExistente != null)
                    throw new AppException("Solicitação já realizada, aguarde a ação o administrador.");

                RequisicaoUsuario rq = new RequisicaoUsuario()
                {
                    Nome = usuario.Nome,
                    NomeUsuario = usuario.NomeUsuario,
                    Token = Guid.NewGuid().ToString(),
                    Sucesso = '0',
                    Expirado = '0'
                };

                await Context.RequisicaoUsuario.AddAsync(rq);

                await Context.SaveChangesAsync();

                Context.Entry<RequisicaoUsuario>(rq).State = EntityState.Detached;

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

                    Perfil perfil = await Context.Set<Perfil>().AsNoTracking().Where(p => p.Descricao == "Visualizador").FirstOrDefaultAsync();

                    await Criar(new Usuario()
                    {
                        Nome = requisicao.Nome,
                        NomeUsuario = requisicao.NomeUsuario,
                        UsuarioRoot = '0',
                        UsuarioPerfil = new List<UsuarioPerfil> {
                            new UsuarioPerfil {
                               PerfilId = perfil.Id,
                            }
                        }
                    }, null);

                    requisicao.Expirado = '1';
                    Context.RequisicaoUsuario.Update(requisicao);

                    await Context.SaveChangesAsync();

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

        public async Task<RequisicaoUsuario> RemoveRequisition(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new AppException("O token não pode estar nulo ou vazio");

            try
            {
                var requisicao = await Context.RequisicaoUsuario.Where(x => x.Token == token && x.Expirado == '0' && x.Sucesso == '0').AsNoTracking().FirstOrDefaultAsync();

                if (requisicao != null)
                {

                    Context.Set<RequisicaoUsuario>().Remove(requisicao);

                    await Context.SaveChangesAsync();

                    return requisicao;
                }
                else
                {
                    throw new AppException("Requisição não encontrada.");
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

            return listaRequisicoes;
        }

        /// <summary>
        /// Esse método serve para inativar um usuário
        /// </summary>
        /// <param name="userEmail"></param>
        /// <returns></returns>
        public async Task InativarUsuario(string nomeUsuario, int idUserRequest)
        {
            if (string.IsNullOrWhiteSpace(nomeUsuario))
                throw new AppException("O nome de usuário do usuário não pode estar vazio.");

            Usuario usuario = await Context.Set<Usuario>().Include("UsuarioPerfil.Perfil").AsNoTracking().FirstOrDefaultAsync(u => u.NomeUsuario == nomeUsuario);

            if (usuario == null)
                throw new AppException("Usuario não encontrado");

            usuario.Ativo = '0';

            Context.Set<Usuario>().Update(usuario).Property(x => x.Ativo).IsModified = true;

            LogUsuarioDesativado logUsr = new LogUsuarioDesativado()
            {
                Id_Requisitante = idUserRequest,
                NomeUsuario = nomeUsuario,
                DataCadastro = DateTime.Now
            };

            await Context.LogUsuarioDesativado.AddAsync(logUsr);
            await Context.SaveChangesAsync();

        }
    }
}