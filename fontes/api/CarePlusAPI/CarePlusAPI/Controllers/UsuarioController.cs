
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using CarePlusAPI.Entities;
using CarePlusAPI.Helpers;
using CarePlusAPI.Models.Usuario;
using CarePlusAPI.Services;

namespace CarePlusAPI.Controllers
{
    [Authorize]
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService UserService;
        private readonly IMapper Mapper;
        private readonly AppSettings AppSettings;

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
            UserService = userService;
            Mapper = mapper;
            AppSettings = appSettings.Value;
        }

        ///<summary>
        ///
        ///Esse método serve para autenticar um usuário
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de autenticação de um usuário</param>
        [AllowAnonymous]
        [HttpPost("Autenticar")]
        public async Task<IActionResult> Autenticar(UsuarioAutenticadoModel model)
        {
            if (model == null)
                throw new AppException("O usuário não pode estar nulo");

            //if (!UserService.ValidaUsuario(model.Email, model.Senha).Result)
            //{
            //    throw new AppException("O usuário não foi encontrado");
            //}

            Usuario usuario = await UserService.Autenticar(model.Email, model.Senha);

            //if (usuario == null)
            //{
            //    throw new AppException(Newtonsoft.Json.JsonConvert.SerializeObject(new
            //    {
            //        Mensagem = "Usuario não encontrado na base de dados. Por favor complete o cadastro.",
            //        Dados = model
            //    }));
            //}

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                new Claim (ClaimTypes.Name, usuario.Id.ToString ()),
                new Claim (ClaimTypes.Role, usuario.UsuarioPerfil.OrderBy (x => x.Perfil.Prioridade).FirstOrDefault ().Perfil.Descricao)
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

        ///<summary>
        ///
        ///Esse método serve para inserir um usuário na base, primeiro mapeando
        ///o objeto recebido para o objeto esperado na base.
        ///Esse método não pode ser acessado sem estar logado e é preciso ser um tipo de requisão POST.
        ///
        ///</summary>
        ///<param name="model">Model de criação de um usuário</param>
        [HttpPost("gera-requisicao")]
        [AllowAnonymous]
        //[Authorize(Roles = "Administrador")]
        public async Task<IActionResult> GenerateUserRequisition(UsuarioCreateModel model)
        {
            if (model == null)
                throw new AppException("O usuário não pode estar nulo");

            var token = UserService.SalvarRequisicao(model).Result;

            await UserService.EnviarEmail(model, token);

            return Ok();
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
        [AllowAnonymous]
        //[Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Post(UsuarioCreateModel model)
        {
            if (model == null)
                throw new AppException("O usuário não pode estar nulo");

            Usuario usuario = Mapper.Map<Usuario>(model);

            await UserService.Criar(usuario, model.Senha);

            await UserService.EnviarEmailConfirmacao(usuario);

            return Ok();
        }

        ///<summary>
        ///
        ///Esse método serve para listar todos usuários do banco de dados e
        ///mapear esse objeto para um objeto de retorno mais simples.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão GET.
        ///
        ///</summary>
        [HttpGet]
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Usuario> users = await UserService.Listar();
            IList<UsuarioModel> model = Mapper.Map<IList<UsuarioModel>>(users);
            return Ok(model);
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
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            Usuario usuario = await UserService.Buscar(id);
            UsuarioModel model = Mapper.Map<UsuarioModel>(usuario);
            return Ok(model);
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
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]
        public async Task<IActionResult> Put(int id, [FromBody] UsuarioUpdateModel model)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            if (model == null)
                throw new AppException("O usuário não pode estar nulo");

            Usuario usuario = Mapper.Map<Usuario>(model);
            usuario.Id = id;

            await UserService.Atualizar(usuario, model.Senha);
            return Ok();
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um usuário na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                throw new AppException("O id do usuário não pode ser igual a 0");

            await UserService.Excluir(id);
            return Ok();
        }

        ///<summary>
        ///
        ///Esse método serve para excluir um usuário na base.
        ///Esse método pode ser acessado sem estar logado e é preciso ser um tipo de requisão DELETE.
        ///
        ///</summary>
        ///<param name="id">Id do usuário</param>
        [HttpGet("valida-requisicao/{token}")]
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateRequisition(string token)
        {

            try
            {
                var requisicaoValidada = UserService.ValidateTokenRequisition(token).Result;

                Usuario novoUsuario = new Usuario()
                {
                    Nome = requisicaoValidada.UsuarioNome,
                    Email = requisicaoValidada.UsuarioEmail
                };

                await UserService.Criar(novoUsuario, requisicaoValidada.UsuarioSenha);

                return Ok("Cadastro com sucesso!");
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }

        }

        /// <summary>
        /// Esse método serve para listar requisições de cadastro.
        /// </summary>
        /// <returns></returns>
        [HttpGet("listar-requisicoes")]

        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]
        public async Task<IActionResult> ListarRequisicoes()
        {

            try
            {
                var listaRequisicoes = await UserService.BuscarRequisicoesCadastro();
                return Ok(listaRequisicoes);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }

        }

        /// <summary>
        /// Esse método serve para listar requisições de cadastro pend.
        /// </summary>
        /// <returns></returns>
        [HttpGet("requisicoes-pendentes")]
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]

        public async Task<IActionResult> ListarRequisicoesPendentes()
        {

            try
            {
                var listaRequisicoes = await UserService.BuscarRequisicoesCadastroPendente();
                return Ok(listaRequisicoes);
            }
            catch (System.Exception e)
            {
                return BadRequest(e);
            }

        }

    }
}