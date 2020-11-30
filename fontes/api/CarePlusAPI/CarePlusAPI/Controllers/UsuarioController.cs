using AutoMapper;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Usuario;
using CarePlusAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [ExcludeFromCodeCoverage]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _userService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly SeriLog _seriLog;

        ///<summary>
        ///
        ///Esse método construtor é utilizado para pegar os objetos de injeção de dependencia
        ///e atribuir aos objetos da classe.
        ///
        ///</summary>
        ///<param name="userService">Serviço de usuário para consumo do banco de dados</param>
        ///<param name="mapper">Mapeador de objetos</param>
        ///<param name="appSettings">Configurações da aplicação</param>
        public UsuarioController(
            IUsuarioService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _seriLog = new SeriLog(appSettings);
        }

        ///<summary>
        ///
        ///Esse método serve para autenticar um usuário
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de autenticação de um usuário</param>
        [HttpPost("Autenticar")]
        public async Task<IActionResult> Autenticar(UsuarioAutenticadoModel model)
        {
            string origem = Request.Headers["Custom"];

            try
            {


                if (model == null)
                    throw new AppException("O usuário não pode estar nulo");

                //if (!_userService.ValidaUsuario(model.Email, model.Senha).Result)
                //{
                //    throw new AppException("O usuário não foi encontrado");
                //}

                Usuario usuario = await _userService.Autenticar(model.Email, model.Senha);

                //if (usuario == null)
                //{
                //    throw new AppException(Newtonsoft.Json.JsonConvert.SerializeObject(new
                //    {
                //        Mensagem = "Usuario não encontrado na base de dados. Por favor complete o cadastro.",
                //        Dados = model
                //    }));
                //}

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                new Claim (ClaimTypes.Name, usuario.Id.ToString ()),
                new Claim (ClaimTypes.Role, usuario.UsuarioPerfil.OrderBy (x => x.Perfil.Prioridade).FirstOrDefault ().Perfil.Descricao),
                }),

                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                string tokenString = tokenHandler.WriteToken(token);

                return Ok(new
                {
                    usuario.Nome,
                    Token = tokenString,
                    Perfis = usuario.UsuarioPerfil.Select(p => new { p.Perfil.Descricao, Id = p.PerfilId })
                });
            }
            catch (Exception ex)
            {

                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });

            }
        }

        ///<summary>
        ///Esse método serve para inserir um usuário na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///</summary>
        ///<param name="model">Model de criação de um usuário</param>
        [HttpPost("gera-requisicao")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> GenerateUserRequisition(UsuarioCreateModel model)
        {
            string origem = Request.Headers["Custom"];

            try
            {

                if (model == null)
                    throw new AppException("O usuário não pode estar nulo");

                var token = _userService.SalvarRequisicao(model).Result;

                await _userService.EnviarEmail(model, token);

                return Ok();

            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para inserir um usuário na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de um usuário</param>
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Post(UsuarioCreateModel model)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                if (model == null)
                    throw new AppException("O usuário não pode estar nulo");

                Usuario usuario = _mapper.Map<Usuario>(model);

                await _userService.Criar(usuario, model.Senha);

                //await _userService.EnviarEmailConfirmacao(usuario);

                return Ok();
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos usuários do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Get()
        {
            string origem = Request.Headers["Custom"];
            try
            {
                IEnumerable<Usuario> users = await _userService.Listar();
                IList<UsuarioModel> model = _mapper.Map<IList<UsuarioModel>>(users);
                return Ok(model);
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para buscar um usuário através do Id e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        ///<param name="Id">Id do usuário</param>
        [HttpGet("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> GetById(int id)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (id == 0)
                    throw new AppException("O id do usuário não pode ser igual a 0");

                Usuario usuario = await _userService.Buscar(id);
                UsuarioModel model = _mapper.Map<UsuarioModel>(usuario);
                return Ok(model);

            }
            catch (Exception ex)
            {

                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para atualizar um usuário na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão PUT.
        ///
        ///</summary>
        ///<param name="id">Id do usuário a ser atualizado</param>
        ///<param name="model">Model de atualização de um usuário</param>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Put(int id, [FromBody] UsuarioUpdateModel model)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (id == 0)
                    throw new AppException("O id do usuário não pode ser igual a 0");

                if (model == null)
                    throw new AppException("O usuário não pode estar nulo");

                Usuario usuario = _mapper.Map<Usuario>(model);
                usuario.Id = id;

                await _userService.Atualizar(usuario, model.Senha);
                return Ok();
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um usuário na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int id)
        {
            string origem = Request.Headers["Custom"];
            try
            {
                if (id == 0)
                    throw new AppException("O id do usuário não pode ser igual a 0");

                await _userService.Excluir(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }

        }

        ///<summary>
        ///
        ///Esse método serve para excluir um usuário na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        [HttpGet("valida-requisicao/{token}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> ValidateRequisition(string token)
        {
            string origem = Request.Headers["Custom"];

            try
            {
                var requisicaoValidada = _userService.ValidateTokenRequisition(token).Result;

                Usuario novoUsuario = new Usuario()
                {
                    Nome = requisicaoValidada.UsuarioNome,
                    Email = requisicaoValidada.UsuarioEmail
                };

                await _userService.Criar(novoUsuario, requisicaoValidada.UsuarioSenha);

                return Ok("Cadastro com sucesso!");
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }

        }

        /// <summary>
        /// Esse método serve para listar requisições de cadastro.
        /// </summary>
        /// <returns></returns>
        [HttpGet("listar-requisicoes")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> ListarRequisicoes()
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var listaRequisicoes = await _userService.BuscarRequisicoesCadastro();
                return Ok(listaRequisicoes);
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }

        }

        /// <summary>
        /// Esse método serve para listar requisições de cadastro pend.
        /// </summary>
        /// <returns></returns>
        [HttpGet("requisicoes-pendentes")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> ListarRequisicoesPendentes()
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var listaRequisicoes = await _userService.BuscarRequisicoesCadastroPendente();
                return Ok(listaRequisicoes);
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }

        }

        [HttpPost("inativar-usuario")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> InativarUsuario([FromBody] string userEmail)
        {
            string origem = Request.Headers["Custom"];
            try
            {                
                int userId = int.Parse(this.User.Claims.First(i => i.Type == "UserId").Value);
                await _userService.InativarUsuario(userEmail, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }

        }

        [HttpGet("usuarios-inativos")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> ListarAcoesDesativacaoUsuarios()
        {
            string origem = Request.Headers["Custom"];
            try
            {
                var listaAcoes = await _userService.ListarAcoesDesativacaoUsuarios();
                return Ok(listaAcoes);
            }
            catch (Exception ex)
            {
                _seriLog.Log(EnumLogType.Error, ex.Message, origem);

                return BadRequest(new
                {
                    ex.Message
                });
            }
        }
    }
}